import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { useProteinStore } from '../../store/proteinStore';
import { ArrowLeft } from 'lucide-react';

export const AdminUserReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users, getReviewsByUser, proteins, deleteReview } = useProteinStore();
  
  const user = users.find(u => u.id === id);
  const reviews = getReviewsByUser(id || '');
  
  if (!user) {
    return <div>ユーザーが見つかりませんでした。</div>;
  }
  
  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('このレビューを削除してもよろしいですか？')) {
      deleteReview(reviewId);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/admin/users"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          ユーザー一覧に戻る
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="h-16 w-16 rounded-full mr-4"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.username}のレビュー
              </h1>
              <p className="text-gray-600 mt-1">
                全{reviews.length}件のレビュー
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {reviews.map(review => {
            const protein = proteins.find(p => p.id === review.proteinId);
            if (!protein) return null;
            
            return (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                <Link
                  to={`/proteins/${protein.id}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-4 block"
                >
                  {protein.name}
                </Link>
                <ReviewCard
                  review={review}
                  onDelete={() => handleDeleteReview(review.id)}
                />
              </div>
            );
          })}
          
          {reviews.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                まだレビューがありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};