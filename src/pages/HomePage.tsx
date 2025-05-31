import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProteinCard } from '../components/products/ProteinCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useProteinStore } from '../store/proteinStore';

export const HomePage: React.FC = () => {
  const { proteins, categories, brands } = useProteinStore();
  const [featuredProteins, setFeaturedProteins] = useState(proteins.slice(0, 3));
  const [topRatedProteins, setTopRatedProteins] = useState(proteins);
  
  // Sort proteins by rating
  useEffect(() => {
    const sortedProteins = [...proteins].sort((a, b) => {
      const ratingA = a.avgRating || 0;
      const ratingB = b.avgRating || 0;
      return ratingB - ratingA;
    });
    
    setTopRatedProteins(sortedProteins.slice(0, 4));
  }, [proteins]);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 md:text-5xl">
              最適なプロテインを<br />見つけよう
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              ユーザーのリアルな声を参考に、あなたに合った<br />
              プロテインを探すことができます。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/proteins">
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-semibold"
                  rightIcon={<ArrowRight className="ml-1 h-5 w-5" />}
                >
                  プロテインを探す
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold"
                >
                  レビューを投稿する
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract background pattern */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 overflow-hidden hidden md:block">
          <div className="absolute transform rotate-45 bg-white rounded-full w-96 h-96 -right-20 -top-20"></div>
          <div className="absolute transform rotate-45 bg-white rounded-full w-60 h-60 right-40 top-40"></div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">人気のカテゴリ</h2>
            <p className="mt-3 text-xl text-gray-600">
              あなたの目的に合ったプロテインのタイプを選びましょう
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/categories/${category.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 text-center"
              >
                <h3 className="font-medium text-lg mb-2 text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Proteins */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">注目のプロテイン</h2>
              <p className="mt-2 text-lg text-gray-600">
                今話題のプロテイン製品をチェックしよう
              </p>
            </div>
            <Link to="/proteins" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              すべて見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProteins.map(protein => (
              <ProteinCard key={protein.id} protein={protein} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Rated Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">高評価のプロテイン</h2>
            <p className="mt-3 text-xl text-gray-600">
              ユーザーからの評価が高いプロテインをチェック
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProteins.map(protein => (
              <ProteinCard key={protein.id} protein={protein} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/proteins">
              <Button 
                variant="outline"
                rightIcon={<ArrowRight className="ml-1 h-4 w-4" />}
              >
                すべてのプロテインを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Brand Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">人気のブランド</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map(brand => (
              <Link 
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col items-center"
              >
                {brand.logoUrl && (
                  <div className="h-16 w-16 mb-4 overflow-hidden rounded-full">
                    <img 
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-medium text-center">{brand.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">あなたの経験を共有しませんか？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            あなたのレビューが、他のユーザーの最適なプロテイン選びの助けになります。
            今すぐアカウントを作成して、レビューを投稿しましょう。
          </p>
          <Link to="/register">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              今すぐ登録する
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};