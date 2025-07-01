import React from 'react';
import { ShoppingBag, ExternalLink, Star, Heart } from 'lucide-react';
import type { SkinTone } from '../App';

interface ProductRecommendationsProps {
  skinTone: SkinTone;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ skinTone }) => {
  const getProductRecommendations = (tone: SkinTone) => {
    const baseProducts = {
      warm: [
        {
          id: 1,
          name: 'Coral Silk Blouse',
          brand: 'Fashion Studio',
          price: '₹2,999',
          originalPrice: '₹4,999',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Coral',
          category: 'Tops',
          platform: 'myntra',
        },
        {
          id: 2,
          name: 'Terracotta Summer Dress',
          brand: 'Elegant Wear',
          price: '₹3,499',
          originalPrice: '₹5,999',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Terracotta',
          category: 'Dresses',
          platform: 'amazon',
        },
        {
          id: 3,
          name: 'Golden Yellow Cardigan',
          brand: 'Cozy Collection',
          price: '₹2,499',
          originalPrice: '₹3,999',
          rating: 4.3,
          image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Golden Yellow',
          category: 'Outerwear',
          platform: 'myntra',
        },
        {
          id: 4,
          name: 'Sage Green Palazzo Pants',
          brand: 'Comfort Zone',
          price: '₹1,999',
          originalPrice: '₹2,999',
          rating: 4.4,
          image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Sage Green',
          category: 'Bottoms',
          platform: 'amazon',
        },
      ],
      cool: [
        {
          id: 5,
          name: 'Royal Blue Blazer',
          brand: 'Professional Line',
          price: '₹4,999',
          originalPrice: '₹7,999',
          rating: 4.6,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Royal Blue',
          category: 'Blazers',
          platform: 'myntra',
        },
        {
          id: 6,
          name: 'Emerald Evening Gown',
          brand: 'Glamour Collection',
          price: '₹8,999',
          originalPrice: '₹12,999',
          rating: 4.8,
          image: 'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Emerald',
          category: 'Formal',
          platform: 'amazon',
        },
        {
          id: 7,
          name: 'Lavender Midi Skirt',
          brand: 'Sweet Spring',
          price: '₹2,299',
          originalPrice: '₹3,499',
          rating: 4.4,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Lavender',
          category: 'Skirts',
          platform: 'myntra',
        },
        {
          id: 8,
          name: 'Ruby Red Cocktail Dress',
          brand: 'Party Perfect',
          price: '₹5,499',
          originalPrice: '₹8,999',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Ruby Red',
          category: 'Party Wear',
          platform: 'amazon',
        },
      ],
      neutral: [
        {
          id: 9,
          name: 'Dusty Rose Wrap Top',
          brand: 'Versatile Closet',
          price: '₹2,799',
          originalPrice: '₹4,299',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Dusty Rose',
          category: 'Tops',
          platform: 'myntra',
        },
        {
          id: 10,
          name: 'Forest Green Trench Coat',
          brand: 'Urban Style',
          price: '₹6,999',
          originalPrice: '₹9,999',
          rating: 4.6,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Forest Green',
          category: 'Outerwear',
          platform: 'amazon',
        },
        {
          id: 11,
          name: 'Burgundy Midi Dress',
          brand: 'Timeless Fashion',
          price: '₹3,999',
          originalPrice: '₹6,499',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Burgundy',
          category: 'Dresses',
          platform: 'myntra',
        },
        {
          id: 12,
          name: 'Navy Blue Tailored Pants',
          brand: 'Classic Fits',
          price: '₹2,999',
          originalPrice: '₹4,499',
          rating: 4.4,
          image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300',
          color: 'Navy Blue',
          category: 'Formal',
          platform: 'amazon',
        },
      ],
    };

    return tone ? baseProducts[tone] : [];
  };

  const products = skinTone ? getProductRecommendations(skinTone) : [];

  const getPlatformLink = (platform: string, productId: number) => {
    return platform === 'amazon' 
      ? `https://amazon.in/dp/${productId}`
      : `https://myntra.com/product/${productId}`;
  };

  const getPlatformColor = (platform: string) => {
    return platform === 'amazon' ? 'bg-orange-500' : 'bg-pink-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Curated Fashion Picks
              </h2>
              <p className="text-gray-600">
                Handpicked outfits that complement your {skinTone} undertone
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 ${getPlatformColor(product.platform)} text-white text-xs font-medium rounded-full`}>
                      {product.platform === 'amazon' ? 'Amazon' : 'Myntra'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {product.color}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  
                  <a
                    href={getPlatformLink(product.platform, product.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-4 py-2 ${getPlatformColor(product.platform)} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    <span>Shop Now</span>
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;