import cv2
import numpy as np
import base64
import json
import sys
from io import BytesIO
from PIL import Image
import colorsys
from sklearn.cluster import KMeans
import webcolors

def decode_base64_image(base64_string):
    """Decode base64 image string to OpenCV format with error handling"""
    try:
        if base64_string.startswith('data:image'):
            base64_string = base64_string.split(',')[1]
        
        image_data = base64.b64decode(base64_string)
        pil_image = Image.open(BytesIO(image_data))
        
        if pil_image.mode != 'RGB':
            pil_image = pil_image.convert('RGB')
        
        opencv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        return opencv_image
    except Exception as e:
        raise Exception(f"Error decoding image: {str(e)}")

def advanced_face_detection(image):
    """Multi-cascade face detection for higher accuracy"""
    # Try multiple cascade classifiers for better detection
    cascades = [
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml',
        cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml',
        cv2.data.haarcascades + 'haarcascade_profileface.xml'
    ]
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = []
    
    for cascade_path in cascades:
        try:
            face_cascade = cv2.CascadeClassifier(cascade_path)
            detected_faces = face_cascade.detectMultiScale(
                gray, 
                scaleFactor=1.05, 
                minNeighbors=5, 
                minSize=(50, 50),
                flags=cv2.CASCADE_SCALE_IMAGE
            )
            faces.extend(detected_faces)
        except:
            continue
    
    if len(faces) == 0:
        # Fallback: use center region
        h, w = image.shape[:2]
        return image[h//4:3*h//4, w//4:3*w//4]
    
    # Use the largest face
    face = max(faces, key=lambda x: x[2] * x[3])
    x, y, w, h = face
    
    # Extract face with optimal padding
    padding = int(min(w, h) * 0.1)
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(image.shape[1], x + w + padding)
    y2 = min(image.shape[0], y + h + padding)
    
    return image[y1:y2, x1:x2]

def multi_colorspace_skin_detection(image):
    """Advanced skin detection using multiple color spaces"""
    # Convert to multiple color spaces
    ycrcb = cv2.cvtColor(image, cv2.COLOR_BGR2YCrCb)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    
    # YCrCb skin detection (most reliable)
    lower_ycrcb = np.array([0, 133, 77], dtype=np.uint8)
    upper_ycrcb = np.array([255, 173, 127], dtype=np.uint8)
    mask_ycrcb = cv2.inRange(ycrcb, lower_ycrcb, upper_ycrcb)
    
    # HSV skin detection
    lower_hsv1 = np.array([0, 10, 60], dtype=np.uint8)
    upper_hsv1 = np.array([20, 150, 255], dtype=np.uint8)
    lower_hsv2 = np.array([160, 10, 60], dtype=np.uint8)
    upper_hsv2 = np.array([180, 150, 255], dtype=np.uint8)
    mask_hsv1 = cv2.inRange(hsv, lower_hsv1, upper_hsv1)
    mask_hsv2 = cv2.inRange(hsv, lower_hsv2, upper_hsv2)
    mask_hsv = cv2.bitwise_or(mask_hsv1, mask_hsv2)
    
    # LAB skin detection
    lower_lab = np.array([20, 15, 15], dtype=np.uint8)
    upper_lab = np.array([255, 127, 127], dtype=np.uint8)
    mask_lab = cv2.inRange(lab, lower_lab, upper_lab)
    
    # Combine masks with weighted importance
    combined_mask = cv2.bitwise_and(mask_ycrcb, mask_hsv)
    combined_mask = cv2.bitwise_or(combined_mask, mask_lab)
    
    # Advanced morphological operations
    kernel_ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    kernel_rect = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    
    # Remove noise
    combined_mask = cv2.morphologyEx(combined_mask, cv2.MORPH_OPEN, kernel_rect)
    combined_mask = cv2.morphologyEx(combined_mask, cv2.MORPH_CLOSE, kernel_ellipse)
    
    # Fill holes
    combined_mask = cv2.dilate(combined_mask, kernel_ellipse, iterations=1)
    combined_mask = cv2.erode(combined_mask, kernel_ellipse, iterations=1)
    
    # Gaussian blur for smooth edges
    combined_mask = cv2.GaussianBlur(combined_mask, (5, 5), 0)
    
    return combined_mask

def extract_skin_regions(image, mask):
    """Extract specific skin regions (cheeks, forehead, nose) for analysis"""
    h, w = image.shape[:2]
    
    # Define regions of interest for skin tone analysis
    # These regions typically have the most consistent skin tone
    regions = {
        'forehead': (int(w*0.3), int(h*0.15), int(w*0.4), int(h*0.25)),
        'left_cheek': (int(w*0.15), int(h*0.4), int(w*0.25), int(h*0.25)),
        'right_cheek': (int(w*0.6), int(h*0.4), int(w*0.25), int(h*0.25)),
        'nose': (int(w*0.4), int(h*0.35), int(w*0.2), int(h*0.2))
    }
    
    skin_pixels = []
    
    for region_name, (x, y, region_w, region_h) in regions.items():
        # Extract region
        region_mask = mask[y:y+region_h, x:x+region_w]
        region_image = image[y:y+region_h, x:x+region_w]
        
        # Get skin pixels from this region
        region_skin_pixels = region_image[region_mask > 0]
        
        if len(region_skin_pixels) > 10:  # Minimum pixels required
            skin_pixels.extend(region_skin_pixels)
    
    # Fallback to all skin pixels if regions don't have enough data
    if len(skin_pixels) < 100:
        skin_pixels = image[mask > 0]
    
    return np.array(skin_pixels) if len(skin_pixels) > 0 else np.array([[120, 100, 80]])

def advanced_color_analysis(skin_pixels):
    """Advanced color analysis using multiple techniques"""
    if len(skin_pixels) == 0:
        return [120, 100, 80]
    
    # Convert BGR to RGB
    skin_pixels_rgb = skin_pixels[:, [2, 1, 0]]
    
    # Remove outliers using statistical methods
    # Calculate percentiles to remove extreme values
    percentile_5 = np.percentile(skin_pixels_rgb, 5, axis=0)
    percentile_95 = np.percentile(skin_pixels_rgb, 95, axis=0)
    
    # Filter pixels within reasonable range
    mask = np.all((skin_pixels_rgb >= percentile_5) & (skin_pixels_rgb <= percentile_95), axis=1)
    filtered_pixels = skin_pixels_rgb[mask]
    
    if len(filtered_pixels) == 0:
        filtered_pixels = skin_pixels_rgb
    
    # Use K-means clustering to find dominant skin colors
    n_clusters = min(3, len(filtered_pixels))
    if n_clusters > 1:
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        kmeans.fit(filtered_pixels)
        
        # Get the cluster with most pixels (dominant skin tone)
        labels = kmeans.labels_
        unique_labels, counts = np.unique(labels, return_counts=True)
        dominant_cluster = unique_labels[np.argmax(counts)]
        dominant_color = kmeans.cluster_centers_[dominant_cluster]
    else:
        dominant_color = np.mean(filtered_pixels, axis=0)
    
    # Apply weighted average with median for robustness
    median_color = np.median(filtered_pixels, axis=0)
    mean_color = np.mean(filtered_pixels, axis=0)
    
    # Weighted combination (60% dominant cluster, 25% median, 15% mean)
    final_color = (0.6 * dominant_color + 0.25 * median_color + 0.15 * mean_color)
    
    return final_color.astype(int).tolist()

def calculate_color_temperature(rgb):
    """Calculate color temperature for undertone analysis"""
    r, g, b = rgb
    
    # Convert to XYZ color space for accurate color temperature
    # Normalize RGB values
    r_norm = r / 255.0
    g_norm = g / 255.0
    b_norm = b / 255.0
    
    # Apply gamma correction
    def gamma_correct(c):
        if c > 0.04045:
            return pow((c + 0.055) / 1.055, 2.4)
        else:
            return c / 12.92
    
    r_linear = gamma_correct(r_norm)
    g_linear = gamma_correct(g_norm)
    b_linear = gamma_correct(b_norm)
    
    # Convert to XYZ
    X = r_linear * 0.4124564 + g_linear * 0.3575761 + b_linear * 0.1804375
    Y = r_linear * 0.2126729 + g_linear * 0.7151522 + b_linear * 0.0721750
    Z = r_linear * 0.0193339 + g_linear * 0.1191920 + b_linear * 0.9503041
    
    # Calculate chromaticity coordinates
    if X + Y + Z == 0:
        return 5500  # Default neutral temperature
    
    x = X / (X + Y + Z)
    y = Y / (X + Y + Z)
    
    # Calculate correlated color temperature using McCamy's approximation
    n = (x - 0.3320) / (0.1858 - y)
    cct = 449 * n**3 + 3525 * n**2 + 6823.3 * n + 5520.33
    
    return max(2000, min(10000, cct))  # Clamp to reasonable range

def advanced_undertone_classification(rgb):
    """Advanced undertone classification using multiple algorithms"""
    r, g, b = rgb
    
    # Algorithm 1: Traditional RGB ratio analysis
    rg_ratio = r / max(g, 1)
    rb_ratio = r / max(b, 1)
    gb_ratio = g / max(b, 1)
    
    # Algorithm 2: HSV analysis
    hsv = colorsys.rgb_to_hsv(r/255, g/255, b/255)
    hue, saturation, value = hsv
    hue_degrees = hue * 360
    
    # Algorithm 3: Color temperature analysis
    color_temp = calculate_color_temperature(rgb)
    
    # Algorithm 4: Lab color space analysis
    # Convert RGB to Lab for perceptual color analysis
    def rgb_to_lab(r, g, b):
        # Simplified RGB to Lab conversion
        r_norm = r / 255.0
        g_norm = g / 255.0
        b_norm = b / 255.0
        
        # Convert to XYZ first (simplified)
        x = r_norm * 0.4124 + g_norm * 0.3576 + b_norm * 0.1805
        y = r_norm * 0.2126 + g_norm * 0.7152 + b_norm * 0.0722
        z = r_norm * 0.0193 + g_norm * 0.1192 + b_norm * 0.9505
        
        # Convert XYZ to Lab
        def f(t):
            if t > 0.008856:
                return pow(t, 1/3)
            else:
                return 7.787 * t + 16/116
        
        fx = f(x / 0.95047)
        fy = f(y / 1.00000)
        fz = f(z / 1.08883)
        
        L = 116 * fy - 16
        a = 500 * (fx - fy)
        b_lab = 200 * (fy - fz)
        
        return L, a, b_lab
    
    L, a, b_lab = rgb_to_lab(r, g, b)
    
    # Scoring system for each undertone
    warm_score = 0
    cool_score = 0
    neutral_score = 0
    
    # RGB Ratio Analysis (40% weight)
    if rg_ratio > 1.08 and rb_ratio > 1.12:
        warm_score += 40
    elif rb_ratio < 0.92 and gb_ratio > 1.05:
        cool_score += 40
    else:
        neutral_score += 40
    
    # HSV Analysis (25% weight)
    if 10 <= hue_degrees <= 60 or 300 <= hue_degrees <= 360:  # Red-yellow range
        warm_score += 25
    elif 180 <= hue_degrees <= 270:  # Blue-purple range
        cool_score += 25
    else:
        neutral_score += 25
    
    # Color Temperature Analysis (20% weight)
    if color_temp < 4500:  # Warm light
        warm_score += 20
    elif color_temp > 6500:  # Cool light
        cool_score += 20
    else:
        neutral_score += 20
    
    # Lab Analysis (15% weight)
    if a > 5 and b_lab > 5:  # Positive a (red) and b (yellow)
        warm_score += 15
    elif a < -2 and b_lab < 0:  # Negative a (green) and b (blue)
        cool_score += 15
    else:
        neutral_score += 15
    
    # Additional fine-tuning based on specific color characteristics
    brightness = (r + g + b) / 3
    
    # Brightness-based adjustments
    if brightness > 150:  # Lighter skin
        if r > g + 10 and r > b + 15:
            warm_score += 5
        elif b > r + 5:
            cool_score += 5
    elif brightness < 100:  # Darker skin
        if (r - b) > 20:
            warm_score += 5
        elif (b - r) > 10:
            cool_score += 5
    
    # Determine final classification
    max_score = max(warm_score, cool_score, neutral_score)
    
    if max_score == warm_score:
        return "warm"
    elif max_score == cool_score:
        return "cool"
    else:
        return "neutral"

def analyze_skin_tone(base64_image):
    """Main function with comprehensive skin tone analysis"""
    try:
        # Step 1: Decode and prepare image
        image = decode_base64_image(base64_image)
        
        # Step 2: Advanced face detection
        face_region = advanced_face_detection(image)
        
        # Step 3: Multi-colorspace skin detection
        skin_mask = multi_colorspace_skin_detection(face_region)
        
        # Step 4: Extract skin regions
        skin_pixels = extract_skin_regions(face_region, skin_mask)
        
        # Step 5: Advanced color analysis
        average_rgb = advanced_color_analysis(skin_pixels)
        
        # Step 6: Advanced undertone classification
        skin_tone = advanced_undertone_classification(average_rgb)
        
        # Step 7: Confidence calculation
        confidence = calculate_confidence(skin_pixels, average_rgb, skin_tone)
        
        # Return comprehensive results
        result = {
            "r": int(average_rgb[0]),
            "g": int(average_rgb[1]),
            "b": int(average_rgb[2]),
            "tone": skin_tone,
            "confidence": confidence,
            "color_temp": calculate_color_temperature(average_rgb),
            "analysis_quality": "high" if len(skin_pixels) > 1000 else "medium" if len(skin_pixels) > 500 else "low"
        }
        
        return json.dumps(result)
        
    except Exception as e:
        # Return error with fallback analysis
        return json.dumps({
            "r": 120,
            "g": 100,
            "b": 80,
            "tone": "neutral",
            "confidence": 0.5,
            "error": str(e),
            "analysis_quality": "fallback"
        })

def calculate_confidence(skin_pixels, average_rgb, classified_tone):
    """Calculate confidence score for the analysis"""
    if len(skin_pixels) < 100:
        return 0.6
    
    # Calculate color consistency
    rgb_pixels = skin_pixels[:, [2, 1, 0]]  # BGR to RGB
    std_dev = np.std(rgb_pixels, axis=0)
    consistency_score = 1.0 - (np.mean(std_dev) / 255.0)
    
    # Calculate sample size score
    sample_score = min(1.0, len(skin_pixels) / 2000.0)
    
    # Calculate classification certainty
    r, g, b = average_rgb
    rg_ratio = r / max(g, 1)
    rb_ratio = r / max(b, 1)
    
    if classified_tone == "warm":
        certainty = min(1.0, max(0.0, (rg_ratio - 1.0) * 2 + (rb_ratio - 1.0) * 2))
    elif classified_tone == "cool":
        certainty = min(1.0, max(0.0, (1.0 - rb_ratio) * 2 + (1.0 - rg_ratio)))
    else:  # neutral
        certainty = 1.0 - abs(rg_ratio - 1.0) - abs(rb_ratio - 1.0)
    
    # Weighted confidence score
    final_confidence = (0.4 * consistency_score + 0.3 * sample_score + 0.3 * certainty)
    return max(0.5, min(1.0, final_confidence))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python skin_tone_analyzer.py <base64_image>"}))
        sys.exit(1)
    
    base64_image = sys.argv[1]
    result = analyze_skin_tone(base64_image)
    print(result)