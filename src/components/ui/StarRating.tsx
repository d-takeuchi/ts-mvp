import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const starClass = sizeClasses[size];

  return (
    <div 
      className={cn('flex items-center', className)}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;
          
        return (
          <div
            key={index}
            className={cn(
              'transition-transform', 
              interactive && 'cursor-pointer hover:scale-110'
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
          >
            <Star
              className={cn(
                starClass,
                'transition-colors',
                isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              )}
            />
          </div>
        );
      })}
    </div>
  );
};