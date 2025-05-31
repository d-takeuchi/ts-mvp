import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { useProteinStore } from '../../store/proteinStore';
import { Package, Tag, Building2, Users } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { proteins, categories, brands, users } = useProteinStore();
  
  const stats = [
    { name: 'プロテイン数', value: proteins.length, icon: Package, link: '/admin/proteins' },
    { name: 'カテゴリ数', value: categories.length, icon: Tag, link: '/admin/categories' },
    { name: 'ブランド数', value: brands.length, icon: Building2, link: '/admin/brands' },
    { name: 'ユーザー数', value: users.length, icon: Users, link: '/admin/users' },
  ];
  
  const adminSections = [
    {
      title: 'プロテイン管理',
      description: 'プロテイン製品の登録、編集、削除を行います。',
      icon: Package,
      link: '/admin/proteins',
    },
    {
      title: 'カテゴリ管理',
      description: 'プロテインのカテゴリを管理します。',
      icon: Tag,
      link: '/admin/categories',
    },
    {
      title: 'ブランド管理',
      description: 'プロテインブランドの管理を行います。',
      icon: Building2,
      link: '/admin/brands',
    },
    {
      title: 'ユーザー管理',
      description: 'ユーザーアカウントとレビューを管理します。',
      icon: Users,
      link: '/admin/users',
    },
  ];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理画面</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link key={stat.name} to={stat.link}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Link key={section.title} to={section.link}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
                <section.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p className="text-gray-600 mb-4">
                  {section.description}
                </p>
                <Button variant="outline" fullWidth>
                  管理画面へ
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};