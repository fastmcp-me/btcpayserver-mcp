import { z } from 'zod';

// BTCPayServer API Response Types
export const StoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().nullable().optional(),
  speedPolicy: z.string(),
  defaultCurrency: z.string(),
  invoiceExpiration: z.number(),
  monitoringExpiration: z.number(),
  paymentTolerance: z.number(),
  anyoneCanCreateInvoice: z.boolean(),
  requiresRefundEmail: z.boolean().optional(),
  checkoutFormId: z.string().optional(),
  lightningAmountInSatoshi: z.boolean(),
  lightningPrivateRouteHints: z.boolean(),
  onChainWithLnInvoiceFallback: z.boolean(),
  lazyPaymentMethods: z.boolean(),
  redirectAutomatically: z.boolean(),
  showRecommendedFee: z.boolean(),
  recommendedFeeBlockTarget: z.number(),
  defaultLang: z.string().nullable().optional()
});

export const PaymentRequestSchema = z.object({
  id: z.string(),
  storeId: z.string(),
  status: z.string(),
  created: z.string().optional().nullable(),
  amount: z.union([z.string(), z.number()]).optional().nullable(),
  currency: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  expiryDate: z.union([z.string(), z.number()]).optional().nullable(),
  email: z.string().optional().nullable(),
  embeddedCSS: z.string().optional().nullable(),
  customCSSLink: z.string().optional().nullable(),
  allowCustomPaymentAmounts: z.boolean(),
  formId: z.string().optional().nullable(),
  referenceId: z.string().optional().nullable()
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  emailConfirmed: z.boolean(),
  requiresEmailConfirmation: z.boolean().optional(),
  created: z.union([z.string(), z.number()]).optional(),
  roles: z.array(z.string()),
  disabled: z.boolean().optional(),
  approved: z.boolean().optional(),
  name: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable()
});

export const ApiKeySchema = z.object({
  apiKey: z.string(),
  label: z.string().optional().nullable(),
  permissions: z.array(z.string()),
  userId: z.string().optional().nullable()
});

export const WebhookSchema = z.object({
  id: z.string(),
  enabled: z.boolean(),
  automaticRedelivery: z.boolean(),
  url: z.string(),
  authorizedEvents: z.object({
    everything: z.boolean(),
    specificEvents: z.array(z.string()).optional().nullable()
  }),
  secret: z.string().optional().nullable()
});

// Webhook Delivery Management
export const WebhookDeliverySchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  httpCode: z.number().optional(),
  errorMessage: z.string().optional().nullable(),
  status: z.string()
});

// Webhook Event Types
export const WebhookEventSchema = z.object({
  deliveryId: z.string(),
  webhookId: z.string(),
  originalDeliveryId: z.string().optional().nullable(),
  isRedelivery: z.boolean(),
  type: z.string(),
  timestamp: z.number(),
  storeId: z.string(),
  invoiceId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  // Invoice specific fields
  partiallyPaid: z.boolean().optional(),
  afterExpiration: z.boolean().optional(),
  paymentMethodId: z.string().optional(),
  payment: z.object({
    id: z.string(),
    receivedDate: z.number(),
    value: z.string(),
    fee: z.string().optional(),
    status: z.string(),
    destination: z.string().optional()
  }).optional(),
  overPaid: z.boolean().optional(),
  manuallyMarked: z.boolean().optional(),
  // Payment request fields
  paymentRequestId: z.string().optional(),
  status: z.enum(["Completed", "Expired", "Pending"]).optional(),
  // Payout fields
  payoutId: z.string().optional(),
  pullPaymentId: z.string().optional(),
  payoutState: z.enum(["AwaitingApproval", "AwaitingPayment", "Cancelled", "Completed", "InProgress"]).optional()
});

