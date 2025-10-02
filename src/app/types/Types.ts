import { User } from "./authtype";

export interface liked {
    id?: string;
    userId: User;
    blogId: string;
    liked: boolean;
    createdAt?: string;
}

export interface blogCommentType {
    id?: string;
    user: User;
    blogId: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface productCommentType {
    id?: string;
    user: User;
    productId: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface registerType {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordType {
  email: string;
};

export interface ResetPasswordType {
  token: string;
  newPassword: string;
};


export interface product {
    id?: string;
    name: string;
    description: string;
    price: number;
    productImage: string[];
    category?: string;
    quantity: number;
    producttype?: string;
    color: string[];
    size: string[];
    spcefication: string[];
    readTime?: number;
    createdAt?: string;
    updatedAt?: string;
    averageRating?: number;
    totalRatings?: number;
}

export interface blog {
    id?: string;
    title: string;
    description: string;
    blogImage: string;
    category: string;
    readTime?: number;
    likes?: string;
    comments?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface category {
    id?: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface Rating {
  id?: string;
  rating: number;
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  productId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RatingResponse {
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
  ratingDistribution: number[];
}


export interface SearchParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: RatingResponse[];
  sort?: string;
  page?: string;
  view?: string;
}

export interface ProductRating {
  productId: string;
  averageRating: number;
  totalRatings: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}


export interface TOrder {
  id?: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  shipping: number;
  tax: number;
  shippingAddress: string;
  createdAt: string;
  status: string;
}

export interface CartItem {
  id: string
  name: string
  price: number
  productImage: string[]
  description: string
  quantity: number
  selectedColor?: string
  selectedSize?: string
  category?: string
  availableColors?: string[]
  availableSizes?: string[]
}

export interface CartStore {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: string, selectedColor?: string, selectedSize?: string) => void
  updateQuantity: (id: string, quantity: number, selectedColor?: string, selectedSize?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getItemQuantity: (id: string, selectedColor?: string, selectedSize?: string) => number
  getItemById: (id: string, selectedColor?: string, selectedSize?: string) => CartItem | undefined
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getPromoDiscount: () => number
  getTotal: () => number
  getFreeShippingProgress: () => number
  getAmountToFreeShipping: () => number
}