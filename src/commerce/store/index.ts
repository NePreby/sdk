import { HanzoClient } from '../client'
import { ProductStore } from './product'
import { CollectionStore } from './collection'
import { CartStore } from './cart'
import { CheckoutStore } from './checkout'
import { RegionStore } from './region'
import { CustomerStore } from './customer'

/**
 * Store (storefront) API aggregator.
 *
 * Provides access to all public-facing storefront operations
 * through typed sub-modules.
 */
export class Store {
  public product: ProductStore
  public collection: CollectionStore
  public cart: CartStore
  public checkout: CheckoutStore
  public region: RegionStore
  public customer: CustomerStore

  constructor(client: HanzoClient) {
    this.product = new ProductStore(client)
    this.collection = new CollectionStore(client)
    this.cart = new CartStore(client)
    this.checkout = new CheckoutStore(client)
    this.region = new RegionStore(client)
    this.customer = new CustomerStore(client)
  }
}

// Re-export all store module classes
export { ProductStore } from './product'
export { CollectionStore } from './collection'
export { CartStore } from './cart'
export { CheckoutStore } from './checkout'
export { RegionStore } from './region'
export { CustomerStore } from './customer'