export const ServerInfoSchema = z.object({
  version: z.string(),
  onion: z.string().optional().nullable(),
  supportedPaymentMethods: z.array(z.string()).optional().nullable(),
  fullySynced: z.boolean().optional().nullable(),
  syncStatus: z.array(z.object({
    cryptoCode: z.string().optional().nullable(),
    nodeInformation: z.object({
      blockCount: z.number().optional().nullable(),
      blockHash: z.string().optional().nullable(),
      headers: z.number().optional().nullable(),
      verificationProgress: z.number().optional().nullable(),
      isSynching: z.boolean().optional().nullable(),
      incrementalRelayFee: z.number().optional().nullable(),
      minRelayTxFee: z.number().optional().nullable(),
      estimatedSize: z.number().optional().nullable(),
      estimatedHeight: z.number().optional().nullable()
    }).optional().nullable()
  })).optional().nullable()
});

export const AppSchema = z.object({
  id: z.string(),
  appName: z.string(),
  storeId: z.string(),
  created: z.number().optional(),
  appType: z.string(),
  archived: z.boolean().optional()
});

// App File Management
export const FileInfoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  uri: z.string(),
  url: z.string(),
  originalName: z.string(),
  storageName: z.string(),
  created: z.number()
});

// App Statistics
export const SalesStatisticsSchema = z.object({
  salesCount: z.number(),
  series: z.array(z.any())
});

export const TopItemStatisticsSchema = z.object({
  itemCode: z.string(),
  title: z.string(),
  salesCount: z.number(),
  total: z.string(),
  totalFormatted: z.string()
});

export const PayoutSchema = z.object({
  id: z.string(),
  revision: z.number(),
  pullPaymentId: z.string(),
  date: z.string(),
  destination: z.string(),
  originalCurrency: z.string(),
  originalAmount: z.string(),
  payoutCurrency: z.string(),
  payoutAmount: z.string(),
  payoutMethodId: z.string(),
  state: z.enum(['AwaitingApproval', 'AwaitingPayment', 'Cancelled', 'Completed', 'InProgress']),
  paymentProof: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional()
});

// Invoice Management
export const InvoiceSchema = z.object({
  id: z.string(),
  storeId: z.string(),
  amount: z.union([z.string(), z.number()]).optional().nullable(),
  currency: z.string(),
  type: z.string().optional(),
  checkoutLink: z.string().optional(),
  status: z.string(),
  additionalStatus: z.string().optional(),
  created: z.union([z.string(), z.number()]).optional(),
  expirationTime: z.union([z.string(), z.number()]).optional(),
  monitoringTime: z.union([z.string(), z.number()]).optional(),
  speedPolicy: z.string().optional(),
  rate: z.number().optional(),
  exceptionStatus: z.string().optional().nullable(),
  targetConfirmations: z.number().optional(),
  lowFeeDetected: z.boolean().optional(),
  invoiceTime: z.union([z.string(), z.number()]).optional(),
  expiration: z.union([z.string(), z.number()]).optional(),
  definitelyAcceptedHeight: z.number().optional().nullable(),
  automatedPayoutSuspended: z.boolean().optional(),
  addresses: z.record(z.string()).optional(),
  paymentMethods: z.array(z.any()).optional(),
  payments: z.array(z.any()).optional(),
  archived: z.boolean().optional(),
  receipts: z.array(z.any()).optional(),
  events: z.array(z.any()).optional(),
  metadata: z.record(z.any()).optional()
});

// Pull Payment Management
export const PullPaymentSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  currency: z.string(),
  amount: z.string(),
  BOLT11Expiration: z.number().optional(),
  autoApproveClaims: z.boolean().optional(),
  archived: z.boolean().optional(),
  viewLink: z.string().optional(),
  startsAt: z.number().optional().nullable(),
  expiresAt: z.number().optional().nullable(),
  payoutMethods: z.array(z.string()).optional().nullable()
});

// Boltcard Management
export const BoltcardLinkSchema = z.object({
  LNURLW: z.string(),
  version: z.number(),
  K0: z.string(),
  K1: z.string(),
  K2: z.string(),
  K3: z.string(),
  K4: z.string()
});

// LNURL Details
export const LNURLDetailsSchema = z.object({
  lnurlBech32: z.string(),
  lnurlUri: z.string()
});

