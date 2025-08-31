import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  productImage: string[]
  quantity: number
  color?: string
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemQuantity: (id: string) => number
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
        (set, get) => ({
          cart: [],
          
          addToCart: (product) => set((state) => {
            const existingItem = state.cart.find(item => item.id === product.id)
            
            if (existingItem) {
              return {
                cart: state.cart.map(item =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              }
            } else {
              
              return { cart: [...state.cart, { ...product, quantity: 1 }] }
            }
          }),
          
          removeFromCart: (id) => set((state) => ({
            cart: state.cart.filter(item => item.id !== id)
          })),
          
          updateQuantity: (id, quantity) => set((state) => ({
            cart: state.cart.map(item =>
              item.id === id
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            ).filter(item => item.quantity > 0)
          })),
          
          clearCart: () => set({ cart: [] }),
          
          getTotalPrice: () => {
            const { cart } = get()
            return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
          },
          
          getTotalItems: () => {
            const { cart } = get()
            return cart.reduce((total, item) => total + item.quantity, 0)
          },
          
          getItemQuantity: (id) => {
            const { cart } = get()
            return cart.find(item => item.id === id)?.quantity || 0
          }
        }),
        {
          name: 'cart-storage',
        }
      )
  )
)