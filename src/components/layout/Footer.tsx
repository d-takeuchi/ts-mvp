import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Dumbbell, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">みんなのプロテイン</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              プロテイン愛好家のためのレビューコミュニティ。
              <br />
              あなたの体験を共有し、最適なプロテインを見つけましょう。
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              サイト
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-blue-600">
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/proteins" className="text-base text-gray-600 hover:text-blue-600">
                  プロテイン一覧
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-base text-gray-600 hover:text-blue-600">
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-base text-gray-600 hover:text-blue-600">
                  ブランド
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              ユーザー
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="text-base text-gray-600 hover:text-blue-600">
                  ログイン
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-blue-600">
                  新規登録
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-base text-gray-600 hover:text-blue-600">
                  マイプロフィール
                </Link>
              </li>
              <li>
                <Link to="/my-reviews" className="text-base text-gray-600 hover:text-blue-600">
                  マイレビュー
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              フォローする
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-800">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">
            &copy; {new Date().getFullYear()} みんなのプロテイン. All rights reserved.
          </p>
          <p className="flex items-center text-sm text-gray-500 mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for protein lovers
          </p>
        </div>
      </div>
    </footer>
  );
};