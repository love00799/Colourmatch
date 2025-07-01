import React from 'react';
import { Palette, Star } from 'lucide-react';
import type { SkinTone } from '../App';

interface ColorRecommendationsProps {
  skinTone: SkinTone;
}

const ColorRecommendations: React.FC<ColorRecommendationsProps> = ({ skinTone }) => {
  const getColorRecommendations = (tone: SkinTone) => {
    switch (tone) {
      case 'warm':
        return {
          primary: [
            { name: 'Coral', hex: '#FF6B6B', category: 'Vibrant' },
            { name: 'Golden Yellow', hex: '#FFD93D', category: 'Bright' },
            { name: 'Terracotta', hex: '#E07A5F', category: 'Earthy' },
            { name: 'Sage Green', hex: '#95A99B', category: 'Natural' },
          ],
          secondary: [
            { name: 'Peach', hex: '#FFBE0B', category: 'Soft' },
            { name: 'Rust', hex: '#F77F00', category: 'Rich' },
            { name: 'Cream', hex: '#FCF6F1', category: 'Neutral' },
            { name: 'Caramel', hex: '#D4A574', category: 'Warm' },
          ],
          avoid: ['Pure White', 'Black', 'Cool Blues', 'Bright Pinks'],
        };
      case 'cool':
        return {
          primary: [
            { name: 'Royal Blue', hex: '#4285F4', category: 'Classic' },
            { name: 'Emerald', hex: '#10B981', category: 'Jewel' },
            { name: 'Lavender', hex: '#A855F7', category: 'Soft' },
            { name: 'Ruby Red', hex: '#DC2626', category: 'Bold' },
          ],
          secondary: [
            { name: 'Ice Blue', hex: '#DBEAFE', category: 'Light' },
            { name: 'Deep Purple', hex: '#7C3AED', category: 'Rich' },
            { name: 'Pure White', hex: '#FFFFFF', category: 'Classic' },
            { name: 'Charcoal', hex: '#374151', category: 'Neutral' },
          ],
          avoid: ['Orange', 'Yellow-Green', 'Warm Browns', 'Golden Colors'],
        };
      case 'neutral':
        return {
          primary: [
            { name: 'Dusty Rose', hex: '#E5989B', category: 'Soft' },
            { name: 'Forest Green', hex: '#22577A', category: 'Deep' },
            { name: 'Burgundy', hex: '#800E13', category: 'Rich' },
            { name: 'Navy', hex: '#1E3A8A', category: 'Classic' },
          ],
          secondary: [
            { name: 'Taupe', hex: '#B8860B', category: 'Neutral' },
            { name: 'Plum', hex: '#8B5A83', category: 'Muted' },
            { name: 'Off-White', hex: '#FAF9F6', category: 'Soft' },
            { name: 'Chocolate', hex: '#7B3F00', category: 'Warm' },
          ],
          avoid: ['Extremely Bright Colors', 'Neon Shades'],
        };
      default:
        return null;
    }
  };

  const recommendations = skinTone ? getColorRecommendations(skinTone) : null;

  if (!recommendations) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your Perfect Color Palette
              </h2>
              <p className="text-gray-600">
                Personalized recommendations for your {skinTone} undertone
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Primary Colors */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Primary Colors</h3>
              <span className="text-sm text-gray-500">Most flattering</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.primary.map((color, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div
                    className="w-full h-16 rounded-lg mb-3 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <h4 className="font-medium text-gray-900 text-sm">{color.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">{color.category}</p>
                  <p className="text-xs font-mono text-gray-400">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.secondary.map((color, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div
                    className="w-full h-16 rounded-lg mb-3 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <h4 className="font-medium text-gray-900 text-sm">{color.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">{color.category}</p>
                  <p className="text-xs font-mono text-gray-400">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colors to Avoid */}
          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Colors to Avoid</h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.avoid.map((color, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
            <p className="text-sm text-red-600 mt-3">
              These colors may wash you out or clash with your natural undertones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorRecommendations;