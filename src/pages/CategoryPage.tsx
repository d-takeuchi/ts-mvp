import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProteinCard } from '../components/products/ProteinCard';
import { useProteinStore } from '../store/proteinStore';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories, getProteinsByCategory } = useProteinStore();
  
  const category = categories.find(c => c.id === id);
  const proteins = getProteinsByCategory(id || '');
  
  if (!category) {
    return <div>カテゴリが見つかりませんでした。</div>;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proteins.map(protein => (
            <ProteinCard 
              key={protein.id} 
              protein={protein}
              showCategory={false}
            />
          ))}
        </div>
        
        {proteins.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              このカテゴリのプロテインはまだありません。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};