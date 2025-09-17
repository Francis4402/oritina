import { User } from "./authtype";

export interface liked {
    id?: string;
    userId: User;
    blogId: string;
    liked: boolean;
    createdAt?: string;
}

export interface commenttype {
    id?: string;
    user: User;
    blogId: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface product {
    id?: string;
    name: string;
    description: string;
    price: number;
    productImage: string[];
    category: string;
    quantity: number;
    producttype: string;
    color: string[];
    size: string[];
    spcefication: string[];
    totalRating?: string;
    reviews?: string;
    createdAt?: string;
    updatedAt?: string;
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


export interface rating {
    id?: string;
    productId: string;
    userId: string;
    rating: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface SearchParams {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    sort?: string;
    page?: string;
    view?: string;
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
  totalRating?: string
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