// Payment Method Management
export const PaymentMethodSchema = z.object({
  paymentMethod: z.string(),
  cryptoCode: z.string(),
  destinationAddress: z.string().optional().nullable(),
  enabled: z.boolean(),
  additionalData: z.record(z.any()).optional()
});

// Invoice Payment Method Details
export const InvoicePaymentMethodSchema = z.object({
  paymentMethodId: z.string(),
  currency: z.string(),
  destination: z.string().optional(),
  paymentLink: z.string().optional(),
  rate: z.string().optional(),
  paymentMethodPaid: z.string().optional(),
  totalPaid: z.string().optional(),
  due: z.string().optional(),
  amount: z.string().optional(),
  paymentMethodFee: z.string().optional(),
  payments: z.array(z.any()).optional(),
  activated: z.boolean().optional(),
  additionalData: z.record(z.any()).optional()
});

// Invoice Refund Trigger Data
export const RefundTriggerDataSchema = z.object({
  paymentAmountThen: z.string(),
  paymentAmountNow: z.string(),
  invoiceAmount: z.string(),
  paymentCurrency: z.string(),
  paymentCurrencyDivisibility: z.number(),
  invoiceCurrencyDivisibility: z.number(),
  invoiceCurrency: z.string(),
  overpaidPaymentAmount: z.string().optional()
});

// Lightning Network
export const LightningInfoSchema = z.object({
  nodeURIs: z.array(z.string()).optional(),
  blockHeight: z.number().optional(),
  alias: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  version: z.string().optional().nullable(),
  peersCount: z.number().optional(),
  activeChannelsCount: z.number().optional(),
  inactiveChannelsCount: z.number().optional(),
  pendingChannelsCount: z.number().optional()
});

export const LightningInvoiceSchema = z.object({
  id: z.string(),
  status: z.string(),
  bolt11: z.string(),
  paidAt: z.union([z.string(), z.number()]).optional().nullable(),
  expiresAt: z.union([z.string(), z.number()]),
  amount: z.union([z.string(), z.number()]),
  description: z.string().optional().nullable(),
  descriptionHash: z.string().optional().nullable(),
  preimage: z.string().optional().nullable(),
  paymentHash: z.string(),
  createdAt: z.union([z.string(), z.number()])
});

// Store User Management
export const StoreUserSchema = z.object({
  userId: z.string(),
  email: z.string(),
  role: z.string()
});

// Point of Sale App
export const PosAppSchema = z.object({
  id: z.string(),
  appType: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.union([z.string(), z.number()]).optional(),
  storeId: z.string(),
  currency: z.string().optional(),
  template: z.string().optional(),
  amount: z.union([z.string(), z.number()]).optional().nullable(),
  buttonText: z.string().optional().nullable(),
  customCSS: z.string().optional().nullable(),
  embeddedCSS: z.string().optional().nullable(),
  notificationUrl: z.string().optional().nullable(),
  redirectUrl: z.string().optional().nullable(),
  redirectAutomatically: z.boolean().optional(),
  requiresRefundEmail: z.boolean().optional(),
  checkoutFormId: z.string().optional().nullable(),
  posData: z.string().optional().nullable()
});

// Health Status
export const HealthStatusSchema = z.object({
  status: z.string(),
  errors: z.array(z.string()).optional()
});

// Server Policies
export const ServerPoliciesSchema = z.object({
  unauthenticatedGreenfieldAccess: z.boolean().optional(),
  userRegistration: z.boolean().optional(),
  lockSubscription: z.boolean().optional(),
  discourageSearchEngines: z.boolean().optional(),
  checkForNewVersions: z.boolean().optional(),
  pluginPreReleases: z.boolean().optional(),
  experimentalFeatures: z.boolean().optional(),
  domainToAppMapping: z.array(z.any()).optional()
});


// Store Rates & Exchange
export const StoreRateSchema = z.object({
  currencyPair: z.string(),
  bid: z.number().optional(),
  ask: z.number().optional(),
  rate: z.number()
});

export const RateSourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().optional(),
  default: z.boolean().optional()
});

export const RateConfigurationSchema = z.object({
  spread: z.number().optional(),
  isCustomScript: z.boolean().optional(),
  effectiveScript: z.string().optional(),
  rateScript: z.string().optional(),
  preferredSource: z.string().optional()
});

// Lightning Network Advanced
export const LightningBalanceSchema = z.object({
  onchain: z.object({
    confirmed: z.string(),
    unconfirmed: z.string(),
    reserved: z.string()
  }).optional(),
  offchain: z.object({
    opening: z.string(),
    local: z.string(),
    remote: z.string(),
    closing: z.string()
  }).optional()
});

export const LightningChannelSchema = z.object({
  remoteNode: z.string(),
  isPublic: z.boolean().optional(),
  isActive: z.boolean().optional(),
  capacity: z.string(),
  localBalance: z.string(),
  channelPoint: z.string()
});

export const LightningPaymentSchema = z.object({
  id: z.string(),
  status: z.string(),
  bolt11: z.string(),
  paymentHash: z.string(),
  preimage: z.string().optional().nullable(),
  createdAt: z.union([z.string(), z.number()]),
  totalAmount: z.string(),
  feeAmount: z.string().optional()
});

export const LightningDepositSchema = z.object({
  address: z.string(),
  paymentLink: z.string().optional()
});

export const LightningHistogramSchema = z.object({
  type: z.string(),
  balance: z.string(),
  series: z.array(z.string()),
  labels: z.array(z.number())
});

export const LightningAddressSchema = z.object({
  username: z.string(),
  currencyCode: z.string().nullable(),
  min: z.string().nullable(),
  max: z.string().nullable(),
  invoiceMetadata: z.record(z.any()).nullable()
});

export const LightningConnectRequestSchema = z.object({
  nodeURI: z.string().nullable()
});

export const LightningChannelRequestSchema = z.object({
  nodeURI: z.string(),
  channelAmount: z.string(),
  feeRate: z.number().optional()
});

export const LightningPayInvoiceRequestSchema = z.object({
  BOLT11: z.string(),
  amount: z.string().nullable(),
  maxFeePercent: z.string().nullable(),
  maxFeeFlat: z.string().nullable(),
  sendTimeout: z.number().nullable()
});

export const LightningCreateInvoiceRequestSchema = z.object({
  amount: z.string(),
  description: z.string().nullable(),
  descriptionHashOnly: z.boolean().nullable(),
  expiry: z.number(),
  privateRouteHints: z.boolean().nullable()
});


// Crowdfund App
export const CrowdfundAppSchema = z.object({
  id: z.string(),
  appType: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.union([z.string(), z.number()]).optional(),
  storeId: z.string(),
  title: z.string().optional(),
  enabled: z.boolean().optional(),
  enforceTargetAmount: z.boolean().optional(),
  startDate: z.union([z.string(), z.number()]).optional().nullable(),
  endDate: z.union([z.string(), z.number()]).optional().nullable(),
  targetCurrency: z.string().optional(),
  targetAmount: z.string().optional(),
  mainImageUrl: z.string().optional().nullable(),
  embeddedCSS: z.string().optional().nullable(),
  notificationUrl: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  perksTemplate: z.string().optional().nullable(),
  disqusEnabled: z.boolean().optional(),
  soundsEnabled: z.boolean().optional(),
  animationsEnabled: z.boolean().optional(),
  resetEveryAmount: z.string().optional().nullable(),
  resetEvery: z.string().optional().nullable(),
  displayPerksRanking: z.boolean().optional(),
  sortPerksByPopularity: z.boolean().optional()
});


// Language & Permissions
export const LanguageSchema = z.object({
  code: z.string(),
  displayName: z.string()
});

export const PermissionSchema = z.object({
  name: z.string(),
  included: z.boolean().optional()
});

