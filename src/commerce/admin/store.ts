import { HanzoClient } from '../client'
import type { Store } from '../types'

/** Admin operations for the store configuration. */
export class StoreAdmin {
  constructor(private client: HanzoClient) {}

  /** Get the current store configuration. */
  get() {
    return this.client.get<Store>('/admin/store')
  }

  /** Update the store configuration. */
  update(data: Partial<Store>) {
    return this.client.put<Store>('/admin/store', data)
  }
}
