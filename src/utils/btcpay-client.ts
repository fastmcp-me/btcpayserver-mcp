import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  BTCPayServerConfig,
  Store,
  StoreSchema,
  PaymentRequest,
  PaymentRequestSchema,
  User,
  UserSchema,
  ApiKey,
  ApiKeySchema,
  Webhook,
  WebhookSchema,
  WebhookDelivery,
  WebhookDeliverySchema,
  ServerInfo,
  ServerInfoSchema,
  StoreEmailSettings,
  StoreEmailSettingsSchema,
  SendEmailRequest,
  StoreUserDetails,
  StoreUserDetailsSchema,
  StorePayoutProcessor,
  StorePayoutProcessorSchema,
  OnChainPayoutProcessor,
  OnChainPayoutProcessorSchema,
  LightningPayoutProcessor,
  LightningPayoutProcessorSchema,
  StoreWalletOverview,
  StoreWalletOverviewSchema,
  StoreWalletFeeRate,
  StoreWalletFeeRateSchema,
  StoreWalletAddress,
  StoreWalletAddressSchema,
  StoreWalletTransaction,
  StoreWalletTransactionSchema,
  StoreWalletUTXO,
  StoreWalletUTXOSchema,
  App,
  AppSchema,
  FileInfo,
  FileInfoSchema,
  SalesStatistics,
  SalesStatisticsSchema,
  TopItemStatistics,
  TopItemStatisticsSchema,
  Payout,
  PayoutSchema,
  Invoice,
  InvoiceSchema,
  PullPayment,
  PullPaymentSchema,
  BoltcardLink,
  BoltcardLinkSchema,
  LNURLDetails,
  LNURLDetailsSchema,
  PaymentMethod,
  PaymentMethodSchema,
  InvoicePaymentMethod,
  InvoicePaymentMethodSchema,
  RefundTriggerData,
  RefundTriggerDataSchema,
  LightningInfo,
  LightningInfoSchema,
  LightningInvoice,
  LightningInvoiceSchema,
  StoreUser,
  StoreUserSchema,
  PosApp,
  PosAppSchema,
  ServerPolicies,
  ServerPoliciesSchema,
  StoreRate,
  StoreRateSchema,
  RateConfiguration,
  RateConfigurationSchema,
  LightningBalance,
  LightningBalanceSchema,
  LightningChannel,
  LightningChannelSchema,
  LightningPayment,
  LightningPaymentSchema,
  LightningHistogram,
  LightningHistogramSchema,
  LightningAddress,
  LightningAddressSchema,
  LightningConnectRequest,
  LightningChannelRequest,
  LightningPayInvoiceRequest,
  LightningCreateInvoiceRequest,
  CrowdfundApp,
  CrowdfundAppSchema,
  Permission,
  PermissionSchema,
  ApiKeyCreation,
  ApiKeyCreationSchema,
  Notification,
  NotificationSchema,
  NotificationSetting,
  NotificationSettingSchema,
  UpdateNotificationRequest,
  UpdateNotificationSettingsRequest
} from '../types.js';

export class BTCPayServerClient {
  private client: AxiosInstance;
  private config: BTCPayServerConfig;

