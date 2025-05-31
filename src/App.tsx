import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProteinDetailPage } from './pages/ProteinDetailPage';
import { ProteinListPage } from './pages/ProteinListPage';
import { ReviewFormPage } from './pages/ReviewFormPage';
import { CategoryPage } from './pages/CategoryPage';
import { BrandPage } from './pages/BrandPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProteinList } from './pages/admin/AdminProteinList';
import { AdminProteinForm } from './pages/admin/AdminProteinForm';
import { AdminUserList } from './pages/admin/AdminUserList';
import { AdminUserReviews } from './pages/admin/AdminUserReviews';
import { AdminCategoryList } from './pages/admin/AdminCategoryList';
import { AdminBrandList } from './pages/admin/AdminBrandList';
import { AdminRoute } from './components/auth/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/proteins" element={<ProteinListPage />} />
          <Route path="/proteins/:id" element={<ProteinDetailPage />} />
          <Route path="/proteins/:id/review" element={<ReviewFormPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/brands/:id" element={<BrandPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/proteins" element={<AdminRoute><AdminProteinList /></AdminRoute>} />
          <Route path="/admin/proteins/new" element={<AdminRoute><AdminProteinForm /></AdminRoute>} />
          <Route path="/admin/proteins/:id/edit" element={<AdminRoute><AdminProteinForm /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUserList /></AdminRoute>} />
          <Route path="/admin/users/:id/reviews" element={<AdminRoute><AdminUserReviews /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategoryList /></AdminRoute>} />
          <Route path="/admin/brands" element={<AdminRoute><AdminBrandList /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;