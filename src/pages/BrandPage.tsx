import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProteinCard } from '../components/products/ProteinCard';
import { useProteinStore } from '../store/proteinStore';

export const BrandPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { brands, getProteinsByBrand } = useProteinStore();
  
  const brand = brands.find(b => b.id === id);
  const proteins = getProteinsByBrand(id || '');
  
  if (!brand) {
    return <div>ブランドが見つかりませんでした。</div>;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {brand.logoUrl && (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {brand.name}
              </h1>
              {brand.description && (
                <p className="text-gray-600 mt-2">{brand.description}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proteins.map(protein => (
            <ProteinCard 
              key={protein.id} 
              protein={protein}
              showBrand={false}
            />
          ))}
        </div>
        
        {proteins.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              このブランドのプロテインはまだありません。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};