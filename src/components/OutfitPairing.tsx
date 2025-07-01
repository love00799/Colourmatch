import React from 'react';
import { Sparkles, Heart, ExternalLink, Star, Palette, ArrowRight } from 'lucide-react';
import type { SkinTone, Gender, Category } from '../App';

interface OutfitPairingProps {
  skinTone: SkinTone;
  gender: Gender;
  categories: Category[];
}

const OutfitPairing: React.FC<OutfitPairingProps> = ({ skinTone, gender, categories }) => {
  const getOutfitCombinations = () => {
    const skinToneColors = {
      warm: {
        primary: ['Coral', 'Golden Yellow', 'Terracotta', 'Sage Green'],
        secondary: ['Peach', 'Rust', 'Cream', 'Caramel'],
        hex: ['#FF6B6B', '#FFD93D', '#E07A5F', '#95A99B']
      },
      cool: {
        primary: ['Royal Blue', 'Emerald', 'Lavender', 'Ruby Red'],
        secondary: ['Ice Blue', 'Deep Purple', 'Pure White', 'Charcoal'],
        hex: ['#4285F4', '#10B981', '#A855F7', '#DC2626']
      },
      neutral: {
        primary: ['Dusty Rose', 'Forest Green', 'Burgundy', 'Navy'],
        secondary: ['Taupe', 'Plum', 'Off-White', 'Chocolate'],
        hex: ['#E5989B', '#22577A', '#800E13', '#1E3A8A']
      }
    };

    const maleOutfits = {
      'shirts-jeans': [
        {
          id: 1,
          name: 'Classic Casual Combo',
          description: 'Perfect for everyday wear and casual outings',
          items: [
            { type: 'shirt', name: 'Cotton Casual Shirt', color: skinToneColors[skinTone!]?.primary[0] || 'Blue', price: '₹1,999' },
            { type: 'jeans', name: 'Slim Fit Jeans', color: 'Dark Blue', price: '₹2,499' }
          ],
          totalPrice: '₹4,498',
          rating: 4.6,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 2,
          name: 'Smart Casual Look',
          description: 'Great for work-casual and weekend plans',
          items: [
            { type: 'shirt', name: 'Linen Blend Shirt', color: skinToneColors[skinTone!]?.primary[1] || 'White', price: '₹2,299' },
            { type: 'jeans', name: 'Straight Fit Jeans', color: 'Light Blue', price: '₹2,199' }
          ],
          totalPrice: '₹4,498',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      'tshirts-pants': [
        {
          id: 3,
          name: 'Sporty Comfort',
          description: 'Perfect for gym, sports, and active lifestyle',
          items: [
            { type: 'tshirt', name: 'Athletic T-Shirt', color: skinToneColors[skinTone!]?.primary[2] || 'Gray', price: '₹999' },
            { type: 'pants', name: 'Track Pants', color: 'Black', price: '₹1,499' }
          ],
          totalPrice: '₹2,498',
          rating: 4.4,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      'shirts-pants': [
        {
          id: 4,
          name: 'Professional Elegance',
          description: 'Perfect for office, meetings, and formal events',
          items: [
            { type: 'shirt', name: 'Formal Dress Shirt', color: skinToneColors[skinTone!]?.secondary[2] || 'White', price: '₹2,499' },
            { type: 'pants', name: 'Formal Trousers', color: skinToneColors[skinTone!]?.primary[3] || 'Navy', price: '₹2,999' }
          ],
          totalPrice: '₹5,498',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    };

    const femaleOutfits = {
      'tops-jeans': [
        {
          id: 5,
          name: 'Chic Casual',
          description: 'Perfect for brunch dates and casual outings',
          items: [
            { type: 'top', name: 'Silk Blouse', color: skinToneColors[skinTone!]?.primary[0] || 'Pink', price: '₹2,499' },
            { type: 'jeans', name: 'High-Waist Jeans', color: 'Dark Blue', price: '₹2,799' }
          ],
          totalPrice: '₹5,298',
          rating: 4.6,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      'dresses': [
        {
          id: 6,
          name: 'Elegant Evening',
          description: 'Perfect for dinner dates and special occasions',
          items: [
            { type: 'dress', name: 'Midi Dress', color: skinToneColors[skinTone!]?.primary[1] || 'Emerald', price: '₹3,999' }
          ],
          totalPrice: '₹3,999',
          rating: 4.8,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      'kurtas-pants': [
        {
          id: 7,
          name: 'Traditional Elegance',
          description: 'Perfect for festivals and cultural events',
          items: [
            { type: 'kurta', name: 'Embroidered Kurta', color: skinToneColors[skinTone!]?.primary[2] || 'Burgundy', price: '₹2,999' },
            { type: 'pants', name: 'Palazzo Pants', color: skinToneColors[skinTone!]?.secondary[0] || 'Cream', price: '₹1,999' }
          ],
          totalPrice: '₹4,998',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    };

    const outfits = gender === 'male' ? maleOutfits : femaleOutfits;
    const combinations: any[] = [];

    // Generate combinations based on selected categories
    if (categories.includes('shirts') && categories.includes('jeans')) {
      combinations.push(...(outfits['shirts-jeans'] || []));
    }
    if (categories.includes('shirts') && categories.includes('pants')) {
      combinations.push(...(outfits['shirts-pants'] || []));
    }
    if (categories.includes('tshirts') && categories.includes('pants')) {
      combinations.push(...(outfits['tshirts-pants'] || []));
    }
    if (categories.includes('tops') && categories.includes('jeans')) {
      combinations.push(...(outfits['tops-jeans'] || []));
    }
    if (categories.includes('dresses')) {
      combinations.push(...(outfits['dresses'] || []));
    }
    if (categories.includes('kurtas') && categories.includes('pants')) {
      combinations.push(...(outfits['kurtas-pants'] || []));
    }

    return combinations;
  };

  const outfitCombinations = getOutfitCombinations();
  const skinToneInfo = {
    warm: { name: 'Warm', color: 'text-orange-600', bg: 'bg-orange-50' },
    cool: { name: 'Cool', color: 'text-blue-600', bg: 'bg-blue-50' },
    neutral: { name: 'Neutral', color: 'text-green-600', bg: 'bg-green-50' }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  AI-Curated Outfit Combinations
                </h2>
                <p className="text-gray-600">
                  Perfect pairings for your {skinToneInfo[skinTone!]?.name.toLowerCase()} skin tone
                </p>
              </div>
            </div>
            <div className={`px-4 py-2 ${skinToneInfo[skinTone!]?.bg} rounded-full`}>
              <div className="flex items-center space-x-2">
                <Palette className={`w-4 h-4 ${skinToneInfo[skinTone!]?.color}`} />
                <span className={`text-sm font-medium ${skinToneInfo[skinTone!]?.color}`}>
                  {skinToneInfo[skinTone!]?.name} Undertone
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {outfitCombinations.length > 0 ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Here's what looks amazing on you! 
                </h3>
                <p className="text-gray-600">
                  Our AI analyzed your {skinToneInfo[skinTone!]?.name.toLowerCase()} undertone and selected these perfect combinations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outfitCombinations.map((outfit) => (
                  <div key={outfit.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{outfit.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{outfit.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{outfit.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          {outfit.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-500">in {item.color}</span>
                              </div>
                              <span className="font-medium text-gray-900">{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            Total: {outfit.totalPrice}
                          </div>
                          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                            <span>Shop Combo</span>
                            <ExternalLink className="w-3 h-3 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-indigo-700 font-medium">AI Recommendation:</span>
                      </div>
                      <p className="text-sm text-indigo-600 mt-1">
                        This combination enhances your {skinToneInfo[skinTone!]?.name.toLowerCase()} undertone and creates a harmonious, flattering look that brings out your natural glow.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6 border-t border-gray-100">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Styled specifically for your {skinToneInfo[skinTone!]?.name.toLowerCase()} skin tone</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Combinations Available
              </h3>
              <p className="text-gray-600 mb-6">
                Select multiple categories to see AI-powered outfit combinations
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Try Different Categories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitPairing;