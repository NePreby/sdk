/**
 * @hanzo/sdk - Commerce type definitions
 *
 * Comprehensive TypeScript interfaces for every Hanzo Commerce entity.
 * All timestamps are ISO-8601 strings. All IDs are opaque strings.
 */

// ---------------------------------------------------------------------------
// Pagination & Responses
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  offset: number
  limit: number
}

export interface DeleteResponse {
  id: string
  object: string
  deleted: boolean
}

export interface BatchResponse<T> {
  created: T[]
  updated: T[]
  failed: Array<{ data: unknown; error: string }>
}

// ---------------------------------------------------------------------------
// Base
// ---------------------------------------------------------------------------

export interface BaseModel {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  metadata?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export interface Media {
  url: string
  type: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
}

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export interface Address extends BaseModel {
  firstName?: string
  lastName?: string
  company?: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  provinceCode?: string
  postalCode?: string
  countryCode?: string
  phone?: string
}

// ---------------------------------------------------------------------------
// Country & Currency
// ---------------------------------------------------------------------------

export interface Country {
  iso2: string
  iso3: string
  numCode: number
  name: string
  displayName: string
  regionId?: string
}

export interface Currency {
  code: string
  symbol: string
  symbolNative: string
  name: string
  decimalDigits: number
  rounding: number
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface Product extends BaseModel {
  title: string
  subtitle?: string
  description?: string
  handle: string
  status: 'draft' | 'proposed' | 'published' | 'rejected'
  thumbnail?: string
  images?: ProductImage[]
  options?: ProductOption[]
  variants?: Variant[]
  tags?: ProductTag[]
  categories?: ProductCategory[]
  collectionId?: string
  typeId?: string
  type?: ProductType
  weight?: number
  width?: number
  height?: number
  length?: number
  hsCode?: string
  originCountry?: string
  midCode?: string
  material?: string
  salesChannels?: SalesChannel[]
}

export interface ProductType extends BaseModel {
  value: string
}

export interface ProductOption extends BaseModel {
  title: string
  productId?: string
  values: ProductOptionValue[]
}

export interface ProductOptionValue extends BaseModel {
  value: string
  optionId?: string
}

export interface ProductTag extends BaseModel {
  value: string
}

export interface ProductImage extends BaseModel {
  url: string
  alt?: string
  rank?: number
}

export interface ProductCategory extends BaseModel {
  name: string
  handle: string
  description?: string
  parentCategoryId?: string | null
  parentCategory?: ProductCategory | null
  categoryChildren?: ProductCategory[]
  rank?: number
  isActive: boolean
  isInternal: boolean
  products?: Product[]
}

// ---------------------------------------------------------------------------
// Variant
// ---------------------------------------------------------------------------

export interface Variant extends BaseModel {
  title: string
  sku?: string
  barcode?: string
  ean?: string
  upc?: string
  productId: string
  inventoryQuantity: number
  allowBackorder: boolean
  manageInventory: boolean
  weight?: number
  width?: number
  height?: number
  length?: number
  hsCode?: string
  originCountry?: string
  midCode?: string
  material?: string
  prices: MoneyAmount[]
  options: Record<string, string>
}

export interface MoneyAmount {
  id?: string
  currencyCode: string
  amount: number
  minQuantity?: number | null
  maxQuantity?: number | null
  priceListId?: string | null
  regionId?: string | null
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------

export interface Collection extends BaseModel {
  title: string
  handle: string
  description?: string
  image?: Media
  products?: Product[]
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export type OrderStatus = 'pending' | 'completed' | 'archived' | 'canceled' | 'requires_action' | 'draft'
export type PaymentStatus = 'not_paid' | 'awaiting' | 'authorized' | 'partially_authorized' | 'captured' | 'partially_captured' | 'partially_refunded' | 'refunded' | 'canceled' | 'requires_action'
export type FulfillmentStatus = 'not_fulfilled' | 'partially_fulfilled' | 'fulfilled' | 'partially_shipped' | 'shipped' | 'partially_returned' | 'returned' | 'canceled'

export interface Order extends BaseModel {
  status: OrderStatus
  fulfillmentStatus: FulfillmentStatus
  paymentStatus: PaymentStatus
  displayId: number
  email?: string
  currencyCode: string
  regionId: string
  customerId?: string
  customer?: Customer
  salesChannelId?: string
  salesChannel?: SalesChannel
  items: LineItem[]
  shippingAddress?: Address
  billingAddress?: Address
  shippingMethods?: ShippingMethod[]
  payments?: Payment[]
  fulfillments?: Fulfillment[]
  returns?: Return[]
  notes?: OrderNote[]
  total: number
  subtotal: number
  taxTotal: number
  shippingTotal: number
  discountTotal: number
  paidTotal: number
  refundedTotal: number
  refundableAmount: number
  canceledAt?: string | null
  noNotification?: boolean
  externalId?: string | null
}

export interface OrderNote extends BaseModel {
  orderId: string
  value: string
  authorId?: string
}

export interface OrderEdit extends BaseModel {
  orderId: string
  status: 'confirmed' | 'declined' | 'requested' | 'created'
  requestedBy?: string
  confirmedBy?: string
  declinedBy?: string
  declinedReason?: string
  internalNote?: string
  changes?: OrderChange[]
  differenceDue: number
}

export interface OrderChange {
  type: 'item_add' | 'item_remove' | 'item_update'
  lineItemId?: string
  originalLineItemId?: string
}

// ---------------------------------------------------------------------------
// LineItem
// ---------------------------------------------------------------------------

export interface LineItem extends BaseModel {
  title: string
  description?: string
  thumbnail?: string
  quantity: number
  unitPrice: number
  originalPrice?: number
  fulfilledQuantity?: number
  returnedQuantity?: number
  shippedQuantity?: number
  subtotal?: number
  taxTotal?: number
  total?: number
  originalTotal?: number
  discountTotal?: number
  isGiftCard?: boolean
  allowDiscounts?: boolean
  hasShipping?: boolean
  variantId?: string
  variant?: Variant
  productId?: string
  product?: Product
  adjustments?: LineItemAdjustment[]
  taxLines?: TaxLine[]
  orderId?: string
  cartId?: string
}

export interface LineItemAdjustment extends BaseModel {
  lineItemId: string
  amount: number
  description?: string
  promotionId?: string
  providerId?: string
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export type CartType = 'default' | 'swap' | 'draft_order' | 'payment_link' | 'claim'

export interface Cart extends BaseModel {
  type?: CartType
  email?: string
  currencyCode?: string
  regionId?: string
  customerId?: string
  customer?: Customer
  salesChannelId?: string
  salesChannel?: SalesChannel
  items: LineItem[]
  shippingAddress?: Address
  billingAddress?: Address
  shippingMethods?: ShippingMethod[]
  paymentSession?: PaymentSession | null
  paymentSessions?: PaymentSession[]
  discounts?: Discount[]
  promotions?: Promotion[]
  total: number
  subtotal: number
  taxTotal: number
  shippingTotal: number
  discountTotal: number
  giftCardTotal?: number
  itemTotal?: number
  completedAt?: string | null
  paymentAuthorizedAt?: string | null
  context?: Record<string, unknown>
}

export interface CartItem {
  variantId: string
  quantity: number
  metadata?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Customer
// ---------------------------------------------------------------------------

export interface Customer extends BaseModel {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  hasAccount: boolean
  billingAddress?: Address
  billingAddressId?: string
  addresses?: Address[]
  orders?: Order[]
  groups?: CustomerGroup[]
}

export interface CustomerGroup extends BaseModel {
  name: string
  customers?: Customer[]
}

// ---------------------------------------------------------------------------
// Payment
// ---------------------------------------------------------------------------

export type PaymentSessionStatus = 'authorized' | 'pending' | 'requires_more' | 'error' | 'canceled'

export interface Payment extends BaseModel {
  amount: number
  currencyCode: string
  providerId: string
  status: 'authorized' | 'captured' | 'refunded' | 'canceled' | 'pending' | 'requires_more'
  orderId?: string
  cartId?: string
  amountRefunded?: number
  data?: Record<string, unknown>
  capturedAt?: string | null
  canceledAt?: string | null
}

export interface PaymentSession extends BaseModel {
  cartId?: string
  providerId: string
  status: PaymentSessionStatus
  amount: number
  currencyCode: string
  data: Record<string, unknown>
  isInitiated?: boolean
  isSelected?: boolean
  paymentAuthorizedAt?: string | null
}

export interface PaymentCollection extends BaseModel {
  type: 'order_edit' | 'order'
  status: 'not_paid' | 'awaiting' | 'authorized' | 'partially_authorized' | 'canceled'
  amount: number
  authorizedAmount?: number
  currencyCode: string
  regionId: string
  paymentSessions?: PaymentSession[]
  payments?: Payment[]
}

export interface PaymentProvider {
  id: string
  isInstalled: boolean
}

export interface Refund extends BaseModel {
  orderId: string
  paymentId?: string
  amount: number
  note?: string
  reason: 'discount' | 'return' | 'swap' | 'claim' | 'other'
}

// ---------------------------------------------------------------------------
// Region
// ---------------------------------------------------------------------------

export interface Region extends BaseModel {
  name: string
  currencyCode: string
  currency?: Currency
  automaticTaxes?: boolean
  giftCardsTaxable?: boolean
  taxProviderId?: string | null
  taxRate?: number
  taxCode?: string | null
  countries?: Country[]
  paymentProviders?: string[]
  fulfillmentProviders?: string[]
  includesTax?: boolean
}

// ---------------------------------------------------------------------------
// Sales Channel
// ---------------------------------------------------------------------------

export interface SalesChannel extends BaseModel {
  name: string
  description?: string
  isDisabled: boolean
}

// ---------------------------------------------------------------------------
// Stock & Inventory
// ---------------------------------------------------------------------------

export interface StockLocation extends BaseModel {
  name: string
  address?: Address
  addressId?: string
  fulfillmentSets?: FulfillmentSet[]
}

export interface StockLocationAddress extends BaseModel {
  address1: string
  address2?: string
  company?: string
  city?: string
  countryCode: string
  phone?: string
  province?: string
  postalCode?: string
}

export interface InventoryItem extends BaseModel {
  sku?: string
  title?: string
  description?: string
  thumbnail?: string
  requiresShipping: boolean
  originCountry?: string
  hsCode?: string
  midCode?: string
  material?: string
  weight?: number
  width?: number
  height?: number
  length?: number
  locationLevels?: InventoryLevel[]
  reservedQuantity?: number
  stockedQuantity?: number
}

export interface InventoryLevel extends BaseModel {
  inventoryItemId: string
  locationId: string
  stockedQuantity: number
  reservedQuantity: number
  incomingQuantity: number
  availableQuantity?: number
}

export interface Reservation extends BaseModel {
  lineItemId?: string
  inventoryItemId: string
  locationId: string
  quantity: number
  externalId?: string
  createdBy?: string
}

// ---------------------------------------------------------------------------
// Tax
// ---------------------------------------------------------------------------

export interface TaxRegion extends BaseModel {
  countryCode: string
  provinceCode?: string | null
  parentId?: string | null
  providerId?: string | null
  taxRates?: TaxRate[]
  isDefault?: boolean
}

export interface TaxRate extends BaseModel {
  rate: number
  code: string
  name: string
  taxRegionId: string
  isDefault: boolean
  isCombinable: boolean
  rules?: TaxRateRule[]
}

export interface TaxRateRule extends BaseModel {
  taxRateId: string
  referenceId: string
  referenceType: 'product' | 'product_type' | 'shipping_option'
}

export interface TaxProvider extends BaseModel {
  isEnabled: boolean
}

export interface TaxLine {
  rateId?: string
  rate: number
  name: string
  code?: string
  amount?: number
  lineItemId?: string
  shippingMethodId?: string
}

// ---------------------------------------------------------------------------
// Fulfillment
// ---------------------------------------------------------------------------

export interface FulfillmentProvider {
  id: string
  isInstalled: boolean
}

export interface FulfillmentSet extends BaseModel {
  name: string
  type: string
  serviceZones?: ServiceZone[]
}

export interface ServiceZone extends BaseModel {
  name: string
  fulfillmentSetId: string
  geoZones?: GeoZone[]
  shippingOptions?: ShippingOption[]
}

export interface GeoZone extends BaseModel {
  type: 'country' | 'province' | 'city' | 'zip'
  countryCode: string
  provinceCode?: string
  city?: string
  postalExpression?: Record<string, unknown>
  serviceZoneId: string
}

export interface ShippingOption extends BaseModel {
  name: string
  priceType: 'flat_rate' | 'calculated'
  serviceZoneId: string
  shippingProfileId: string
  providerId: string
  amount?: number
  regionId?: string
  isReturn?: boolean
  adminOnly?: boolean
  requirements?: ShippingOptionRequirement[]
  rules?: ShippingOptionRule[]
  data?: Record<string, unknown>
}

export interface ShippingOptionRequirement extends BaseModel {
  shippingOptionId: string
  type: 'min_subtotal' | 'max_subtotal'
  amount: number
}

export interface ShippingOptionRule extends BaseModel {
  attribute: string
  operator: 'eq' | 'ne' | 'in' | 'nin' | 'gt' | 'gte' | 'lt' | 'lte'
  value: unknown
  shippingOptionId: string
}

export interface ShippingProfile extends BaseModel {
  name: string
  type: 'default' | 'gift_card' | 'custom'
  products?: Product[]
  shippingOptions?: ShippingOption[]
}

export interface ShippingMethod extends BaseModel {
  name: string
  price: number
  shippingOptionId: string
  orderId?: string
  cartId?: string
  taxLines?: TaxLine[]
  adjustments?: LineItemAdjustment[]
  originalTotal?: number
  total?: number
  subtotal?: number
  taxTotal?: number
  discountTotal?: number
  data?: Record<string, unknown>
}

export interface Fulfillment extends BaseModel {
  orderId: string
  providerId: string
  locationId?: string
  items: FulfillmentItem[]
  trackingLinks?: TrackingLink[]
  data?: Record<string, unknown>
  shippedAt?: string | null
  canceledAt?: string | null
  packedAt?: string | null
  deliveredAt?: string | null
  labels?: FulfillmentLabel[]
}

export interface FulfillmentItem extends BaseModel {
  fulfillmentId?: string
  itemId: string
  quantity: number
}

export interface TrackingLink extends BaseModel {
  url?: string
  trackingNumber: string
}

export interface FulfillmentLabel extends BaseModel {
  trackingNumber: string
  trackingUrl: string
  labelUrl: string
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export interface PriceSet extends BaseModel {
  prices: Price[]
}

export interface Price extends BaseModel {
  amount: number
  currencyCode: string
  minQuantity?: number | null
  maxQuantity?: number | null
  priceSetId?: string
  priceListId?: string | null
  priceRules?: PriceRule[]
}

export interface PriceList extends BaseModel {
  title: string
  description?: string
  status: 'active' | 'draft'
  type: 'sale' | 'override'
  startsAt?: string | null
  endsAt?: string | null
  rules?: Record<string, string[]>
  prices?: Price[]
}

export interface PriceRule extends BaseModel {
  attribute: string
  value: string
  operator?: 'eq' | 'in'
  priority?: number
  priceSetId: string
  priceId?: string
}

export interface PricePreference extends BaseModel {
  attribute: string
  value: string
  isDefault: boolean
  isAutomatic?: boolean
}

export interface CalculatedPrice {
  id: string
  priceSetId: string
  amount: number
  currencyCode: string
  minQuantity?: number
  maxQuantity?: number
}

// ---------------------------------------------------------------------------
// Promotion
// ---------------------------------------------------------------------------

export type PromotionType = 'standard' | 'buyget'
export type PromotionStatus = 'active' | 'inactive' | 'expired' | 'draft' | 'scheduled'
export type AllocationMethod = 'each' | 'across'
export type TargetType = 'order' | 'items' | 'shipping_methods'

export interface Promotion extends BaseModel {
  code: string
  type: PromotionType
  status: PromotionStatus
  isAutomatic: boolean
  applicationMethod?: ApplicationMethod
  rules?: PromotionRule[]
  campaignId?: string | null
  campaign?: Campaign | null
}

export interface PromotionRule extends BaseModel {
  attribute: string
  operator: 'eq' | 'ne' | 'in' | 'gt' | 'gte' | 'lt' | 'lte'
  values: string[]
  description?: string
}

export interface ApplicationMethod extends BaseModel {
  type: 'fixed' | 'percentage'
  targetType: TargetType
  allocation?: AllocationMethod | null
  value: number
  maxQuantity?: number | null
  promotionId: string
  targetRules?: PromotionRule[]
  buyRules?: PromotionRule[]
}

export interface Campaign extends BaseModel {
  name: string
  description?: string
  campaignIdentifier: string
  startsAt?: string | null
  endsAt?: string | null
  budget?: CampaignBudget | null
  promotions?: Promotion[]
}

export interface CampaignBudget extends BaseModel {
  type: 'spend' | 'usage'
  limit: number
  used: number
  currencyCode?: string
  campaignId?: string
}

// ---------------------------------------------------------------------------
// Coupon
// ---------------------------------------------------------------------------

export interface Coupon extends BaseModel {
  code: string
  type: 'fixed' | 'percentage' | 'free_shipping'
  amount?: number
  percentage?: number
  enabled: boolean
  freeShipping: boolean
  startDate?: string | null
  endDate?: string | null
  usageLimit?: number | null
  usageCount: number
  minOrderAmount?: number | null
  oncePerCustomer: boolean
  productIds?: string[]
  collectionIds?: string[]
  customerGroupIds?: string[]
  regionIds?: string[]
}

// ---------------------------------------------------------------------------
// Discount
// ---------------------------------------------------------------------------

export interface Discount extends BaseModel {
  code: string
  amount: number
  type: 'fixed' | 'percentage' | 'free_shipping'
  isDynamic?: boolean
  isDisabled?: boolean
  startsAt?: string | null
  endsAt?: string | null
  validDuration?: string | null
  usageLimit?: number | null
  usageCount?: number
  rule?: DiscountRule
  regions?: Region[]
}

export interface DiscountRule extends BaseModel {
  type: 'fixed' | 'percentage' | 'free_shipping'
  description?: string
  value: number
  allocation: 'total' | 'item'
  conditions?: DiscountCondition[]
}

export interface DiscountCondition extends BaseModel {
  type: 'products' | 'product_types' | 'product_collections' | 'product_tags' | 'customer_groups'
  operator: 'in' | 'not_in'
  discountRuleId: string
}

// ---------------------------------------------------------------------------
// Gift Card
// ---------------------------------------------------------------------------

export interface GiftCard extends BaseModel {
  code: string
  value: number
  balance: number
  regionId: string
  region?: Region
  isDisabled: boolean
  endsAt?: string | null
  orderId?: string | null
  taxRate?: number | null
}

// ---------------------------------------------------------------------------
// Return & Swap & Claim
// ---------------------------------------------------------------------------

export type ReturnStatus = 'requested' | 'received' | 'partially_received' | 'requires_action' | 'canceled'

export interface Return extends BaseModel {
  orderId: string
  status: ReturnStatus
  items: ReturnItem[]
  shippingMethod?: ShippingMethod
  refundAmount?: number
  receivedAt?: string | null
  noNotification?: boolean
}

export interface ReturnItem extends BaseModel {
  returnId?: string
  itemId: string
  quantity: number
  requestedQuantity?: number
  receivedQuantity?: number
  reasonId?: string | null
  reason?: ReturnReason | null
  note?: string
}

export interface ReturnReason extends BaseModel {
  value: string
  label: string
  description?: string
  parentReturnReasonId?: string | null
  parentReturnReason?: ReturnReason | null
  returnReasonChildren?: ReturnReason[]
}

export interface Swap extends BaseModel {
  orderId: string
  fulfillmentStatus: FulfillmentStatus
  paymentStatus: PaymentStatus
  returnOrder?: Return
  additionalItems: LineItem[]
  differenceDue: number
  shippingAddress?: Address
  shippingMethods?: ShippingMethod[]
  cartId?: string
  cart?: Cart
  confirmedAt?: string | null
  canceledAt?: string | null
  allowBackorder: boolean
  noNotification?: boolean
}

export interface ClaimOrder extends BaseModel {
  orderId: string
  type: 'replace' | 'refund'
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  claimItems: ClaimItem[]
  additionalItems: LineItem[]
  returnOrder?: Return
  shippingMethods?: ShippingMethod[]
  shippingAddress?: Address
  refundAmount?: number
  canceledAt?: string | null
  noNotification?: boolean
}

export interface ClaimItem extends BaseModel {
  claimOrderId: string
  lineItemId: string
  variantId: string
  quantity: number
  reason: 'missing_item' | 'wrong_item' | 'production_failure' | 'other'
  note?: string
  images?: ClaimImage[]
  tags?: ClaimTag[]
}

export interface ClaimImage extends BaseModel {
  claimItemId: string
  url: string
}

export interface ClaimTag extends BaseModel {
  value: string
}

// ---------------------------------------------------------------------------
// Notification
// ---------------------------------------------------------------------------

export type NotificationChannel = 'email' | 'sms' | 'push' | 'feed'

export interface Notification extends BaseModel {
  eventName: string
  resourceType: string
  resourceId: string
  to: string
  channel: NotificationChannel
  templateId?: string
  providerId?: string
  status: 'pending' | 'sent' | 'failed' | 'retrying'
  data?: Record<string, unknown>
  externalId?: string | null
}

// ---------------------------------------------------------------------------
// Subscription
// ---------------------------------------------------------------------------

export type SubscriptionStatus = 'active' | 'paused' | 'canceled' | 'expired' | 'past_due' | 'trialing' | 'incomplete'

export interface Subscription extends BaseModel {
  customerId: string
  customer?: Customer
  status: SubscriptionStatus
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly'
  intervalCount: number
  currencyCode: string
  amount: number
  nextBillingDate: string
  currentPeriodStart?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
  canceledAt?: string | null
  trialStart?: string | null
  trialEnd?: string | null
  items?: SubscriptionItem[]
}

export interface SubscriptionItem extends BaseModel {
  subscriptionId: string
  title: string
  variantId?: string
  variant?: Variant
  productId?: string
  product?: Product
  quantity: number
  unitPrice: number
  total: number
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export interface Review extends BaseModel {
  productId: string
  product?: Product
  customerId?: string
  customer?: Customer
  rating: number
  title?: string
  content?: string
  approved: boolean
  verifiedPurchase: boolean
}

// ---------------------------------------------------------------------------
// Referrer
// ---------------------------------------------------------------------------

export interface Referrer extends BaseModel {
  code: string
  email?: string
  customerId?: string
  customer?: Customer
  visits: number
  conversions: number
  revenue: number
  commissionRate: number
  enabled: boolean
}

// ---------------------------------------------------------------------------
// Store Config
// ---------------------------------------------------------------------------

export interface Store extends BaseModel {
  name: string
  defaultCurrencyCode: string
  defaultSalesChannelId?: string
  defaultRegionId?: string
  defaultLocationId?: string
  supportedCurrencies?: Currency[]
  swapLinkTemplate?: string | null
  paymentLinkTemplate?: string | null
  inviteLinkTemplate?: string | null
}

// ---------------------------------------------------------------------------
// User (Admin)
// ---------------------------------------------------------------------------

export interface User extends BaseModel {
  email: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  role: 'admin' | 'member' | 'developer'
}

export interface Invite extends BaseModel {
  email: string
  role: 'admin' | 'member' | 'developer'
  accepted: boolean
  token: string
  expiresAt: string
}

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export interface WorkflowExecution extends BaseModel {
  workflowId: string
  transactionId: string
  state: 'not_started' | 'invoking' | 'compensating' | 'done' | 'reverted' | 'failed'
  context?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// API Key
// ---------------------------------------------------------------------------

export interface ApiKey extends BaseModel {
  title: string
  token: string
  type: 'publishable' | 'secret'
  lastUsedAt?: string | null
  revokedAt?: string | null
  revokedBy?: string | null
  createdBy?: string
  redacted?: string
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

export interface Upload extends BaseModel {
  url: string
}

export interface PresignedUrl {
  url: string
  key: string
  headers?: Record<string, string>
}

// ---------------------------------------------------------------------------
// Webhook
// ---------------------------------------------------------------------------

export interface Webhook extends BaseModel {
  url: string
  events: string[]
  active: boolean
  secret?: string
  headers?: Record<string, string>
  failureCount: number
}

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export interface AnalyticsEvent {
  eventName: string
  timestamp: string
  userId?: string
  sessionId?: string
  properties?: Record<string, unknown>
}

export interface AnalyticsQuery {
  metric: string
  from: string
  to: string
  granularity?: 'hour' | 'day' | 'week' | 'month'
  filters?: Record<string, string>
}

export interface AnalyticsResult {
  metric: string
  data: AnalyticsDataPoint[]
}

export interface AnalyticsDataPoint {
  timestamp: string
  value: number
}

export interface SalesReport {
  dateStart: string
  dateEnd: string
  totalSales: number
  totalOrders: number
  averageOrderValue: number
  currency: string
  salesByDate: Array<{ date: string; total: number; count: number }>
}

// ---------------------------------------------------------------------------
// Batch Job
// ---------------------------------------------------------------------------

export type BatchJobStatus = 'created' | 'pre_processed' | 'confirmed' | 'processing' | 'completed' | 'canceled' | 'failed'

export interface BatchJob extends BaseModel {
  type: string
  status: BatchJobStatus
  createdBy?: string
  context?: Record<string, unknown>
  result?: {
    count?: number
    advancementCount?: number
    progress?: number
    errors?: Array<{ message: string; code?: string }>
    statDescriptors?: Array<{ key: string; name: string; message: string }>
    fileKey?: string
    fileSize?: number
  }
  dryRun: boolean
  preProcessedAt?: string | null
  processingAt?: string | null
  confirmedAt?: string | null
  completedAt?: string | null
  canceledAt?: string | null
  failedAt?: string | null
}

// ---------------------------------------------------------------------------
// Import / Export
// ---------------------------------------------------------------------------

export interface ImportSummary {
  toCreate: number
  toUpdate: number
  toDelete: number
  errors: Array<{ row: number; message: string }>
}

export interface ExportResult {
  fileKey: string
  fileUrl: string
  fileSize: number
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface AuthToken {
  token: string
  expiresAt?: string
}

export interface AuthSession {
  user?: Customer
  token?: string
  expiresAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
}

/** TaxCalculation — minimal shape used by Admin.tax.calculate(). */
export interface TaxCalculation {
  total: number
  totalIncludingTax: number
  totalExcludingTax: number
  lineItems: Array<{ id: string; rate: number; amount: number }>
}
