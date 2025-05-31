import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { StarRating } from '../components/ui/StarRating';
import { Button } from '../components/ui/Button';
import { useProteinStore } from '../store/proteinStore';
import { useAuth } from '../context/AuthContext';

export const ReviewFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { proteins, addReview } = useProteinStore();
  const { user, isAuthenticated } = useAuth();
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const protein = proteins.find(p => p.id === id);
  
  if (!protein) {
    return <div>プロテインが見つかりませんでした。</div>;
  }
  
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('評価を選択してください');
      return;
    }
    
    if (!comment.trim()) {
      alert('レビューを入力してください');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addReview({
        proteinId: protein.id,
        userId: user.id,
        rating,
        comment: comment.trim(),
      });
      
      navigate(`/proteins/${protein.id}`);
    } catch (error) {
      alert('レビューの投稿に失敗しました');
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {protein.name}のレビューを書く
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                評価
              </label>
              <StarRating
                rating={rating}
                size="lg"
                interactive
                onChange={setRating}
              />
            </div>
            
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                レビュー
              </label>
              <textarea
                id="comment"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="このプロテインの感想を書いてください..."
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/proteins/${protein.id}`)}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                レビューを投稿
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};