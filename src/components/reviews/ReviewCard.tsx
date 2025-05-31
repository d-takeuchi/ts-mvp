import React from 'react';
import { Trash2, Edit, Clock } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { Review, User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatDate';
import { users } from '../../data/mockData';

interface ReviewCardProps {
  review: Review;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review,
  onEdit,
  onDelete
}) => {
  const { user: currentUser } = useAuth();
  
  // In a real app, this would be a database lookup
  const reviewer = users.find(u => u.id === review.userId) as User;
  
  const isOwner = currentUser?.id === review.userId;
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {reviewer.avatarUrl && (
            <img 
              src={reviewer.avatarUrl} 
              alt={reviewer.username}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <h4 className="font-medium text-gray-900">{reviewer.username}</h4>
            <div className="flex items-center mt-1">
              <StarRating rating={review.rating} size="sm" />
              <span className="ml-2 text-sm text-gray-600">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
          {review.updatedAt && (
            <span className="ml-1">(編集済み)</span>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
      </div>
      
      {isOwner && (onEdit || onDelete) && (
        <div className="mt-4 flex justify-end space-x-2">
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Edit className="h-3.5 w-3.5" />}
              onClick={onEdit}
            >
              編集
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="danger" 
              size="sm" 
              leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              onClick={onDelete}
            >
              削除
            </Button>
          )}
        </div>
      )}
    </div>
  );
};