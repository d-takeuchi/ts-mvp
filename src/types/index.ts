export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface Protein {
  id: string;
  name: string;
  categoryId: string;
  brandId: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  avgRating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  proteinId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  updatedAt?: string;
}