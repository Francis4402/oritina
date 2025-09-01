import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  productImage: string[]
  quantity: number
  selectedColor?: string
  selectedSize?: string
  totalRating?: string
  category?: string
  availableColors?: string[]
  availableSizes?: string[]
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: string, selectedColor?: string, selectedSize?: string) => void
  updateQuantity: (id: string, quantity: number, selectedColor?: string, selectedSize?: string) => void
  updateItemColor: (id: string, color: string, selectedColor?: string, selectedSize?: string) => void
  updateItemSize: (id: string, size: string, selectedColor?: string, selectedSize?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemQuantity: (id: string, selectedColor?: string, selectedSize?: string) => number
  getItemById: (id: string, selectedColor?: string, selectedSize?: string) => CartItem | undefined
}


const getCartItemKey = (id: string, selectedColor?: string, selectedSize?: string) => {
  return `${id}-${selectedColor || 'no-color'}-${selectedSize || 'no-size'}`
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        
        addToCart: (product) => set((state) => {
          const itemKey = getCartItemKey(product.id, product.selectedColor, product.selectedSize);
          
          const existingItem = state.cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
          );
          
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
                  ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                  : item
              )
            }
          } else {
            return { 
              cart: [...state.cart, { 
                ...product, 
                quantity: product.quantity || 1 
              }] 
            }
          }
        }),
        
        removeFromCart: (id, selectedColor, selectedSize) => set((state) => ({
          cart: state.cart.filter(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) !== 
            getCartItemKey(id, selectedColor, selectedSize)
          )
        })),
        
        updateQuantity: (id, quantity, selectedColor, selectedSize) => set((state) => ({
          cart: state.cart.map(item =>
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === 
            getCartItemKey(id, selectedColor, selectedSize)
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter(item => item.quantity > 0)
        })),
        
        updateItemColor: (id, color, selectedColor, selectedSize) => set((state) => {
          const itemKey = getCartItemKey(id, selectedColor, selectedSize);
          const existingItem = state.cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
          );
          
          if (!existingItem) return { cart: state.cart };
          
          
          const newItemKey = getCartItemKey(id, color, selectedSize);
          const itemWithNewColor = state.cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === newItemKey
          );
          
          if (itemWithNewColor) {
            
            return {
              cart: state.cart
                .map(item =>
                  getCartItemKey(item.id, item.selectedColor, item.selectedSize) === newItemKey
                    ? { ...item, quantity: item.quantity + existingItem.quantity }
                    : item
                )
                .filter(item => 
                  getCartItemKey(item.id, item.selectedColor, item.selectedSize) !== itemKey
                )
            }
          } else {
            // Just update the color
            return {
              cart: state.cart.map(item =>
                getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
                  ? { ...item, selectedColor: color }
                  : item
              )
            }
          }
        }),
        
        updateItemSize: (id, size, selectedColor, selectedSize) => set((state) => {
          const itemKey = getCartItemKey(id, selectedColor, selectedSize);
          const existingItem = state.cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
          );
          
          if (!existingItem) return { cart: state.cart };
          
          
          const newItemKey = getCartItemKey(id, selectedColor, size);
          const itemWithNewSize = state.cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === newItemKey
          );
          
          if (itemWithNewSize) {
            
            return {
              cart: state.cart
                .map(item =>
                  getCartItemKey(item.id, item.selectedColor, item.selectedSize) === newItemKey
                    ? { ...item, quantity: item.quantity + existingItem.quantity }
                    : item
                )
                .filter(item => 
                  getCartItemKey(item.id, item.selectedColor, item.selectedSize) !== itemKey
                )
            }
          } else {
            // Just update the size
            return {
              cart: state.cart.map(item =>
                getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
                  ? { ...item, selectedSize: size }
                  : item
              )
            }
          }
        }),
        
        clearCart: () => set({ cart: [] }),
        
        getTotalPrice: () => {
          const { cart } = get()
          return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        
        getTotalItems: () => {
          const { cart } = get()
          return cart.reduce((total, item) => total + item.quantity, 0)
        },
        
        getItemQuantity: (id, selectedColor, selectedSize) => {
          const { cart } = get()
          const item = cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === 
            getCartItemKey(id, selectedColor, selectedSize)
          )
          return item?.quantity || 0
        },
        
        getItemById: (id, selectedColor, selectedSize) => {
          const { cart } = get()
          return cart.find(item => 
            getCartItemKey(item.id, item.selectedColor, item.selectedSize) === 
            getCartItemKey(id, selectedColor, selectedSize)
          )
        }
      }),
      {
        name: 'cart'
      }
    ),
  )
)