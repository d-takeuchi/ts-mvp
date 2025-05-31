import { Brand, Category, Protein, Review, User } from '../types';

// Mock users
export const users: User[] = [
  {
    id: 'user1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'user2',
    username: 'トレーナー太郎',
    email: 'taro@example.com',
    role: 'user',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'user3',
    username: 'フィットネス花子',
    email: 'hanako@example.com',
    role: 'user',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

// Mock categories
export const categories: Category[] = [
  { id: 'cat1', name: 'ホエイプロテイン', description: '牛乳由来のプロテイン。吸収が早く、筋肉の成長に効果的。' },
  { id: 'cat2', name: 'ソイプロテイン', description: '大豆由来のプロテイン。植物性で消化に優しい。' },
  { id: 'cat3', name: 'カゼインプロテイン', description: '牛乳由来のプロテイン。吸収がゆっくりで、長時間効果が持続。' },
  { id: 'cat4', name: 'WPC', description: 'ホエイプロテイン・コンセントレート。タンパク質含有量は70-80%程度。' },
  { id: 'cat5', name: 'WPI', description: 'ホエイプロテイン・アイソレート。タンパク質含有量は90%以上と高純度。' },
];

// Mock brands
export const brands: Brand[] = [
  { 
    id: 'brand1', 
    name: 'マイプロテイン', 
    logoUrl: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&h=50', 
    description: 'イギリス発のプロテインブランド。コスパの良さで人気。' 
  },
  { 
    id: 'brand2', 
    name: 'ゴールドスタンダード', 
    logoUrl: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&h=50', 
    description: 'アメリカ発の高品質プロテイン。世界中のアスリートに愛用されている。' 
  },
  { 
    id: 'brand3', 
    name: 'ビーレジェンド', 
    logoUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&h=50', 
    description: '日本発のプロテインブランド。味の種類が豊富で美味しいと評判。' 
  },
  { 
    id: 'brand4', 
    name: 'DNS', 
    logoUrl: 'https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&h=50', 
    description: '日本の総合スポーツ栄養ブランド。プロアスリートからの支持も高い。' 
  },
];

// Mock proteins
export const proteins: Protein[] = [
  {
    id: 'protein1',
    name: 'Impact ホエイプロテイン',
    categoryId: 'cat1',
    brandId: 'brand1',
    description: 'マイプロテインの定番商品。21gのタンパク質を含み、20種類以上のフレーバーから選べます。',
    imageUrl: 'https://images.pexels.com/photos/3756167/pexels-photo-3756167.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein1',
    avgRating: 4.5,
    reviewCount: 120,
  },
  {
    id: 'protein2',
    name: '100% ホエイゴールドスタンダード',
    categoryId: 'cat5',
    brandId: 'brand2',
    description: '世界で最も売れているプロテイン。1杯あたり24gの高品質なホエイプロテインを配合。',
    imageUrl: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein2',
    avgRating: 4.8,
    reviewCount: 240,
  },
  {
    id: 'protein3',
    name: 'ビーレジェンド プロテイン ナチュラル',
    categoryId: 'cat1',
    brandId: 'brand3',
    description: '国内製造の高品質プロテイン。美味しさにこだわった様々なフレーバーが特徴。',
    imageUrl: 'https://images.pexels.com/photos/3923542/pexels-photo-3923542.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein3',
    avgRating: 4.2,
    reviewCount: 85,
  },
  {
    id: 'protein4',
    name: 'プロテインホエイ100',
    categoryId: 'cat4',
    brandId: 'brand4',
    description: 'スポーツ選手のために開発された高品質プロテイン。グルタミンやBCAAも配合。',
    imageUrl: 'https://images.pexels.com/photos/1815248/pexels-photo-1815248.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein4',
    avgRating: 4.0,
    reviewCount: 65,
  },
  {
    id: 'protein5',
    name: 'ソイプロテイン アイソレート',
    categoryId: 'cat2',
    brandId: 'brand1',
    description: '100%植物性の大豆プロテイン。乳製品を含まず、ビーガンの方にも最適。',
    imageUrl: 'https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein5',
    avgRating: 3.9,
    reviewCount: 42,
  },
  {
    id: 'protein6',
    name: 'スロープロテイン カゼイン',
    categoryId: 'cat3',
    brandId: 'brand2',
    description: '就寝前に最適な吸収の遅いカゼインプロテイン。長時間のタンパク質供給を実現。',
    imageUrl: 'https://images.pexels.com/photos/8028447/pexels-photo-8028447.jpeg?auto=compress&cs=tinysrgb&w=600',
    purchaseUrl: 'https://example.com/buy/protein6',
    avgRating: 4.3,
    reviewCount: 28,
  },
];

// Mock reviews
export const reviews: Review[] = [
  {
    id: 'review1',
    proteinId: 'protein1',
    userId: 'user2',
    rating: 5,
    comment: '毎日飲んでいます。溶けやすく、チョコレート味が特に美味しいです。トレーニング後に飲むと疲労回復も早い気がします。',
    createdAt: '2023-05-15T09:24:00Z',
  },
  {
    id: 'review2',
    proteinId: 'protein1',
    userId: 'user3',
    rating: 4,
    comment: '味は良いですが、少し甘すぎる気がします。溶けやすいのは良いポイントです。',
    createdAt: '2023-06-22T14:30:00Z',
  },
  {
    id: 'review3',
    proteinId: 'protein2',
    userId: 'user2',
    rating: 5,
    comment: '世界一売れているだけあって、品質は間違いないです。トレーニングの効果を実感しています。',
    createdAt: '2023-04-10T11:15:00Z',
  },
  {
    id: 'review4',
    proteinId: 'protein3',
    userId: 'user3',
    rating: 4,
    comment: '国産で安心感があります。抹茶味がとても日本人向けで美味しいです。',
    createdAt: '2023-07-05T16:42:00Z',
  },
  {
    id: 'review5',
    proteinId: 'protein4',
    userId: 'user2',
    rating: 3,
    comment: '効果は感じますが、溶けにくいのが難点です。味は普通です。',
    createdAt: '2023-08-18T10:30:00Z',
  },
  {
    id: 'review6',
    proteinId: 'protein5',
    userId: 'user3',
    rating: 4,
    comment: '乳製品アレルギーがあるので助かっています。意外と美味しくて驚きました。',
    createdAt: '2023-05-30T13:15:00Z',
  },
];