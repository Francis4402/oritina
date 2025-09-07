import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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


const getCartItemKey = (id: string, selectedColor?: string, selectedSize?: string) => {
  return `${id}-${selectedColor || 'no-color'}-${selectedSize || 'no-size'}`
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        addToCart: (product) =>
          set((state) => {
            const itemKey = getCartItemKey(product.id, product.selectedColor, product.selectedSize)
            const existingItem = state.cart.find(
              (item) => getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
            )

            if (existingItem) {
              return {
                cart: state.cart.map((item) =>
                  getCartItemKey(item.id, item.selectedColor, item.selectedSize) === itemKey
                    ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                    : item
                ),
              }
            } else {
              return {
                cart: [...state.cart, { ...product, quantity: product.quantity || 1 }],
              }
            }
          }),

        removeFromCart: (id, selectedColor, selectedSize) =>
          set((state) => ({
            cart: state.cart.filter(
              (item) =>
                getCartItemKey(item.id, item.selectedColor, item.selectedSize) !==
                getCartItemKey(id, selectedColor, selectedSize)
            ),
          })),

        updateQuantity: (id, quantity, selectedColor, selectedSize) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                getCartItemKey(item.id, item.selectedColor, item.selectedSize) ===
                getCartItemKey(id, selectedColor, selectedSize)
                  ? { ...item, quantity: Math.max(0, quantity) }
                  : item
              )
              .filter((item) => item.quantity > 0),
          })),

        clearCart: () => set({ cart: [] }),

        getTotalItems: () => {
          const { cart } = get()
          return cart.reduce((total, item) => total + item.quantity, 0)
        },

        getItemQuantity: (id, selectedColor, selectedSize) => {
          const { cart } = get()
          const item = cart.find(
            (item) =>
              getCartItemKey(item.id, item.selectedColor, item.selectedSize) ===
              getCartItemKey(id, selectedColor, selectedSize)
          )
          return item?.quantity || 0
        },

        getItemById: (id, selectedColor, selectedSize) => {
          const { cart } = get()
          return cart.find(
            (item) =>
              getCartItemKey(item.id, item.selectedColor, item.selectedSize) ===
              getCartItemKey(id, selectedColor, selectedSize)
          )
        },

        getSubtotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
        getTax: () => get().getSubtotal() * 0.08,
        getShipping: () => (get().getSubtotal() >= 75 ? 0 : 1),
        getPromoDiscount: () => (get().getSubtotal() >= 75 ? get().getSubtotal() * 0.1 : 0),
        getTotal: () => get().getSubtotal() + get().getTax() + get().getShipping() - get().getPromoDiscount(),
        getFreeShippingProgress: () => Math.min(100, (get().getSubtotal() / 75) * 100),
        getAmountToFreeShipping: () => Math.max(0, 75 - get().getSubtotal()),
      }),
      { name: 'cart' }
    )
  )
)