  constructor(config: BTCPayServerConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: `${config.baseUrl}/api/v1`,
      headers: {
        'Authorization': `token ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getConfig(): BTCPayServerConfig {
    return this.config;
  }

  private async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Enhanced error reporting for debugging
        const errorDetails = error.response?.data || error.message;
        const status = error.response?.status;
        // Log error details without exposing sensitive headers
        console.error('BTCPayServer API Error Details:', JSON.stringify({
          status,
          data: error.response?.data,
          url: config.url?.replace(/\/api-keys\/[^\/]+/, '/api-keys/***'), // Mask API keys in URL
          method: config.method
        }, null, 2));
        throw new Error(`BTCPayServer API error: ${status} - ${typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails)}`);
      }
      throw error;
    }
  }

  // Server Info
  async getServerInfo(): Promise<ServerInfo> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: '/server/info'
    });
    return ServerInfoSchema.parse(data);
  }

  // User Management
  async createUser(
    email: string,
    password?: string,
    name?: string,
    imageUrl?: string,
    isAdministrator: boolean = false,
    sendInvitationEmail: boolean = true
  ): Promise<User> {
    const requestData: any = {
      email,
      isAdministrator,
      sendInvitationEmail
    };

    if (password !== undefined) requestData.password = password;
    if (name !== undefined) requestData.name = name;
    if (imageUrl !== undefined) requestData.imageUrl = imageUrl;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: '/users',
      data: requestData
    });
    return UserSchema.parse(data);
  }

  async getUser(userId?: string): Promise<User> {
    // BTCPayServer API only supports getting current user (/users/me)
    // Getting other users by ID is not supported in the public API
    if (userId) {
      throw new Error('BTCPayServer API does not support getting other users by ID. Only current user (/users/me) is supported.');
    }
    
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: '/users/me'
    });
    return UserSchema.parse(data);
  }

  async updateUser(
    email?: string,
    name?: string,
    imageUrl?: string,
    currentPassword?: string,
    newPassword?: string
  ): Promise<User> {
    const requestData: any = {};

    if (email !== undefined) requestData.email = email;
    if (name !== undefined) requestData.name = name;
    if (imageUrl !== undefined) requestData.imageUrl = imageUrl;
    if (currentPassword !== undefined) requestData.currentPassword = currentPassword;
    if (newPassword !== undefined) requestData.newPassword = newPassword;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: '/users/me',
      data: requestData
    });
    return UserSchema.parse(data);
  }

  async deleteCurrentUser(): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: '/users/me'
    });
  }

  async uploadProfilePicture(fileData: FormData): Promise<User> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: '/users/me/picture',
      data: fileData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return UserSchema.parse(data);
  }

  async deleteProfilePicture(): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: '/users/me/picture'
    });
  }

  async listAllUsers(): Promise<User[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: '/users'
    });
    return data.map(item => UserSchema.parse(item));
  }

  async getUserByIdOrEmail(idOrEmail: string): Promise<User> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/users/${idOrEmail}`
    });
    return UserSchema.parse(data);
  }

  async deleteUserByIdOrEmail(idOrEmail: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/users/${idOrEmail}`
    });
  }

  async lockUser(idOrEmail: string, locked: boolean): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/users/${idOrEmail}/lock`,
      data: { locked }
    });
  }

  async approveUser(idOrEmail: string, approved: boolean): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/users/${idOrEmail}/approve`,
      data: { approved }
    });
  }

  // Store Management
  async createStore(name: string, defaultCurrency: string = 'USD', website?: string): Promise<Store> {
    const storeData: any = {
      name,
      defaultCurrency,
      speedPolicy: 'MediumSpeed',
      invoiceExpiration: 900,
      monitoringExpiration: 3600,
      paymentTolerance: 0,
      anyoneCanCreateInvoice: false,
      requiresRefundEmail: false,
      lightningAmountInSatoshi: false,
      lightningPrivateRouteHints: false,
      onChainWithLnInvoiceFallback: false,
      lazyPaymentMethods: false,
      redirectAutomatically: false,
      showRecommendedFee: true,
      recommendedFeeBlockTarget: 1
    };

    // Only include website if provided
    if (website) {
      storeData.website = website;
    }

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: '/stores',
      data: storeData
    });
    return StoreSchema.parse(data);
  }

  async getStore(storeId: string): Promise<Store> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}`
    });
    return StoreSchema.parse(data);
  }

  // Payment Request Management
  async createPaymentRequest(
    storeId: string,
    amount?: string,
    currency: string = 'USD',
    title?: string,
    description?: string,
    expiryDate?: string,
    email?: string,
    allowCustomPaymentAmounts: boolean = false,
    referenceId?: string
  ): Promise<PaymentRequest> {
    const requestData: any = {};

    if (allowCustomPaymentAmounts) {
      // For custom amounts, BTCPayServer still requires a default amount > 0
      requestData.allowCustomPaymentAmounts = true;
      requestData.currency = currency;
      // Use provided amount as default, or fallback to "1.00" as minimum
      requestData.amount = (amount && parseFloat(amount) > 0) ? amount : "1.00";
    } else {
      // For fixed amounts, include amount and currency
      requestData.currency = currency;
      if (amount !== undefined && amount !== null) {
        requestData.amount = amount;
      }
    }
    
    // Only include fields that have values
    if (title !== undefined && title !== null) requestData.title = title;
    if (description !== undefined && description !== null) requestData.description = description;
    if (expiryDate !== undefined && expiryDate !== null) {
      // Convert ISO date string to Unix timestamp (BTCPayServer expects integer)
      const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);
      if (!isNaN(expiryTimestamp)) {
        requestData.expiryDate = expiryTimestamp;
      }
    }
    if (email !== undefined && email !== null) requestData.email = email;
    if (referenceId !== undefined && referenceId !== null) requestData.referenceId = referenceId;

    // Debug: Log the request data (remove in production)
    // console.log('Payment Request Data:', JSON.stringify(requestData, null, 2));
    
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payment-requests`,
      data: requestData
    });
    return PaymentRequestSchema.parse(data);
  }

  async getPaymentRequests(storeId: string): Promise<PaymentRequest[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payment-requests`
    });
    return data.map(item => PaymentRequestSchema.parse(item));
  }

  async getPaymentRequest(storeId: string, paymentRequestId: string): Promise<PaymentRequest> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-requests/${paymentRequestId}`
    });
    return PaymentRequestSchema.parse(data);
  }

  async deletePaymentRequest(storeId: string, paymentRequestId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payment-requests/${paymentRequestId}`
    });
  }

  async updatePaymentRequest(
    storeId: string,
    paymentRequestId: string,
    amount?: string,
    currency?: string,
    title?: string,
    description?: string,
    expiryDate?: string,
    email?: string,
    allowCustomPaymentAmounts?: boolean,
    referenceId?: string,
    formId?: string,
    formResponse?: any
  ): Promise<PaymentRequest> {
    const requestData: any = {};

    // Only include fields that have values
    if (amount !== undefined && amount !== null) requestData.amount = amount;
    if (currency !== undefined && currency !== null) requestData.currency = currency;
    if (title !== undefined && title !== null) requestData.title = title;
    if (description !== undefined && description !== null) requestData.description = description;
    if (expiryDate !== undefined && expiryDate !== null) {
      // Convert ISO date string to Unix timestamp (BTCPayServer expects integer)
      const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);
      if (!isNaN(expiryTimestamp)) {
        requestData.expiryDate = expiryTimestamp;
      }
    }
    if (email !== undefined && email !== null) requestData.email = email;
    if (allowCustomPaymentAmounts !== undefined && allowCustomPaymentAmounts !== null) requestData.allowCustomPaymentAmounts = allowCustomPaymentAmounts;
    if (referenceId !== undefined && referenceId !== null) requestData.referenceId = referenceId;
    if (formId !== undefined && formId !== null) requestData.formId = formId;
    if (formResponse !== undefined && formResponse !== null) requestData.formResponse = formResponse;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/payment-requests/${paymentRequestId}`,
      data: requestData
    });
    return PaymentRequestSchema.parse(data);
  }

  async payPaymentRequest(
    storeId: string,
    paymentRequestId: string,
    amount?: string,
    allowPendingInvoiceReuse: boolean = false
  ): Promise<Invoice> {
    const requestData: any = {
      allowPendingInvoiceReuse
    };

    if (amount !== undefined && amount !== null) requestData.amount = amount;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payment-requests/${paymentRequestId}/pay`,
      data: requestData
    });
    return InvoiceSchema.parse(data);
  }

  // API Key Management
  async getApiKey(): Promise<ApiKey> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: '/api-keys/current'
    });
    return ApiKeySchema.parse(data);
  }

  async deleteApiKey(apiKey: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/api-keys/${apiKey}`
    });
  }

  async revokeCurrentApiKey(): Promise<ApiKey> {
    const data = await this.makeRequest<any>({
      method: 'DELETE',
      url: '/api-keys/current'
    });
    return ApiKeySchema.parse(data);
  }

  async createApiKeyForUser(
    idOrEmail: string,
    permissions: string[],
    label?: string
  ): Promise<ApiKeyCreation> {
    const requestData: any = { permissions };
    if (label !== undefined) requestData.label = label;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/users/${idOrEmail}/api-keys`,
      data: requestData
    });
    return ApiKeyCreationSchema.parse(data);
  }

  async deleteApiKeyForUser(idOrEmail: string, apiKey: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/users/${idOrEmail}/api-keys/${apiKey}`
    });
  }

  // Webhook Management
  async registerWebhook(
    storeId: string,
    url: string,
    events?: string[],
    secret?: string,
    enabled: boolean = true,
    automaticRedelivery: boolean = true
  ): Promise<Webhook> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/webhooks`,
      data: {
        enabled,
        automaticRedelivery,
        url,
        secret,
        authorizedEvents: {
          everything: !events || events.length === 0,
          specificEvents: events || []
        }
      }
    });
    return WebhookSchema.parse(data);
  }

  async getStoreWebhook(storeId: string, webhookId: string): Promise<Webhook> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/webhooks/${webhookId}`
    });
    return WebhookSchema.parse(data);
  }

  async listStoreWebhooks(storeId: string): Promise<Webhook[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/webhooks`
    });
    return data.map(item => WebhookSchema.parse(item));
  }

  async createWebhook(storeId: string, url: string, events: string[], secret?: string): Promise<Webhook> {
    const requestData: any = {
      url,
      events,
      ...(secret && { secret })
    };

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/webhooks`,
      data: requestData
    });
    return WebhookSchema.parse(data);
  }

  async deleteWebhook(storeId: string, webhookId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/webhooks/${webhookId}`
    });
  }

  async updateWebhook(
    storeId: string,
    webhookId: string,
    enabled?: boolean,
    automaticRedelivery?: boolean,
    url?: string,
    authorizedEvents?: { everything?: boolean; specificEvents?: string[] },
    secret?: string
  ): Promise<Webhook> {
    const requestData: any = {};
    
    if (enabled !== undefined) requestData.enabled = enabled;
    if (automaticRedelivery !== undefined) requestData.automaticRedelivery = automaticRedelivery;
    if (url !== undefined) requestData.url = url;
    if (authorizedEvents !== undefined) requestData.authorizedEvents = authorizedEvents;
    if (secret !== undefined) requestData.secret = secret;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/webhooks/${webhookId}`,
      data: requestData
    });
    return WebhookSchema.parse(data);
  }

  async getWebhookDeliveries(
    storeId: string,
    webhookId: string,
    count?: number
  ): Promise<WebhookDelivery[]> {
    const params = new URLSearchParams();
    if (count) params.append('count', count.toString());

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/webhooks/${webhookId}/deliveries${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => WebhookDeliverySchema.parse(item));
  }

  async getWebhookDelivery(
    storeId: string,
    webhookId: string,
    deliveryId: string
  ): Promise<WebhookDelivery> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}`
    });
    return WebhookDeliverySchema.parse(data);
  }

  async getWebhookDeliveryRequest(
    storeId: string,
    webhookId: string,
    deliveryId: string
  ): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}/request`
    });
    return data;
  }

  async redeliverWebhook(
    storeId: string,
    webhookId: string,
    deliveryId: string
  ): Promise<string> {
    const data = await this.makeRequest<string>({
      method: 'POST',
      url: `/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}/redeliver`
    });
    return data;
  }

  // Apps Management
  async listAllApps(): Promise<App[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: '/apps'
    });
    return data.map(item => AppSchema.parse(item));
  }

  async listStoreApps(storeId: string): Promise<App[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/apps`
    });
    return data.map(item => AppSchema.parse(item));
  }

  async getApp(appId: string): Promise<App> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/apps/${appId}`
    });
    return AppSchema.parse(data);
  }

  async deleteApp(appId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/apps/${appId}`
    });
  }

  async uploadAppImage(appId: string, fileData: FormData): Promise<FileInfo> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/apps/${appId}/image`,
      data: fileData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return FileInfoSchema.parse(data);
  }

  async deleteAppImage(appId: string, fileId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/apps/${appId}/image/${fileId}`
    });
  }

  async getAppSalesStatistics(appId: string, numberOfDays: number = 7): Promise<SalesStatistics> {
    const params = new URLSearchParams();
    if (numberOfDays) params.append('numberOfDays', numberOfDays.toString());

    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/apps/${appId}/sales${params.toString() ? '?' + params.toString() : ''}`
    });
    return SalesStatisticsSchema.parse(data);
  }

  async getAppTopItems(appId: string, count: number = 5, offset: number = 0): Promise<TopItemStatistics[]> {
    const params = new URLSearchParams();
    if (count) params.append('count', count.toString());
    if (offset) params.append('offset', offset.toString());

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/apps/${appId}/top-items${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => TopItemStatisticsSchema.parse(item));
  }

  // Payout Management
  async deleteStorePayout(storeId: string, payoutId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payouts/${payoutId}`
    });
  }

  // Invoice Management
  async createInvoice(
    storeId: string,
    amount?: string,
    currency: string = 'USD',
    orderId?: string,
    notificationEmail?: string,
    notificationURL?: string,
    redirectURL?: string,
    defaultPaymentMethod?: string,
    metadata?: Record<string, any>
  ): Promise<Invoice> {
    const requestData: any = {
      currency
    };

    if (amount !== undefined && amount !== null) requestData.amount = amount;
    if (orderId !== undefined && orderId !== null) requestData.orderId = orderId;
    if (notificationEmail !== undefined && notificationEmail !== null) requestData.notificationEmail = notificationEmail;
    if (notificationURL !== undefined && notificationURL !== null) requestData.notificationURL = notificationURL;
    if (redirectURL !== undefined && redirectURL !== null) requestData.redirectURL = redirectURL;
    if (defaultPaymentMethod !== undefined && defaultPaymentMethod !== null) requestData.defaultPaymentMethod = defaultPaymentMethod;
    if (metadata !== undefined && metadata !== null) requestData.metadata = metadata;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/invoices`,
      data: requestData
    });
    return InvoiceSchema.parse(data);
  }

  async getInvoice(storeId: string, invoiceId: string): Promise<Invoice> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/invoices/${invoiceId}`
    });
    return InvoiceSchema.parse(data);
  }

  async listInvoices(storeId: string, orderId?: string, status?: string[]): Promise<Invoice[]> {
    const params = new URLSearchParams();
    if (orderId) params.append('orderId', orderId);
    if (status) status.forEach(s => params.append('status', s));

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/invoices${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => InvoiceSchema.parse(item));
  }

  async updateInvoice(storeId: string, invoiceId: string, metadata?: Record<string, any>): Promise<Invoice> {
    const requestData: any = {};
    if (metadata !== undefined && metadata !== null) requestData.metadata = metadata;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/invoices/${invoiceId}`,
      data: requestData
    });
    return InvoiceSchema.parse(data);
  }

  async archiveInvoice(storeId: string, invoiceId: string): Promise<Invoice> {
    const data = await this.makeRequest<any>({
      method: 'DELETE',
      url: `/stores/${storeId}/invoices/${invoiceId}`
    });
    return InvoiceSchema.parse(data);
  }

  async listInvoicesAdvanced(
    storeId: string,
    orderId?: string[],
    textSearch?: string,
    status?: string,
    endDate?: number,
    take?: number,
    skip?: number,
    startDate?: number
  ): Promise<Invoice[]> {
    const params = new URLSearchParams();
    
    if (orderId) orderId.forEach(id => params.append('orderId', id));
    if (textSearch) params.append('textSearch', textSearch);
    if (status) params.append('status', status);
    if (endDate) params.append('endDate', endDate.toString());
    if (take) params.append('take', take.toString());
    if (skip) params.append('skip', skip.toString());
    if (startDate) params.append('startDate', startDate.toString());

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/invoices${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => InvoiceSchema.parse(item));
  }

  async getInvoicePaymentMethods(
    storeId: string,
    invoiceId: string,
    includeSensitive: boolean = false,
    onlyAccountedPayments: boolean = true
  ): Promise<InvoicePaymentMethod[]> {
    const params = new URLSearchParams();
    if (includeSensitive) params.append('includeSensitive', 'true');
    if (!onlyAccountedPayments) params.append('onlyAccountedPayments', 'false');

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/invoices/${invoiceId}/payment-methods${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => InvoicePaymentMethodSchema.parse(item));
  }

  async getInvoiceRefundTriggerData(
    storeId: string,
    invoiceId: string,
    paymentMethodId: string
  ): Promise<RefundTriggerData> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/invoices/${invoiceId}/refund/${paymentMethodId}`
    });
    return RefundTriggerDataSchema.parse(data);
  }

  async markInvoiceStatus(
    storeId: string,
    invoiceId: string,
    status: 'Invalid' | 'Settled'
  ): Promise<Invoice> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/invoices/${invoiceId}/status`,
      data: { status }
    });
    return InvoiceSchema.parse(data);
  }

  async unarchiveInvoice(storeId: string, invoiceId: string): Promise<Invoice> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/invoices/${invoiceId}/unarchive`
    });
    return InvoiceSchema.parse(data);
  }

  async activatePaymentMethod(
    storeId: string,
    invoiceId: string,
    paymentMethodId: string
  ): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/invoices/${invoiceId}/payment-methods/${paymentMethodId}/activate`
    });
  }

  async refundInvoice(
    storeId: string,
    invoiceId: string,
    name?: string,
    description?: string,
    payoutMethodId?: string,
    refundVariant?: 'CurrentRate' | 'Custom' | 'Fiat' | 'OverpaidAmount' | 'RateThen',
    subtractPercentage?: string,
    customAmount?: string,
    customCurrency?: string
  ): Promise<PullPayment> {
    const requestData: any = {};
    
    if (name !== undefined) requestData.name = name;
    if (description !== undefined) requestData.description = description;
    if (payoutMethodId !== undefined) requestData.payoutMethodId = payoutMethodId;
    if (refundVariant !== undefined) requestData.refundVariant = refundVariant;
    if (subtractPercentage !== undefined) requestData.subtractPercentage = subtractPercentage;
    if (customAmount !== undefined) requestData.customAmount = customAmount;
    if (customCurrency !== undefined) requestData.customCurrency = customCurrency;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/invoices/${invoiceId}/refund`,
      data: requestData
    });
    return PullPaymentSchema.parse(data);
  }

  // Extended Store Management
  async updateStore(storeId: string, updates: Partial<Store>): Promise<Store> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}`,
      data: updates
    });
    return StoreSchema.parse(data);
  }

  async deleteStore(storeId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}`
    });
  }

  async listStores(): Promise<Store[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: '/stores'
    });
    return data.map(item => StoreSchema.parse(item));
  }

  // Payment Methods Management
  async getStorePaymentMethods(storeId: string, enabled?: boolean): Promise<PaymentMethod[]> {
    const params = enabled !== undefined ? `?enabled=${enabled}` : '';
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods${params}`
    });
    return data.map(item => PaymentMethodSchema.parse(item));
  }


  // Pull Payments Management
  async listStorePullPayments(storeId: string, includeArchived: boolean = false): Promise<PullPayment[]> {
    const params = new URLSearchParams();
    if (includeArchived) params.append('includeArchived', includeArchived.toString());

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/pull-payments${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => PullPaymentSchema.parse(item));
  }

  async createPullPayment(storeId: string, pullPaymentData: {
    name?: string;
    description?: string;
    amount: string;
    currency: string;
    BOLT11Expiration?: number;
    autoApproveClaims?: boolean;
    startsAt?: number;
    expiresAt?: number;
    payoutMethods?: string[];
  }): Promise<PullPayment> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/pull-payments`,
      data: pullPaymentData
    });
    return PullPaymentSchema.parse(data);
  }

  async archivePullPayment(storeId: string, pullPaymentId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/pull-payments/${pullPaymentId}`
    });
  }

  // Pull Payments Public API
  async linkBoltcard(pullPaymentId: string, boltcardData: {
    UID: string;
    onExisting?: 'KeepVersion' | 'UpdateVersion';
  }): Promise<BoltcardLink> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/pull-payments/${pullPaymentId}/boltcards`,
      data: boltcardData
    });
    return BoltcardLinkSchema.parse(data);
  }

  async getPullPayment(pullPaymentId: string): Promise<PullPayment> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/pull-payments/${pullPaymentId}`
    });
    return PullPaymentSchema.parse(data);
  }

  async getPullPaymentPayouts(pullPaymentId: string, includeCancelled: boolean = false): Promise<Payout[]> {
    const params = new URLSearchParams();
    if (includeCancelled) params.append('includeCancelled', includeCancelled.toString());

    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/pull-payments/${pullPaymentId}/payouts${params.toString() ? '?' + params.toString() : ''}`
    });
    return data.map(item => PayoutSchema.parse(item));
  }

  async createPayout(pullPaymentId: string, payoutData: {
    destination: string;
    amount: string;
    payoutMethodId: string;
  }): Promise<Payout> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/pull-payments/${pullPaymentId}/payouts`,
      data: payoutData
    });
    return PayoutSchema.parse(data);
  }

  async getPayout(pullPaymentId: string, payoutId: string): Promise<Payout> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/pull-payments/${pullPaymentId}/payouts/${payoutId}`
    });
    return PayoutSchema.parse(data);
  }

  async getPullPaymentLNURL(pullPaymentId: string): Promise<LNURLDetails> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/pull-payments/${pullPaymentId}/lnurl`
    });
    return LNURLDetailsSchema.parse(data);
  }

  // Lightning Network Management
  async getLightningInfo(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningInfo> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/info`
    });
    return LightningInfoSchema.parse(data);
  }

  async createLightningInvoice(
    storeId: string,
    cryptoCode: string = 'BTC',
    amount: string,
    description?: string,
    expiry?: number
  ): Promise<LightningInvoice> {
    const requestData: any = { amount };
    if (description !== undefined) requestData.description = description;
    if (expiry !== undefined) requestData.expiry = expiry;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices`,
      data: requestData
    });
    return LightningInvoiceSchema.parse(data);
  }

  async getLightningInvoice(storeId: string, cryptoCode: string = 'BTC', invoiceId: string): Promise<LightningInvoice> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices/${invoiceId}`
    });
    return LightningInvoiceSchema.parse(data);
  }

  // Advanced Lightning Network Management
  async getLightningBalance(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningBalance> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/balance`
    });
    return LightningBalanceSchema.parse(data);
  }

  async connectToLightningNode(
    storeId: string,
    cryptoCode: string = 'BTC',
    nodeURI: string
  ): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/connect`,
      data: { nodeURI }
    });
    return data;
  }

  async getLightningChannels(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningChannel[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/channels`
    });
    return data.map(item => LightningChannelSchema.parse(item));
  }

  async openLightningChannel(
    storeId: string,
    cryptoCode: string = 'BTC',
    nodeURI: string,
    channelAmount: string,
    feeRate?: number
  ): Promise<any> {
    const requestData: any = { nodeURI, channelAmount };
    if (feeRate !== undefined) requestData.feeRate = feeRate;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/channels`,
      data: requestData
    });
    return data;
  }

  async getLightningPayment(
    storeId: string,
    cryptoCode: string = 'BTC',
    paymentHash: string
  ): Promise<LightningPayment> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/payments/${paymentHash}`
    });
    return LightningPaymentSchema.parse(data);
  }

  async payLightningInvoice(
    storeId: string,
    cryptoCode: string = 'BTC',
    bolt11: string,
    amount?: string
  ): Promise<LightningPayment> {
    const requestData: any = { BOLT11: bolt11 };
    if (amount !== undefined) requestData.amount = amount;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/payments`,
      data: requestData
    });
    return LightningPaymentSchema.parse(data);
  }

  async getLightningDeposits(storeId: string, cryptoCode: string = 'BTC'): Promise<string> {
    const data = await this.makeRequest<string>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/address`
    });
    return data;
  }

  async getLightningHistogram(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningHistogram> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/histogram`
    });
    return LightningHistogramSchema.parse(data);
  }

  async getLightningInvoices(
    storeId: string, 
    cryptoCode: string = 'BTC', 
    pendingOnly: boolean = false, 
    offsetIndex: number = 0
  ): Promise<LightningInvoice[]> {
    const params = new URLSearchParams();
    if (pendingOnly) params.append('pendingOnly', 'true');
    if (offsetIndex > 0) params.append('offsetIndex', offsetIndex.toString());
    
    const queryString = params.toString();
    const url = `/stores/${storeId}/lightning/${cryptoCode}/invoices${queryString ? '?' + queryString : ''}`;
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => LightningInvoiceSchema.parse(item));
  }

  async getLightningPayments(
    storeId: string, 
    cryptoCode: string = 'BTC', 
    includePending: boolean = false, 
    offsetIndex: number = 0
  ): Promise<LightningPayment[]> {
    const params = new URLSearchParams();
    if (includePending) params.append('includePending', 'true');
    if (offsetIndex > 0) params.append('offsetIndex', offsetIndex.toString());
    
    const queryString = params.toString();
    const url = `/stores/${storeId}/lightning/${cryptoCode}/payments${queryString ? '?' + queryString : ''}`;
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => LightningPaymentSchema.parse(item));
  }

  // Lightning Internal Node Management
  async getInternalLightningInfo(cryptoCode: string = 'BTC'): Promise<LightningInfo> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/info`
    });
    return LightningInfoSchema.parse(data);
  }

  async getInternalLightningBalance(cryptoCode: string = 'BTC'): Promise<LightningBalance> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/balance`
    });
    return LightningBalanceSchema.parse(data);
  }

  async getInternalLightningHistogram(cryptoCode: string = 'BTC'): Promise<LightningHistogram> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/histogram`
    });
    return LightningHistogramSchema.parse(data);
  }

  async connectToInternalLightningNode(cryptoCode: string = 'BTC', nodeURI: string): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/server/lightning/${cryptoCode}/connect`,
      data: { nodeURI }
    });
    return data;
  }

  async getInternalLightningChannels(cryptoCode: string = 'BTC'): Promise<LightningChannel[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/channels`
    });
    return data.map(item => LightningChannelSchema.parse(item));
  }

  async openInternalLightningChannel(
    cryptoCode: string = 'BTC',
    nodeURI: string,
    channelAmount: string,
    feeRate?: number
  ): Promise<any> {
    const requestData: any = { nodeURI, channelAmount };
    if (feeRate !== undefined) requestData.feeRate = feeRate;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/server/lightning/${cryptoCode}/channels`,
      data: requestData
    });
    return data;
  }

  async getInternalLightningDeposit(cryptoCode: string = 'BTC'): Promise<string> {
    const data = await this.makeRequest<string>({
      method: 'POST',
      url: `/server/lightning/${cryptoCode}/address`
    });
    return data;
  }

  async getInternalLightningPayment(cryptoCode: string = 'BTC', paymentHash: string): Promise<LightningPayment> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/payments/${paymentHash}`
    });
    return LightningPaymentSchema.parse(data);
  }

  async getInternalLightningInvoice(cryptoCode: string = 'BTC', invoiceId: string): Promise<LightningInvoice> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/server/lightning/${cryptoCode}/invoices/${invoiceId}`
    });
    return LightningInvoiceSchema.parse(data);
  }

  async payInternalLightningInvoice(
    cryptoCode: string = 'BTC',
    bolt11: string,
    amount?: string,
    maxFeePercent?: string,
    maxFeeFlat?: string,
    sendTimeout?: number
  ): Promise<LightningPayment> {
    const requestData: any = { BOLT11: bolt11 };
    if (amount !== undefined) requestData.amount = amount;
    if (maxFeePercent !== undefined) requestData.maxFeePercent = maxFeePercent;
    if (maxFeeFlat !== undefined) requestData.maxFeeFlat = maxFeeFlat;
    if (sendTimeout !== undefined) requestData.sendTimeout = sendTimeout;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/server/lightning/${cryptoCode}/invoices/pay`,
      data: requestData
    });
    return LightningPaymentSchema.parse(data);
  }

  async getInternalLightningInvoices(
    cryptoCode: string = 'BTC', 
    pendingOnly: boolean = false, 
    offsetIndex: number = 0
  ): Promise<LightningInvoice[]> {
    const params = new URLSearchParams();
    if (pendingOnly) params.append('pendingOnly', 'true');
    if (offsetIndex > 0) params.append('offsetIndex', offsetIndex.toString());
    
    const queryString = params.toString();
    const url = `/server/lightning/${cryptoCode}/invoices${queryString ? '?' + queryString : ''}`;
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => LightningInvoiceSchema.parse(item));
  }

  async createInternalLightningInvoice(
    cryptoCode: string = 'BTC',
    amount: string,
    description?: string,
    descriptionHashOnly?: boolean,
    expiry?: number,
    privateRouteHints?: boolean
  ): Promise<LightningInvoice> {
    const requestData: any = { amount };
    if (description !== undefined) requestData.description = description;
    if (descriptionHashOnly !== undefined) requestData.descriptionHashOnly = descriptionHashOnly;
    if (expiry !== undefined) requestData.expiry = expiry;
    if (privateRouteHints !== undefined) requestData.privateRouteHints = privateRouteHints;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/server/lightning/${cryptoCode}/invoices`,
      data: requestData
    });
    return LightningInvoiceSchema.parse(data);
  }

  async getInternalLightningPayments(
    cryptoCode: string = 'BTC', 
    includePending: boolean = false, 
    offsetIndex: number = 0
  ): Promise<LightningPayment[]> {
    const params = new URLSearchParams();
    if (includePending) params.append('includePending', 'true');
    if (offsetIndex > 0) params.append('offsetIndex', offsetIndex.toString());
    
    const queryString = params.toString();
    const url = `/server/lightning/${cryptoCode}/payments${queryString ? '?' + queryString : ''}`;
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => LightningPaymentSchema.parse(item));
  }

  // Lightning Address Management
  async getLightningAddresses(storeId: string): Promise<LightningAddress[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/lightning-addresses`
    });
    return data.map(item => LightningAddressSchema.parse(item));
  }

  async getLightningAddress(storeId: string, username: string): Promise<LightningAddress> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning-addresses/${username}`
    });
    return LightningAddressSchema.parse(data);
  }

  async createOrUpdateLightningAddress(
    storeId: string,
    username: string,
    currencyCode?: string,
    min?: string,
    max?: string,
    invoiceMetadata?: Record<string, any>
  ): Promise<LightningAddress> {
    const requestData: any = { username };
    if (currencyCode !== undefined) requestData.currencyCode = currencyCode;
    if (min !== undefined) requestData.min = min;
    if (max !== undefined) requestData.max = max;
    if (invoiceMetadata !== undefined) requestData.invoiceMetadata = invoiceMetadata;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning-addresses/${username}`,
      data: requestData
    });
    return LightningAddressSchema.parse(data);
  }

  async deleteLightningAddress(storeId: string, username: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/lightning-addresses/${username}`
    });
  }

  // Store Rates Management
  async getStoreRates(storeId: string, currencyPair?: string[]): Promise<StoreRate[]> {
    const params = new URLSearchParams();
    if (currencyPair && currencyPair.length > 0) {
      currencyPair.forEach(pair => params.append('currencyPair', pair));
    }
    
    const url = `/stores/${storeId}/rates${params.toString() ? `?${params.toString()}` : ''}`;
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => StoreRateSchema.parse(item));
  }

  async previewStoreRates(storeId: string, currencyPair?: string[], dateTime?: string): Promise<StoreRate[]> {
    const params = new URLSearchParams();
    if (currencyPair && currencyPair.length > 0) {
      currencyPair.forEach(pair => params.append('currencyPair', pair));
    }
    if (dateTime) {
      params.append('dateTime', dateTime);
    }
    
    const url = `/stores/${storeId}/rates/preview${params.toString() ? `?${params.toString()}` : ''}`;
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url
    });
    return data.map(item => StoreRateSchema.parse(item));
  }


  async getRateConfiguration(storeId: string): Promise<RateConfiguration> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/rates/configuration`
    });
    return RateConfigurationSchema.parse(data);
  }

  async updateRateConfiguration(storeId: string, configuration: Partial<RateConfiguration>): Promise<RateConfiguration> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/rates/configuration`,
      data: configuration
    });
    return RateConfigurationSchema.parse(data);
  }

  // Store Users Management
  async listStoreUsers(storeId: string): Promise<StoreUser[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/users`
    });
    return data.map(item => StoreUserSchema.parse(item));
  }


  // Point of Sale Apps
  async createPosApp(storeId: string, posAppData: {
    appName: string;
    title?: string;
    description?: string;
    defaultView?: 'Static' | 'Cart' | 'Light' | 'Print';
    showItems?: boolean;
    showCustomAmount?: boolean;
    showDiscount?: boolean;
    showSearch?: boolean;
    showCategories?: boolean;
    enableTips?: boolean;
    currency?: string;
    fixedAmountPayButtonText?: string;
    customAmountPayButtonText?: string;
    tipText?: string;
    customTipPercentages?: number[];
    notificationUrl?: string;
    redirectUrl?: string;
    redirectAutomatically?: boolean;
    htmlLang?: string;
    htmlMetaTags?: string;
    formId?: string;
    template?: string;
    archived?: boolean;
  }): Promise<PosApp> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/apps/pos`,
      data: posAppData
    });
    return PosAppSchema.parse(data);
  }

  async getPosApp(appId: string): Promise<PosApp> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/apps/pos/${appId}`
    });
    return PosAppSchema.parse(data);
  }

  async updatePosApp(appId: string, posAppData: {
    appName?: string;
    title?: string;
    description?: string;
    defaultView?: 'Static' | 'Cart' | 'Light' | 'Print';
    showItems?: boolean;
    showCustomAmount?: boolean;
    showDiscount?: boolean;
    showSearch?: boolean;
    showCategories?: boolean;
    enableTips?: boolean;
    currency?: string;
    fixedAmountPayButtonText?: string;
    customAmountPayButtonText?: string;
    tipText?: string;
    customTipPercentages?: number[];
    notificationUrl?: string;
    redirectUrl?: string;
    redirectAutomatically?: boolean;
    htmlLang?: string;
    htmlMetaTags?: string;
    formId?: string;
    template?: string;
    archived?: boolean;
  }): Promise<PosApp> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/apps/pos/${appId}`,
      data: posAppData
    });
    return PosAppSchema.parse(data);
  }

  // Health and Monitoring
  async getServerPolicies(): Promise<ServerPolicies> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: '/server/policies'
    });
    return ServerPoliciesSchema.parse(data);
  }


  // Crowdfund Apps
  async createCrowdfundApp(storeId: string, crowdfundData: {
    appName: string;
    title?: string;
    description?: string;
    enabled?: boolean;
    enforceTargetAmount?: boolean;
    startDate?: number;
    endDate?: number;
    targetCurrency?: string;
    targetAmount?: number;
    mainImageUrl?: string;
    notificationUrl?: string;
    tagline?: string;
    disqusEnabled?: boolean;
    disqusShortname?: string;
    soundsEnabled?: boolean;
    animationsEnabled?: boolean;
    resetEveryAmount?: number;
    resetEvery?: string;
    displayPerksValue?: boolean;
    sortPerksByPopularity?: boolean;
    sounds?: string[];
    animationColors?: string[];
    htmlLang?: string;
    htmlMetaTags?: string;
    formId?: string;
    perksTemplate?: string;
    archived?: boolean;
  }): Promise<CrowdfundApp> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/apps/crowdfund`,
      data: crowdfundData
    });
    return CrowdfundAppSchema.parse(data);
  }

  async getCrowdfundApp(appId: string): Promise<CrowdfundApp> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/apps/crowdfund/${appId}`
    });
    return CrowdfundAppSchema.parse(data);
  }

  async updateCrowdfundApp(appId: string, crowdfundData: {
    appName?: string;
    title?: string;
    description?: string;
    enabled?: boolean;
    enforceTargetAmount?: boolean;
    startDate?: number;
    endDate?: number;
    targetCurrency?: string;
    targetAmount?: number;
    mainImageUrl?: string;
    notificationUrl?: string;
    tagline?: string;
    disqusEnabled?: boolean;
    disqusShortname?: string;
    soundsEnabled?: boolean;
    animationsEnabled?: boolean;
    resetEveryAmount?: number;
    resetEvery?: string;
    displayPerksValue?: boolean;
    sortPerksByPopularity?: boolean;
    sounds?: string[];
    animationColors?: string[];
    htmlLang?: string;
    htmlMetaTags?: string;
    formId?: string;
    perksTemplate?: string;
    archived?: boolean;
  }): Promise<CrowdfundApp> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/apps/crowdfund/${appId}`,
      data: crowdfundData
    });
    return CrowdfundAppSchema.parse(data);
  }

  // Advanced API Key Management
  async createApiKey(permissions: string[], label?: string, storeId?: string): Promise<ApiKeyCreation> {
    const requestData: any = { permissions };
    if (label !== undefined) requestData.label = label;
    if (storeId !== undefined) requestData.storeId = storeId;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: '/api-keys',
      data: requestData
    });
    return ApiKeyCreationSchema.parse(data);
  }

  // Miscellaneous Endpoints

  async getPermissions(): Promise<Permission[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: '/permissions'
    });
    return data.map(item => PermissionSchema.parse(item));
  }

  // Legacy method - use deleteUserByIdOrEmail instead
  async deleteUser(userId: string): Promise<void> {
    return await this.deleteUserByIdOrEmail(userId);
  }

  // Store Email Settings
  async getStoreEmailSettings(storeId: string): Promise<StoreEmailSettings> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/email`
    });
    return StoreEmailSettingsSchema.parse(data);
  }

  async updateStoreEmailSettings(storeId: string, settings: Partial<StoreEmailSettings>): Promise<StoreEmailSettings> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/email`,
      data: settings
    });
    return StoreEmailSettingsSchema.parse(data);
  }

  async sendStoreEmail(storeId: string, emailData: SendEmailRequest): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/email/send`,
      data: emailData
    });
  }

  // Store Payment Methods (Individual)
  async getStorePaymentMethod(storeId: string, paymentMethodId: string, includeConfig?: boolean): Promise<PaymentMethod> {
    const params = new URLSearchParams();
    if (includeConfig !== undefined) params.append('includeConfig', includeConfig.toString());
    
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}?${params.toString()}`
    });
    return PaymentMethodSchema.parse(data);
  }

  async updateStorePaymentMethod(storeId: string, paymentMethodId: string, updates: { enabled?: boolean; config?: any }): Promise<PaymentMethod> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}`,
      data: updates
    });
    return PaymentMethodSchema.parse(data);
  }

  async deleteStorePaymentMethod(storeId: string, paymentMethodId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}`
    });
  }

  // Store Users
  async getStoreUsers(storeId: string): Promise<StoreUserDetails[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/users`
    });
    return data.map(item => StoreUserDetailsSchema.parse(item));
  }

  async addStoreUser(storeId: string, userData: StoreUserDetails): Promise<StoreUserDetails> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/users`,
      data: userData
    });
    return StoreUserDetailsSchema.parse(data);
  }

  async updateStoreUser(storeId: string, idOrEmail: string, userData: Partial<StoreUserDetails>): Promise<StoreUserDetails> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/users/${idOrEmail}`,
      data: userData
    });
    return StoreUserDetailsSchema.parse(data);
  }

  async removeStoreUser(storeId: string, idOrEmail: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/users/${idOrEmail}`
    });
  }

  // Store Payouts
  async createStorePayout(storeId: string, destination: string, amount: string, payoutMethodId: string, pullPaymentId?: string, approved?: boolean, metadata?: any): Promise<Payout> {
    const payoutData: any = {
      destination,
      amount,
      payoutMethodId
    };
    if (pullPaymentId !== undefined) payoutData.pullPaymentId = pullPaymentId;
    if (approved !== undefined) payoutData.approved = approved;
    if (metadata !== undefined) payoutData.metadata = metadata;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payouts`,
      data: payoutData
    });
    return PayoutSchema.parse(data);
  }

  async getStorePayouts(storeId: string, includeCancelled?: boolean): Promise<Payout[]> {
    const params = new URLSearchParams();
    if (includeCancelled !== undefined) params.append('includeCancelled', includeCancelled.toString());
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payouts?${params.toString()}`
    });
    return data.map(item => PayoutSchema.parse(item));
  }

  async getStorePayout(storeId: string, payoutId: string): Promise<Payout> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payouts/${payoutId}`
    });
    return PayoutSchema.parse(data);
  }

  async approveStorePayout(storeId: string, payoutId: string, revision: number, rateRule?: string): Promise<Payout> {
    const approvalData: any = { revision };
    if (rateRule !== undefined) approvalData.rateRule = rateRule;

    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payouts/${payoutId}`,
      data: approvalData
    });
    return PayoutSchema.parse(data);
  }

  async cancelStorePayout(storeId: string, payoutId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payouts/${payoutId}`
    });
  }

  async markStorePayoutPaid(storeId: string, payoutId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/payouts/${payoutId}/mark-paid`
    });
  }

  async markStorePayout(storeId: string, payoutId: string, state: string, paymentProof?: any): Promise<void> {
    const markData: any = { state };
    if (paymentProof !== undefined) markData.paymentProof = paymentProof;

    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/payouts/${payoutId}/mark`,
      data: markData
    });
  }

  // Store Payout Processors
  async getStorePayoutProcessors(storeId: string): Promise<StorePayoutProcessor[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payout-processors`
    });
    return data.map(item => StorePayoutProcessorSchema.parse(item));
  }

  async removeStorePayoutProcessor(storeId: string, processor: string, paymentMethodId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payout-processors/${processor}/${paymentMethodId}`
    });
  }

  async getStoreOnChainPayoutProcessors(storeId: string, paymentMethodId: string): Promise<OnChainPayoutProcessor[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payout-processors/OnChainAutomatedPayoutSenderFactory/${paymentMethodId}`
    });
    return data.map(item => OnChainPayoutProcessorSchema.parse(item));
  }

  async updateStoreOnChainPayoutProcessors(storeId: string, paymentMethodId: string, feeTargetBlock?: number, intervalSeconds?: number, threshold?: string, processNewPayoutsInstantly?: boolean): Promise<OnChainPayoutProcessor> {
    const processorData: any = {};
    if (feeTargetBlock !== undefined) processorData.feeTargetBlock = feeTargetBlock;
    if (intervalSeconds !== undefined) processorData.intervalSeconds = intervalSeconds;
    if (threshold !== undefined) processorData.threshold = threshold;
    if (processNewPayoutsInstantly !== undefined) processorData.processNewPayoutsInstantly = processNewPayoutsInstantly;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/payout-processors/OnChainAutomatedPayoutSenderFactory/${paymentMethodId}`,
      data: processorData
    });
    return OnChainPayoutProcessorSchema.parse(data);
  }

  async getStoreLightningPayoutProcessors(storeId: string, payoutMethodId: string): Promise<LightningPayoutProcessor[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payout-processors/LightningAutomatedPayoutSenderFactory/${payoutMethodId}`
    });
    return data.map(item => LightningPayoutProcessorSchema.parse(item));
  }

  async updateStoreLightningPayoutProcessors(storeId: string, payoutMethodId: string, intervalSeconds: number, cancelPayoutAfterFailures?: number, processNewPayoutsInstantly?: boolean): Promise<LightningPayoutProcessor> {
    const processorData: any = { intervalSeconds };
    if (cancelPayoutAfterFailures !== undefined) processorData.cancelPayoutAfterFailures = cancelPayoutAfterFailures;
    if (processNewPayoutsInstantly !== undefined) processorData.processNewPayoutsInstantly = processNewPayoutsInstantly;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/payout-processors/LightningAutomatedPayoutSenderFactory/${payoutMethodId}`,
      data: processorData
    });
    return LightningPayoutProcessorSchema.parse(data);
  }

  async getStoreOnChainTransferProcessors(storeId: string): Promise<OnChainPayoutProcessor[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payout-processors/OnChainAutomatedTransferSenderFactory`
    });
    return data.map(item => OnChainPayoutProcessorSchema.parse(item));
  }

  async updateStoreOnChainTransferProcessors(storeId: string, feeTargetBlock?: number, intervalSeconds?: number, threshold?: string, processNewPayoutsInstantly?: boolean): Promise<OnChainPayoutProcessor> {
    const processorData: any = {};
    if (feeTargetBlock !== undefined) processorData.feeTargetBlock = feeTargetBlock;
    if (intervalSeconds !== undefined) processorData.intervalSeconds = intervalSeconds;
    if (threshold !== undefined) processorData.threshold = threshold;
    if (processNewPayoutsInstantly !== undefined) processorData.processNewPayoutsInstantly = processNewPayoutsInstantly;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/payout-processors/OnChainAutomatedTransferSenderFactory`,
      data: processorData
    });
    return OnChainPayoutProcessorSchema.parse(data);
  }

  async getStoreLightningTransferProcessors(storeId: string): Promise<LightningPayoutProcessor[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payout-processors/LightningAutomatedPayoutSenderFactory`
    });
    return data.map(item => LightningPayoutProcessorSchema.parse(item));
  }

  // Store Rates
  async getStoreRateConfiguration(storeId: string, rateSource: string): Promise<RateConfiguration> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/rates/configuration/${rateSource}`
    });
    return RateConfigurationSchema.parse(data);
  }

  async updateStoreRateConfiguration(storeId: string, rateSource: string, spread?: string, preferredSource?: string, isCustomScript?: boolean, effectiveScript?: string): Promise<RateConfiguration> {
    const configData: any = {};
    if (spread !== undefined) configData.spread = spread;
    if (preferredSource !== undefined) configData.preferredSource = preferredSource;
    if (isCustomScript !== undefined) configData.isCustomScript = isCustomScript;
    if (effectiveScript !== undefined) configData.effectiveScript = effectiveScript;

    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/stores/${storeId}/rates/configuration/${rateSource}`,
      data: configData
    });
    return RateConfigurationSchema.parse(data);
  }

  async previewStoreRateConfiguration(storeId: string, currencyPair?: string[], spread?: string, preferredSource?: string, isCustomScript?: boolean, effectiveScript?: string): Promise<StoreRate[]> {
    const params = new URLSearchParams();
    if (currencyPair) {
      currencyPair.forEach(pair => params.append('currencyPair', pair));
    }

    const configData: any = {};
    if (spread !== undefined) configData.spread = spread;
    if (preferredSource !== undefined) configData.preferredSource = preferredSource;
    if (isCustomScript !== undefined) configData.isCustomScript = isCustomScript;
    if (effectiveScript !== undefined) configData.effectiveScript = effectiveScript;

    const data = await this.makeRequest<any[]>({
      method: 'POST',
      url: `/stores/${storeId}/rates/preview?${params.toString()}`,
      data: configData
    });
    return data.map(item => StoreRateSchema.parse(item));
  }

  // Store Logo Management
  async uploadStoreLogo(storeId: string, file: any): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/logo`,
      data: { file }
    });
    return data;
  }

  async deleteStoreLogo(storeId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/logo`
    });
  }

  async getStoreRoles(storeId: string): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/roles`
    });
    return data;
  }

  // Store Wallet Methods
  async getStoreWalletOverview(storeId: string, paymentMethodId: string): Promise<StoreWalletOverview> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet`
    });
    return StoreWalletOverviewSchema.parse(data);
  }

  async getStoreWalletHistogram(storeId: string, paymentMethodId: string): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/histogram`
    });
    return data;
  }

  async getStoreWalletFeeRate(storeId: string, paymentMethodId: string, blockTarget?: number): Promise<StoreWalletFeeRate> {
    const params = new URLSearchParams();
    if (blockTarget !== undefined) params.append('blockTarget', blockTarget.toString());
    
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/feerate?${params.toString()}`
    });
    return StoreWalletFeeRateSchema.parse(data);
  }

  async getStoreWalletAddress(storeId: string, paymentMethodId: string, forceGenerate?: boolean): Promise<StoreWalletAddress> {
    const params = new URLSearchParams();
    if (forceGenerate !== undefined) params.append('forceGenerate', forceGenerate.toString());
    
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/address?${params.toString()}`
    });
    return StoreWalletAddressSchema.parse(data);
  }

  async unreserveStoreWalletAddress(storeId: string, paymentMethodId: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/address`
    });
  }

  async getStoreWalletTransactions(storeId: string, paymentMethodId: string, labelFilter?: string, limit?: number, skip?: number, statusFilter?: string[]): Promise<StoreWalletTransaction[]> {
    const params = new URLSearchParams();
    if (labelFilter !== undefined) params.append('labelFilter', labelFilter);
    if (limit !== undefined) params.append('limit', limit.toString());
    if (skip !== undefined) params.append('skip', skip.toString());
    if (statusFilter) {
      statusFilter.forEach(status => params.append('statusFilter', status));
    }
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/transactions?${params.toString()}`
    });
    return data.map(item => StoreWalletTransactionSchema.parse(item));
  }

  async createStoreWalletTransaction(storeId: string, paymentMethodId: string, transactionData: any): Promise<StoreWalletTransaction> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/transactions`,
      data: transactionData
    });
    return StoreWalletTransactionSchema.parse(data);
  }

  async getStoreWalletTransaction(storeId: string, paymentMethodId: string, transactionId: string): Promise<StoreWalletTransaction> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/transactions/${transactionId}`
    });
    return StoreWalletTransactionSchema.parse(data);
  }

  async updateStoreWalletTransaction(storeId: string, paymentMethodId: string, transactionId: string, updateData: { comment?: string; labels?: string[] }, force?: boolean): Promise<StoreWalletTransaction> {
    const params = new URLSearchParams();
    if (force !== undefined) params.append('force', force.toString());
    
    const data = await this.makeRequest<any>({
      method: 'PATCH',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/transactions/${transactionId}?${params.toString()}`,
      data: updateData
    });
    return StoreWalletTransactionSchema.parse(data);
  }

  async getStoreWalletUTXOs(storeId: string, paymentMethodId: string): Promise<StoreWalletUTXO[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/utxos`
    });
    return data.map(item => StoreWalletUTXOSchema.parse(item));
  }

  async generateStoreWallet(storeId: string, paymentMethodId: string, walletData: any): Promise<any> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/payment-methods/${paymentMethodId}/wallet/generate`,
      data: walletData
    });
    return data;
  }

  // Store Lightning Methods
  async getStoreLightningInfo(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningInfo> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/info`
    });
    return LightningInfoSchema.parse(data);
  }

  async getStoreLightningBalance(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningBalance> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/balance`
    });
    return LightningBalanceSchema.parse(data);
  }

  async getStoreLightningHistogram(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningHistogram> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/histogram`
    });
    return LightningHistogramSchema.parse(data);
  }

  async connectToStoreLightningNode(storeId: string, cryptoCode: string, connectData: LightningConnectRequest): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/connect`,
      data: connectData
    });
  }

  async getStoreLightningChannels(storeId: string, cryptoCode: string = 'BTC'): Promise<LightningChannel[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/channels`
    });
    return data.map(item => LightningChannelSchema.parse(item));
  }

  async openStoreLightningChannel(storeId: string, cryptoCode: string, channelData: LightningChannelRequest): Promise<void> {
    await this.makeRequest<void>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/channels`,
      data: channelData
    });
  }

  async getStoreLightningDeposit(storeId: string, cryptoCode: string = 'BTC'): Promise<string> {
    const data = await this.makeRequest<string>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/address`
    });
    return data;
  }

  async getStoreLightningPayment(storeId: string, cryptoCode: string, paymentHash: string): Promise<LightningPayment> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/payments/${paymentHash}`
    });
    return LightningPaymentSchema.parse(data);
  }

  async getStoreLightningInvoice(storeId: string, cryptoCode: string, invoiceId: string): Promise<LightningInvoice> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices/${invoiceId}`
    });
    return LightningInvoiceSchema.parse(data);
  }

  async payStoreLightningInvoice(storeId: string, cryptoCode: string, paymentData: LightningPayInvoiceRequest): Promise<LightningPayment> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices/pay`,
      data: paymentData
    });
    return LightningPaymentSchema.parse(data);
  }

  async getStoreLightningInvoices(storeId: string, cryptoCode: string = 'BTC', pendingOnly?: boolean, offsetIndex?: number): Promise<LightningInvoice[]> {
    const params = new URLSearchParams();
    if (pendingOnly !== undefined) params.append('pendingOnly', pendingOnly.toString());
    if (offsetIndex !== undefined) params.append('offsetIndex', offsetIndex.toString());
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices?${params.toString()}`
    });
    return data.map(item => LightningInvoiceSchema.parse(item));
  }

  async createStoreLightningInvoice(storeId: string, cryptoCode: string, invoiceData: LightningCreateInvoiceRequest): Promise<LightningInvoice> {
    const data = await this.makeRequest<any>({
      method: 'POST',
      url: `/stores/${storeId}/lightning/${cryptoCode}/invoices`,
      data: invoiceData
    });
    return LightningInvoiceSchema.parse(data);
  }

  async getStoreLightningPayments(storeId: string, cryptoCode: string = 'BTC', includePending?: boolean, offsetIndex?: number): Promise<LightningPayment[]> {
    const params = new URLSearchParams();
    if (includePending !== undefined) params.append('includePending', includePending.toString());
    if (offsetIndex !== undefined) params.append('offsetIndex', offsetIndex.toString());
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/stores/${storeId}/lightning/${cryptoCode}/payments?${params.toString()}`
    });
    return data.map(item => LightningPaymentSchema.parse(item));
  }

  // ===== NOTIFICATIONS (CURRENT USER) =====
  
  async getNotifications(storeIds?: string[], take?: number, skip?: number, seen?: string): Promise<Notification[]> {
    const params = new URLSearchParams();
    
    if (storeIds && storeIds.length > 0) {
      storeIds.forEach(storeId => params.append('storeId', storeId));
    }
    if (take !== undefined) params.append('take', take.toString());
    if (skip !== undefined) params.append('skip', skip.toString());
    if (seen !== undefined) params.append('seen', seen);
    
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/users/me/notifications?${params.toString()}`
    });
    return data.map(item => NotificationSchema.parse(item));
  }

  async getNotification(id: string): Promise<Notification> {
    const data = await this.makeRequest<any>({
      method: 'GET',
      url: `/users/me/notifications/${id}`
    });
    return NotificationSchema.parse(data);
  }

  async updateNotification(id: string, updates: UpdateNotificationRequest): Promise<Notification> {
    const data = await this.makeRequest<any>({
      method: 'PUT',
      url: `/users/me/notifications/${id}`,
      data: updates
    });
    return NotificationSchema.parse(data);
  }

  async deleteNotification(id: string): Promise<void> {
    await this.makeRequest<void>({
      method: 'DELETE',
      url: `/users/me/notifications/${id}`
    });
  }

  async getNotificationSettings(): Promise<NotificationSetting[]> {
    const data = await this.makeRequest<any[]>({
      method: 'GET',
      url: `/users/me/notification-settings`
    });
    return data.map(item => NotificationSettingSchema.parse(item));
  }

  async updateNotificationSettings(settings: UpdateNotificationSettingsRequest): Promise<NotificationSetting[]> {
    const data = await this.makeRequest<any[]>({
      method: 'PUT',
      url: `/users/me/notification-settings`,
      data: settings
    });
    return data.map(item => NotificationSettingSchema.parse(item));
  }
}


