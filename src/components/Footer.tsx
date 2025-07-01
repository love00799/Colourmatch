import React from 'react';
import { Heart, Palette } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ColorMatch AI</h3>
                <p className="text-gray-400 text-sm">Powered by AI</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover your perfect color palette with AI-powered skin tone analysis. 
              Get personalized fashion recommendations that make you look and feel amazing.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for fashion lovers</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li>AI Skin Tone Analysis</li>
              <li>Color Recommendations</li>
              <li>Fashion Suggestions</li>
              <li>Shopping Integration</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>How It Works</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ColorMatch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;