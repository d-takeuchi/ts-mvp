import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { ProteinCard } from '../components/products/ProteinCard';
import { useProteinStore } from '../store/proteinStore';
import { Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProteinListPage: React.FC = () => {
  const { proteins, categories, brands } = useProteinStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProteins = proteins.filter(protein => {
    const matchesCategory = !selectedCategory || protein.categoryId === selectedCategory;
    const matchesBrand = !selectedBrand || protein.brandId === selectedBrand;
    const matchesSearch = !searchQuery || 
      protein.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protein.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">プロテイン一覧</h1>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="プロテインを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">カテゴリーで絞り込み</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">ブランドで絞り込み</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            
            {(selectedCategory || selectedBrand || searchQuery) && (
              <div className="mt-4 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Filter className="h-4 w-4" />}
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBrand('');
                    setSearchQuery('');
                  }}
                >
                  フィルターをクリア
                </Button>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <p className="text-gray-600">
            {filteredProteins.length}件のプロテインが見つかりました
          </p>
        </div>
        
        {/* Protein Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProteins.map(protein => (
            <ProteinCard key={protein.id} protein={protein} />
          ))}
        </div>
        
        {filteredProteins.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              条件に一致するプロテインが見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};