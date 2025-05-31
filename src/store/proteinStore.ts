import { create } from 'zustand';
import { brands, categories, proteins, reviews, users } from '../data/mockData';
import { Brand, Category, Protein, Review, User } from '../types';

interface ProteinState {
  proteins: Protein[];
  categories: Category[];
  brands: Brand[];
  reviews: Review[];
  users: User[];
  
  // Admin actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
  addProtein: (protein: Omit<Protein, 'id' | 'avgRating' | 'reviewCount'>) => void;
  updateProtein: (id: string, protein: Partial<Protein>) => void;
  deleteProtein: (id: string) => void;
  
  // Review actions
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  
  // Filtering
  getProteinsByCategory: (categoryId: string) => Protein[];
  getProteinsByBrand: (brandId: string) => Protein[];
  getReviewsByProtein: (proteinId: string) => Review[];
  getReviewsByUser: (userId: string) => Review[];
}

export const useProteinStore = create<ProteinState>((set, get) => ({
  proteins: proteins,
  categories: categories,
  brands: brands,
  reviews: reviews,
  users: users,
  
  // Admin actions for categories
  addCategory: (category) => set((state) => {
    const newCategory = { ...category, id: `cat${state.categories.length + 1}` };
    return { categories: [...state.categories, newCategory] };
  }),
  
  updateCategory: (id, category) => set((state) => ({
    categories: state.categories.map(c => 
      c.id === id ? { ...c, ...category } : c
    )
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(c => c.id !== id)
  })),
  
  // Admin actions for brands
  addBrand: (brand) => set((state) => {
    const newBrand = { ...brand, id: `brand${state.brands.length + 1}` };
    return { brands: [...state.brands, newBrand] };
  }),
  
  updateBrand: (id, brand) => set((state) => ({
    brands: state.brands.map(b => 
      b.id === id ? { ...b, ...brand } : b
    )
  })),
  
  deleteBrand: (id) => set((state) => ({
    brands: state.brands.filter(b => b.id !== id)
  })),
  
  // Admin actions for proteins
  addProtein: (protein) => set((state) => {
    const newProtein = { 
      ...protein, 
      id: `protein${state.proteins.length + 1}`,
      avgRating: 0,
      reviewCount: 0
    };
    return { proteins: [...state.proteins, newProtein] };
  }),
  
  updateProtein: (id, protein) => set((state) => ({
    proteins: state.proteins.map(p => 
      p.id === id ? { ...p, ...protein } : p
    )
  })),
  
  deleteProtein: (id) => set((state) => ({
    proteins: state.proteins.filter(p => p.id !== id),
    // Also delete related reviews
    reviews: state.reviews.filter(r => r.proteinId !== id)
  })),
  
  // Review actions
  addReview: (review) => set((state) => {
    const newReview = { 
      ...review, 
      id: `review${state.reviews.length + 1}`,
      createdAt: new Date().toISOString()
    };
    
    // Update protein avgRating and reviewCount
    const updatedProteins = state.proteins.map(protein => {
      if (protein.id === review.proteinId) {
        const proteinReviews = [...state.reviews.filter(r => r.proteinId === protein.id), newReview];
        const avgRating = proteinReviews.reduce((sum, r) => sum + r.rating, 0) / proteinReviews.length;
        
        return {
          ...protein,
          avgRating: parseFloat(avgRating.toFixed(1)),
          reviewCount: proteinReviews.length
        };
      }
      return protein;
    });
    
    return { 
      reviews: [...state.reviews, newReview],
      proteins: updatedProteins
    };
  }),
  
  updateReview: (id, review) => set((state) => {
    const updatedReviews = state.reviews.map(r => 
      r.id === id ? { ...r, ...review, updatedAt: new Date().toISOString() } : r
    );
    
    // Recalculate protein ratings if needed
    if (review.rating) {
      const updatedProteins = state.proteins.map(protein => {
        const proteinReviews = updatedReviews.filter(r => r.proteinId === protein.id);
        if (proteinReviews.length > 0) {
          const avgRating = proteinReviews.reduce((sum, r) => sum + r.rating, 0) / proteinReviews.length;
          return {
            ...protein,
            avgRating: parseFloat(avgRating.toFixed(1)),
            reviewCount: proteinReviews.length
          };
        }
        return protein;
      });
      
      return { reviews: updatedReviews, proteins: updatedProteins };
    }
    
    return { reviews: updatedReviews };
  }),
  
  deleteReview: (id) => set((state) => {
    const reviewToDelete = state.reviews.find(r => r.id === id);
    if (!reviewToDelete) return state;
    
    const updatedReviews = state.reviews.filter(r => r.id !== id);
    
    // Recalculate protein ratings
    const updatedProteins = state.proteins.map(protein => {
      if (protein.id === reviewToDelete.proteinId) {
        const proteinReviews = updatedReviews.filter(r => r.proteinId === protein.id);
        const avgRating = proteinReviews.length > 0
          ? proteinReviews.reduce((sum, r) => sum + r.rating, 0) / proteinReviews.length
          : 0;
        
        return {
          ...protein,
          avgRating: proteinReviews.length > 0 ? parseFloat(avgRating.toFixed(1)) : undefined,
          reviewCount: proteinReviews.length
        };
      }
      return protein;
    });
    
    return { 
      reviews: updatedReviews,
      proteins: updatedProteins
    };
  }),
  
  // Filtering functions
  getProteinsByCategory: (categoryId) => {
    return get().proteins.filter(p => p.categoryId === categoryId);
  },
  
  getProteinsByBrand: (brandId) => {
    return get().proteins.filter(p => p.brandId === brandId);
  },
  
  getReviewsByProtein: (proteinId) => {
    return get().reviews.filter(r => r.proteinId === proteinId);
  },
  
  getReviewsByUser: (userId) => {
    return get().reviews.filter(r => r.userId === userId);
  }
}));