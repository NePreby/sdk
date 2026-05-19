import { HanzoClient } from '../client'
import { ProductAdmin } from './product'
import { OrderAdmin } from './order'
import { CartAdmin } from './cart'
import { CustomerAdmin } from './customer'
import { PaymentAdmin } from './payment'
import {
  FulfillmentAdmin,
  FulfillmentSetAdmin,
  ServiceZoneAdmin,
  GeoZoneAdmin,
  ShippingOptionAdmin,
  ShippingProfileAdmin,
} from './fulfillment'
import { InventoryItemAdmin, InventoryLevelAdmin, ReservationAdmin } from './inventory'
import { PromotionAdmin, ApplicationMethodAdmin, CampaignBudgetAdmin } from './promotion'
import {
  PriceSetAdmin,
  PriceAdmin,
  PriceListAdmin,
  PriceRuleAdmin,
  PricePreferenceAdmin,
} from './pricing'
import { TaxRegionAdmin, TaxRateAdmin, TaxRateRuleAdmin, TaxProviderAdmin } from './tax'
import { RegionAdmin } from './region'
import { SubscriptionAdmin } from './subscription'
import { NotificationAdmin } from './notification'
import { AnalyticsAdmin } from './analytics'
import { StoreAdmin } from './store'
import { UploadAdmin } from './upload'
import { CollectionAdmin } from './collection'
import { CustomerGroupAdmin } from './customer-group'
import { SalesChannelAdmin } from './sales-channel'
import { StockLocationAdmin } from './stock-location'
import { ApiKeyAdmin } from './api-key'

/**
 * Admin API aggregator.
 *
 * Provides access to all admin-level commerce operations
 * through typed sub-modules.
 */
export class Admin {
  public product: ProductAdmin
  public order: OrderAdmin
  public cart: CartAdmin
  public customer: CustomerAdmin
  public payment: PaymentAdmin
  public fulfillment: FulfillmentAdmin
  public fulfillmentSet: FulfillmentSetAdmin
  public serviceZone: ServiceZoneAdmin
  public geoZone: GeoZoneAdmin
  public shippingOption: ShippingOptionAdmin
  public shippingProfile: ShippingProfileAdmin
  public inventory: InventoryItemAdmin
  public inventoryLevel: InventoryLevelAdmin
  public reservation: ReservationAdmin
  public promotion: PromotionAdmin
  public applicationMethod: ApplicationMethodAdmin
  public campaignBudget: CampaignBudgetAdmin
  public priceSet: PriceSetAdmin
  public pricing: PriceAdmin
  public priceList: PriceListAdmin
  public priceRule: PriceRuleAdmin
  public pricePreference: PricePreferenceAdmin
  public tax: TaxRegionAdmin
  public taxRate: TaxRateAdmin
  public taxRateRule: TaxRateRuleAdmin
  public taxProvider: TaxProviderAdmin
  public region: RegionAdmin
  public subscription: SubscriptionAdmin
  public notification: NotificationAdmin
  public analytics: AnalyticsAdmin
  public store: StoreAdmin
  public upload: UploadAdmin
  public collection: CollectionAdmin
  public customerGroup: CustomerGroupAdmin
  public salesChannel: SalesChannelAdmin
  public stockLocation: StockLocationAdmin
  public apiKey: ApiKeyAdmin

  constructor(client: HanzoClient) {
    this.product = new ProductAdmin(client)
    this.order = new OrderAdmin(client)
    this.cart = new CartAdmin(client)
    this.customer = new CustomerAdmin(client)
    this.payment = new PaymentAdmin(client)
    this.fulfillment = new FulfillmentAdmin(client)
    this.fulfillmentSet = new FulfillmentSetAdmin(client)
    this.serviceZone = new ServiceZoneAdmin(client)
    this.geoZone = new GeoZoneAdmin(client)
    this.shippingOption = new ShippingOptionAdmin(client)
    this.shippingProfile = new ShippingProfileAdmin(client)
    this.inventory = new InventoryItemAdmin(client)
    this.inventoryLevel = new InventoryLevelAdmin(client)
    this.reservation = new ReservationAdmin(client)
    this.promotion = new PromotionAdmin(client)
    this.applicationMethod = new ApplicationMethodAdmin(client)
    this.campaignBudget = new CampaignBudgetAdmin(client)
    this.priceSet = new PriceSetAdmin(client)
    this.pricing = new PriceAdmin(client)
    this.priceList = new PriceListAdmin(client)
    this.priceRule = new PriceRuleAdmin(client)
    this.pricePreference = new PricePreferenceAdmin(client)
    this.tax = new TaxRegionAdmin(client)
    this.taxRate = new TaxRateAdmin(client)
    this.taxRateRule = new TaxRateRuleAdmin(client)
    this.taxProvider = new TaxProviderAdmin(client)
    this.region = new RegionAdmin(client)
    this.subscription = new SubscriptionAdmin(client)
    this.notification = new NotificationAdmin(client)
    this.analytics = new AnalyticsAdmin(client)
    this.store = new StoreAdmin(client)
    this.upload = new UploadAdmin(client)
    this.collection = new CollectionAdmin(client)
    this.customerGroup = new CustomerGroupAdmin(client)
    this.salesChannel = new SalesChannelAdmin(client)
    this.stockLocation = new StockLocationAdmin(client)
    this.apiKey = new ApiKeyAdmin(client)
  }
}

// Re-export all admin module classes
export { ProductAdmin } from './product'
export { OrderAdmin } from './order'
export { CartAdmin } from './cart'
export { CustomerAdmin } from './customer'
export { PaymentAdmin } from './payment'
export {
  FulfillmentAdmin,
  FulfillmentSetAdmin,
  ServiceZoneAdmin,
  GeoZoneAdmin,
  ShippingOptionAdmin,
  ShippingProfileAdmin,
} from './fulfillment'
export { InventoryItemAdmin, InventoryLevelAdmin, ReservationAdmin } from './inventory'
export { PromotionAdmin, ApplicationMethodAdmin, CampaignBudgetAdmin } from './promotion'
export {
  PriceSetAdmin,
  PriceAdmin,
  PriceListAdmin,
  PriceRuleAdmin,
  PricePreferenceAdmin,
  calculatePrice,
} from './pricing'
export { TaxRegionAdmin, TaxRateAdmin, TaxRateRuleAdmin, TaxProviderAdmin, calculate as calculateTax } from './tax'
export { RegionAdmin } from './region'
export { SubscriptionAdmin } from './subscription'
export { NotificationAdmin } from './notification'
export { AnalyticsAdmin } from './analytics'
export { StoreAdmin } from './store'
export { UploadAdmin } from './upload'
export { CollectionAdmin } from './collection'
export { CustomerGroupAdmin } from './customer-group'
export { SalesChannelAdmin } from './sales-channel'
export { StockLocationAdmin } from './stock-location'
export { ApiKeyAdmin } from './api-key'