// API Key Creation
export const ApiKeyCreationSchema = z.object({
  label: z.string().optional(),
  permissions: z.array(z.string()),
  userId: z.string().optional(),
  storeId: z.string().optional()
});

// Configuration types
export interface BTCPayServerConfig {
  baseUrl: string;
  apiKey: string;
  storeId?: string;
}

export type Store = z.infer<typeof StoreSchema>;
export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;
export type User = z.infer<typeof UserSchema>;
export type ApiKey = z.infer<typeof ApiKeySchema>;
export type Webhook = z.infer<typeof WebhookSchema>;
export type WebhookDelivery = z.infer<typeof WebhookDeliverySchema>;
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
export type ServerInfo = z.infer<typeof ServerInfoSchema>;
export type App = z.infer<typeof AppSchema>;
export type FileInfo = z.infer<typeof FileInfoSchema>;
export type SalesStatistics = z.infer<typeof SalesStatisticsSchema>;
export type TopItemStatistics = z.infer<typeof TopItemStatisticsSchema>;
export type Payout = z.infer<typeof PayoutSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type PullPayment = z.infer<typeof PullPaymentSchema>;
export type BoltcardLink = z.infer<typeof BoltcardLinkSchema>;
export type LNURLDetails = z.infer<typeof LNURLDetailsSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type InvoicePaymentMethod = z.infer<typeof InvoicePaymentMethodSchema>;
export type RefundTriggerData = z.infer<typeof RefundTriggerDataSchema>;
export type LightningInfo = z.infer<typeof LightningInfoSchema>;
export type LightningInvoice = z.infer<typeof LightningInvoiceSchema>;
export type StoreUser = z.infer<typeof StoreUserSchema>;
export type PosApp = z.infer<typeof PosAppSchema>;
export type HealthStatus = z.infer<typeof HealthStatusSchema>;
export type ServerPolicies = z.infer<typeof ServerPoliciesSchema>;
export type StoreRate = z.infer<typeof StoreRateSchema>;
export type RateSource = z.infer<typeof RateSourceSchema>;
export type RateConfiguration = z.infer<typeof RateConfigurationSchema>;
export type LightningBalance = z.infer<typeof LightningBalanceSchema>;
export type LightningChannel = z.infer<typeof LightningChannelSchema>;
export type LightningPayment = z.infer<typeof LightningPaymentSchema>;
export type LightningDeposit = z.infer<typeof LightningDepositSchema>;
export type LightningHistogram = z.infer<typeof LightningHistogramSchema>;
export type LightningAddress = z.infer<typeof LightningAddressSchema>;
export type LightningConnectRequest = z.infer<typeof LightningConnectRequestSchema>;
export type LightningChannelRequest = z.infer<typeof LightningChannelRequestSchema>;
export type LightningPayInvoiceRequest = z.infer<typeof LightningPayInvoiceRequestSchema>;
export type LightningCreateInvoiceRequest = z.infer<typeof LightningCreateInvoiceRequestSchema>;

// Store Email Settings
export const StoreEmailSettingsSchema = z.object({
  from: z.string(),
  server: z.string(),
  port: z.number(),
  login: z.string(),
  disableCertificateCheck: z.boolean(),
  passwordSet: z.boolean(),
  password: z.string().nullable().optional()
});

export const SendEmailRequestSchema = z.object({
  email: z.string(),
  subject: z.string(),
  body: z.string()
});

// Store Users
export const StoreUserDetailsSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  imageUrl: z.string().nullable(),
  invitationUrl: z.string().nullable(),
  emailConfirmed: z.boolean(),
  requiresEmailConfirmation: z.boolean(),
  approved: z.boolean(),
  requiresApproval: z.boolean(),
  created: z.number().nullable(),
  disabled: z.boolean(),
  roles: z.array(z.string()),
  userId: z.string().optional(), // Deprecated
  role: z.string().optional(),   // Deprecated
  storeRole: z.string()
});

// Store Wallet
export const StoreWalletOverviewSchema = z.object({
  balance: z.string(),
  unconfirmedBalance: z.string(),
  confirmedBalance: z.string()
});

