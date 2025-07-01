import React, { useState } from 'react';
import { ShoppingBag, User, Users, ArrowRight, Shirt, Package } from 'lucide-react';
import type { SkinTone, Gender, Category } from '../App';

interface CategorySelectionProps {
  skinTone: SkinTone;
  onCategorySelection: (gender: Gender, categories: Category[]) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ skinTone, onCategorySelection }) => {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const maleCategories = [
    { id: 'shirts' as Category, name: 'Shirts', icon: '👔', description: 'Formal & Casual Shirts' },
    { id: 'tshirts' as Category, name: 'T-Shirts', icon: '👕', description: 'Trendy T-Shirts' },
    { id: 'jeans' as Category, name: 'Jeans', icon: '👖', description: 'Denim & Casual Pants' },
    { id: 'pants' as Category, name: 'Formal Pants', icon: '👔', description: 'Trousers & Chinos' },
    { id: 'accessories' as Category, name: 'Accessories', icon: '⌚', description: 'Watches, Belts & More' },
  ];

  const femaleCategories = [
    { id: 'tops' as Category, name: 'Tops', icon: '👚', description: 'Blouses & Casual Tops' },
    { id: 'dresses' as Category, name: 'Dresses', icon: '👗', description: 'Casual & Formal Dresses' },
    { id: 'kurtas' as Category, name: 'Kurtas', icon: '🥻', description: 'Traditional & Indo-Western' },
    { id: 'jeans' as Category, name: 'Jeans', icon: '👖', description: 'Denim & Casual Wear' },
    { id: 'pants' as Category, name: 'Pants', icon: '👖', description: 'Formal & Casual Pants' },
    { id: 'accessories' as Category, name: 'Accessories', icon: '💍', description: 'Jewelry & Accessories' },
  ];

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleContinue = () => {
    if (selectedGender && selectedCategories.length > 0) {
      onCategorySelection(selectedGender, selectedCategories);
    }
  };

  const categories = selectedGender === 'male' ? maleCategories : femaleCategories;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                What Are You Shopping For?
              </h2>
              <p className="text-gray-600">
                Select your gender and clothing categories for personalized outfit combinations
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Gender Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Style</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedGender('male')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedGender === 'male'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    selectedGender === 'male' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold">For Him</h4>
                    <p className="text-sm text-gray-500">Men's Fashion</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedGender('female')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedGender === 'female'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    selectedGender === 'female' ? 'bg-pink-100' : 'bg-gray-100'
                  }`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold">For Her</h4>
                    <p className="text-sm text-gray-500">Women's Fashion</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Category Selection */}
          {selectedGender && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Categories <span className="text-sm font-normal text-gray-500">(Choose multiple for outfit pairing)</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedCategories.includes(category.id)
                        ? selectedGender === 'male'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                      </div>
                      {selectedCategories.includes(category.id) && (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedGender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          <Package className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          {selectedGender && selectedCategories.length > 0 && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleContinue}
                className={`inline-flex items-center justify-center px-8 py-3 font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                  selectedGender === 'male'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                } text-white`}
              >
                <span>Get Outfit Recommendations</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}

          {/* Selected Summary */}
          {selectedCategories.length > 0 && (
            <div className={`p-4 rounded-xl ${
              selectedGender === 'male' ? 'bg-blue-50' : 'bg-pink-50'
            }`}>
              <h4 className="font-medium text-gray-900 mb-2">Selected Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find(c => c.id === categoryId);
                  return (
                    <span
                      key={categoryId}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedGender === 'male'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {category?.icon} {category?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;