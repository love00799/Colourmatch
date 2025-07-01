import React, { useRef, useState } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageUpload, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const clearImage = () => {
    onImageUpload('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-indigo-500 bg-indigo-50 scale-105'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Upload Your Selfie
              </h3>
              <p className="text-gray-600">
                Drag and drop your photo here, or click to browse
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Browse Photos
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG, WebP (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded selfie"
                className="w-full h-64 sm:h-80 object-cover rounded-xl"
              />
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center mt-4 text-gray-600">
              Perfect! Ready for analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;