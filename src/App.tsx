import React, { useState } from 'react';
import Header from './components/Header';
import PhotoUpload from './components/PhotoUpload';
import SkinToneAnalysis from './components/SkinToneAnalysis';
import CategorySelection from './components/CategorySelection';
import OutfitPairing from './components/OutfitPairing';
import ColorRecommendations from './components/ColorRecommendations';
import ProductRecommendations from './components/ProductRecommendations';
import Footer from './components/Footer';

export type SkinTone = 'warm' | 'cool' | 'neutral' | null;
export type Gender = 'male' | 'female' | null;
export type Category = 'shirts' | 'tshirts' | 'jeans' | 'pants' | 'dresses' | 'tops' | 'kurtas' | 'accessories' | null;

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [skinTone, setSkinTone] = useState<SkinTone>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [showOutfitPairing, setShowOutfitPairing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
    setSkinTone(null);
    setShowCategorySelection(false);
    setShowOutfitPairing(false);
    setSelectedCategories([]);
  };

  const handleAnalysisComplete = (detectedTone: SkinTone) => {
    setSkinTone(detectedTone);
    setIsAnalyzing(false);
    setShowResults(true);
    setShowCategorySelection(true);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const tones: SkinTone[] = ['warm', 'cool', 'neutral'];
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      handleAnalysisComplete(randomTone);
    }, 3000);
  };

  const handleCategorySelection = (gender: Gender, categories: Category[]) => {
    setSelectedGender(gender);
    setSelectedCategories(categories);
    setShowOutfitPairing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!uploadedImage && (
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              ColorMatch AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect color palette with AI-powered skin tone analysis. 
              Upload your photo and get personalized fashion recommendations with smart outfit pairing.
            </p>
          </div>
        )}

        <div className="space-y-8">
          <PhotoUpload 
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
          />

          {uploadedImage && (
            <SkinToneAnalysis
              image={uploadedImage}
              isAnalyzing={isAnalyzing}
              skinTone={skinTone}
              onStartAnalysis={startAnalysis}
            />
          )}

          {showCategorySelection && skinTone && (
            <CategorySelection
              skinTone={skinTone}
              onCategorySelection={handleCategorySelection}
            />
          )}

          {showOutfitPairing && skinTone && selectedGender && selectedCategories.length > 0 && (
            <OutfitPairing
              skinTone={skinTone}
              gender={selectedGender}
              categories={selectedCategories}
            />
          )}

          {showResults && skinTone && !showCategorySelection && (
            <>
              <ColorRecommendations skinTone={skinTone} />
              <ProductRecommendations skinTone={skinTone} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;