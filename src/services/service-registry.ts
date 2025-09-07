import { BTCPayServerClient } from '../utils/btcpay-client.js';
import { BaseService } from './base-service.js';
import { PaymentRequestsService } from './payment-requests.js';
import { InvoicesService } from './invoices.js';
import { LightningInternalService } from './lightning-internal.js';
import { LightningStoreService } from './lightning-store.js';
import { LightningAddressService } from './lightning-address.js';
import { StoresService } from './stores.js';
import { StoresEmailService } from './stores-email.js';
import { StoresPaymentMethodsService } from './stores-payment-methods.js';
import { StoresUsersService } from './stores-users.js';
import { StoresWalletService } from './stores-wallet.js';
import { StoresPayoutsService } from './stores-payouts.js';
import { StoresPayoutProcessorsService } from './stores-payout-processors.js';
import { StoresRatesService } from './stores-rates.js';
import { UsersService } from './users.js';
import { WebhooksService } from './webhooks.js';
import { PullPaymentsService } from './pull-payments.js';
import { AppsService } from './apps.js';
import { ApiKeysService } from './api-keys.js';
import { ServerInfoService } from './server-info.js';
import { AuthorizationService } from './authorization.js';
import { NotificationsService } from './notifications.js';

export class ServiceRegistry {
  private services: Map<string, BaseService> = new Map();

  constructor(client: BTCPayServerClient) {
    // Register core BTCPayServer services - Essential functionality only!
    this.services.set('payment-requests', new PaymentRequestsService(client));
    this.services.set('invoices', new InvoicesService(client));
    
    // Lightning services - modular organization
    this.services.set('lightning-internal', new LightningInternalService(client));
    this.services.set('lightning-store', new LightningStoreService(client));
    this.services.set('lightning-address', new LightningAddressService(client));
    
    // Store services - modular organization
    this.services.set('stores', new StoresService(client));
    this.services.set('stores-email', new StoresEmailService(client));
    this.services.set('stores-payment-methods', new StoresPaymentMethodsService(client));
    this.services.set('stores-users', new StoresUsersService(client));
    this.services.set('stores-wallet', new StoresWalletService(client));
    this.services.set('stores-payouts', new StoresPayoutsService(client));
    this.services.set('stores-payout-processors', new StoresPayoutProcessorsService(client));
    this.services.set('stores-rates', new StoresRatesService(client));
    
    // Other core services
    this.services.set('users', new UsersService(client));
    this.services.set('webhooks', new WebhooksService(client));
    this.services.set('pull-payments', new PullPaymentsService(client));
    this.services.set('apps', new AppsService(client));
    this.services.set('api-keys', new ApiKeysService(client));
    this.services.set('server-info', new ServerInfoService(client));
    this.services.set('authorization', new AuthorizationService(client));
    this.services.set('notifications', new NotificationsService(client));
  }

  getService(serviceName: string): BaseService | undefined {
    return this.services.get(serviceName);
  }

  getAllServices(): BaseService[] {
    return Array.from(this.services.values());
  }

  getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }

  getServicesByCategory(category: string): BaseService[] {
    return this.getAllServices().filter(service => 
      service.getServiceInfo().category === category
    );
  }

  getAllServiceInfo() {
    return this.getAllServices().map(service => service.getServiceInfo());
  }
}
