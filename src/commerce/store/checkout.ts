import { HanzoClient } from '../client'
import type { Cart, Order, Address } from '../types'

/** Public storefront operations for checkout. */
export class CheckoutStore {
  constructor(private client: HanzoClient) {}

  /** Set the shipping and/or billing address on a cart. */
  setAddress(
    cartId: string,
    data: { shippingAddress?: Partial<Address>; billingAddress?: Partial<Address> },
  ) {
    return this.client.put<Cart>(`/store/carts/${cartId}/address`, data)
  }

  /** Set the shipping method for a cart. */
  setShippingMethod(cartId: string, data: { shippingOptionId: string }) {
    return this.client.put<Cart>(`/store/carts/${cartId}/shipping-method`, data)
  }

  /** Set the payment method for a cart. */
  setPaymentMethod(cartId: string, data: { providerId: string; data?: Record<string, unknown> }) {
    return this.client.put<Cart>(`/store/carts/${cartId}/payment-method`, data)
  }

  /** Complete the checkout and place the order. */
  complete(cartId: string) {
    return this.client.post<Order>(`/store/carts/${cartId}/complete`)
  }
}