export const StoreWalletFeeRateSchema = z.object({
  feerate: z.number()
});

export const StoreWalletAddressSchema = z.object({
  address: z.string(),
  keyPath: z.string(),
  paymentLink: z.string()
});

export const StoreWalletTransactionSchema = z.object({
  transactionHash: z.string(),
  comment: z.string().nullable(),
  amount: z.string(),
  blockHash: z.string().nullable(),
  blockHeight: z.string().nullable(),
  confirmations: z.string(),
  timestamp: z.number(),
  status: z.enum(["Confirmed", "Unconfirmed"]),
  labels: z.array(z.any())
});

export const StoreWalletUTXOSchema = z.object({
  comment: z.string().nullable(),
  amount: z.string(),
  link: z.string(),
  outpoint: z.string(),
  timestamp: z.number(),
  keyPath: z.string(),
  address: z.string(),
  confirmations: z.number(),
  labels: z.array(z.any())
});

export const StoreWalletObjectSchema = z.object({
  data: z.record(z.any()),
  links: z.array(z.any()).nullable(),
  type: z.string(),
  id: z.string()
});

// Store Payout Processors
export const StorePayoutProcessorSchema = z.object({
  name: z.string(),
  friendlyName: z.string(),
  payoutMethods: z.array(z.string())
});

export const OnChainPayoutProcessorSchema = z.object({
  payoutMethodId: z.string(),
  feeTargetBlock: z.number(),
  intervalSeconds: z.number(),
  threshold: z.string(),
  processNewPayoutsInstantly: z.boolean()
});

export const LightningPayoutProcessorSchema = z.object({
  payoutMethodId: z.string(),
  intervalSeconds: z.number(),
  cancelPayoutAfterFailures: z.number(),
  processNewPayoutsInstantly: z.boolean()
});

export type CrowdfundApp = z.infer<typeof CrowdfundAppSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Permission = z.infer<typeof PermissionSchema>;
export type ApiKeyCreation = z.infer<typeof ApiKeyCreationSchema>;

// Store-related types
export type StoreEmailSettings = z.infer<typeof StoreEmailSettingsSchema>;
export type SendEmailRequest = z.infer<typeof SendEmailRequestSchema>;
export type StoreUserDetails = z.infer<typeof StoreUserDetailsSchema>;
export type StoreWalletOverview = z.infer<typeof StoreWalletOverviewSchema>;
export type StoreWalletFeeRate = z.infer<typeof StoreWalletFeeRateSchema>;
export type StoreWalletAddress = z.infer<typeof StoreWalletAddressSchema>;
export type StoreWalletTransaction = z.infer<typeof StoreWalletTransactionSchema>;
export type StoreWalletUTXO = z.infer<typeof StoreWalletUTXOSchema>;
export type StoreWalletObject = z.infer<typeof StoreWalletObjectSchema>;
export type StorePayoutProcessor = z.infer<typeof StorePayoutProcessorSchema>;
export type OnChainPayoutProcessor = z.infer<typeof OnChainPayoutProcessorSchema>;
export type LightningPayoutProcessor = z.infer<typeof LightningPayoutProcessorSchema>;

// Notification Schemas
export const NotificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  type: z.string(),
  body: z.string(),
  storeId: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  createdTime: z.number(),
  seen: z.boolean()
});

export const NotificationSettingSchema = z.object({
  identifier: z.string(),
  name: z.string(),
  enabled: z.boolean()
});

export const UpdateNotificationRequestSchema = z.object({
  seen: z.boolean().optional().nullable()
});

export const UpdateNotificationSettingsRequestSchema = z.object({
  disabled: z.array(z.string())
});

// Notification Types
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationSetting = z.infer<typeof NotificationSettingSchema>;
export type UpdateNotificationRequest = z.infer<typeof UpdateNotificationRequestSchema>;
export type UpdateNotificationSettingsRequest = z.infer<typeof UpdateNotificationSettingsRequestSchema>;


