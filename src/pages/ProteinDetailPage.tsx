import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MessageSquare } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { StarRating } from '../components/ui/StarRating';
import { Badge } from '../components/ui/Badge';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { Button } from '../components/ui/Button';
import { useProteinStore } from '../store/proteinStore';
import { useAuth } from '../context/AuthContext';

export const ProteinDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { proteins, categories, brands, reviews, getReviewsByProtein } = useProteinStore();
  const { isAuthenticated } = useAuth();
  
  const protein = proteins.find(p => p.id === id);
  if (!protein) return <div>プロテインが見つかりませんでした。</div>;
  
  const category = categories.find(c => c.id === protein.categoryId);
  const brand = brands.find(b => b.id === protein.brandId);
  const proteinReviews = getReviewsByProtein(protein.id);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          プロテイン一覧に戻る
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image and Info */}
          <div>
            <a
              href={protein.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-lg overflow-hidden group"
            >
              <img
                src={protein.imageUrl}
                alt={protein.name}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white bg-blue-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-6 w-6" />
                </span>
              </div>
            </a>
            
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {brand && (
                  <Link to={`/brands/${brand.id}`}>
                    <Badge variant="primary">
                      {brand.name}
                    </Badge>
                  </Link>
                )}
                {category && (
                  <Link to={`/categories/${category.id}`}>
                    <Badge variant="secondary">
                      {category.name}
                    </Badge>
                  </Link>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {protein.name}
              </h1>
              
              {protein.avgRating && (
                <div className="flex items-center mb-4">
                  <StarRating rating={protein.avgRating} size="lg" />
                  <span className="ml-2 text-lg font-medium">
                    {protein.avgRating.toFixed(1)}
                  </span>
                  <span className="ml-2 text-gray-600">
                    ({protein.reviewCount} レビュー)
                  </span>
                </div>
              )}
              
              <p className="text-gray-700 whitespace-pre-line mb-6">
                {protein.description}
              </p>
              
              <a
                href={protein.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                >
                  購入サイトで見る
                </Button>
              </a>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                レビュー
              </h2>
              {isAuthenticated ? (
                <Link to={`/proteins/${protein.id}/review`}>
                  <Button
                    variant="outline"
                    leftIcon={<MessageSquare className="h-4 w-4" />}
                  >
                    レビューを書く
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline">
                    ログインしてレビューを書く
                  </Button>
                </Link>
              )}
            </div>
            
            {proteinReviews.length > 0 ? (
              <div className="space-y-6">
                {proteinReviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  まだレビューがありません。
                  {isAuthenticated ? (
                    <Link
                      to={`/proteins/${protein.id}/review`}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      最初のレビューを書きませんか？
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      ログインして最初のレビューを書きませんか？
                    </Link>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};