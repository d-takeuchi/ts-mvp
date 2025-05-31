import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo, hardcode password validation
      if (password !== 'password') {
        throw new Error('Invalid credentials');
      }
      
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      }
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo accounts info for easy login
  const demoAccounts = [
    { role: '管理者', email: 'admin@example.com', password: 'password' },
    { role: 'ユーザー', email: 'taro@example.com', password: 'password' },
    { role: 'ユーザー', email: 'hanako@example.com', password: 'password' },
  ];
  
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-16rem)] bg-gray-50">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">アカウントにログイン</h2>
              <p className="mt-2 text-sm text-gray-600">
                または{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  新規登録はこちら
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              {error && (
                <div className="mb-4 bg-red-50 p-4 rounded-md flex">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      メールアドレス
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      パスワード
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        ログイン状態を保持
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        パスワードを忘れた場合
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="lg"
                      isLoading={isLoading}
                    >
                      ログイン
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Demo accounts */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  デモ用アカウント（パスワードはすべて「password」）
                </h3>
                <div className="space-y-2">
                  {demoAccounts.map((account, index) => (
                    <div 
                      key={index}
                      className="text-sm bg-gray-100 p-2 rounded flex justify-between"
                    >
                      <span>{account.role}: {account.email}</span>
                      <button 
                        type="button" 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setEmail(account.email);
                          setPassword(account.password);
                        }}
                      >
                        入力
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Fitness image"
            />
            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};