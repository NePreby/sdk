import { HanzoClient } from '../client'
import type { Cart, CartItem } from '../types'

/** Public storefront operations for carts. */
export class CartStore {
  constructor(private client: HanzoClient) {}

  /** Create a new cart. */
  create(data?: { regionId?: string; salesChannelId?: string; metadata?: Record<string, unknown> }) {
    return this.client.post<Cart>('/store/carts', data)
  }

  /** Get a cart by ID. */
  get(id: string) {
    return this.client.get<Cart>(`/store/carts/${id}`)
  }

  /** Add an item to the cart. */
  addItem(cartId: string, data: CartItem) {
    return this.client.post<Cart>(`/store/carts/${cartId}/items`, data)
  }

  /** Update an item in the cart. */
  updateItem(cartId: string, itemId: string, data: { quantity: number }) {
    return this.client.put<Cart>(`/store/carts/${cartId}/items/${itemId}`, data)
  }

  /** Remove an item from the cart. */
  removeItem(cartId: string, itemId: string) {
    return this.client.delete<Cart>(`/store/carts/${cartId}/items/${itemId}`)
  }

  /** Apply a coupon code to the cart. */
  applyCoupon(cartId: string, data: { code: string }) {
    return this.client.post<Cart>(`/store/carts/${cartId}/coupons`, data)
  }

  /** Remove a coupon code from the cart. */
  removeCoupon(cartId: string, code: string) {
    return this.client.delete<Cart>(`/store/carts/${cartId}/coupons/${code}`)
  }
}
