import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { Badge } from '../ui/Badge';
import { Protein } from '../../types';
import { useProteinStore } from '../../store/proteinStore';

interface ProteinCardProps {
  protein: Protein;
  showCategory?: boolean;
  showBrand?: boolean;
}

export const ProteinCard: React.FC<ProteinCardProps> = ({ 
  protein,
  showCategory = true,
  showBrand = true
}) => {
  const { categories, brands } = useProteinStore();
  
  const category = categories.find(c => c.id === protein.categoryId);
  const brand = brands.find(b => b.id === protein.brandId);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <a 
          href={protein.purchaseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative h-48 w-full overflow-hidden group"
        >
          <img 
            src={protein.imageUrl}
            alt={protein.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white bg-blue-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="h-5 w-5" />
            </span>
          </div>
        </a>
        
        {protein.avgRating && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
            <StarRating rating={protein.avgRating} size="sm" className="mr-1" />
            <span className="text-sm font-medium">{protein.avgRating}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {showBrand && brand && (
            <Link to={`/brands/${brand.id}`}>
              <Badge variant="primary" className="hover:bg-blue-200 transition-colors">
                {brand.name}
              </Badge>
            </Link>
          )}
          
          {showCategory && category && (
            <Link to={`/categories/${category.id}`}>
              <Badge variant="secondary" className="hover:bg-purple-200 transition-colors">
                {category.name}
              </Badge>
            </Link>
          )}
        </div>
        
        <Link to={`/proteins/${protein.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
            {protein.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {protein.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/proteins/${protein.id}`}
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
          >
            {protein.reviewCount || 0} レビュー
          </Link>
          
          <a 
            href={protein.purchaseUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600 flex items-center"
          >
            購入する
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};