import { BaseService, ServiceInfo } from './base-service.js';

export class StoresService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores',
      description: 'Manage BTCPayServer stores - create, retrieve, update, delete stores and manage payment methods and rates',
      category: 'store-management',
      methods: [
        {
          name: 'create',
          description: 'Create a new BTCPayServer store with comprehensive settings',
          parameters: {
            name: {
              type: 'string',
              description: 'The name of the store',
              required: true
            },
            website: {
              type: 'string',
              description: 'The absolute url of the store',
              required: false
            },
            supportUrl: {
              type: 'string',
              description: 'The support URI of the store, can contain placeholders {OrderId} and {InvoiceId}',
              required: false
            },
            logoUrl: {
              type: 'string',
              description: 'Absolute URL to a logo file or fileid:ID reference',
              required: false
            },
            cssUrl: {
              type: 'string',
              description: 'Absolute URL to CSS file or fileid:ID reference',
              required: false
            },
            paymentSoundUrl: {
              type: 'string',
              description: 'Absolute URL to a sound file or fileid:ID reference',
              required: false
            },
            brandColor: {
              type: 'string',
              description: 'The brand color of the store in HEX format',
              required: false
            },
            applyBrandColorToBackend: {
              type: 'boolean',
              description: 'Apply the brand color to the store\'s backend as well',
              required: false,
              default: false
            },
            defaultCurrency: {
              type: 'string',
              description: 'The default currency of the store',
              required: false,
              default: 'USD'
            },
            additionalTrackedRates: {
              type: 'array',
              description: 'Additional rates to track (e.g., ["EUR", "JPY"])',
              required: false
            },
            invoiceExpiration: {
              type: 'number',
              description: 'Invoice expiration time in seconds (60-2073600)',
              required: false,
              default: 900
            },
            refundBOLT11Expiration: {
              type: 'number',
              description: 'Minimum expiry of BOLT11 invoices for refunds in days (0-3650)',
              required: false,
              default: 30
            },
            displayExpirationTimer: {
              type: 'number',
              description: 'Time left to trigger countdown timer in seconds (60-2073600)',
              required: false,
              default: 300
            },
            monitoringExpiration: {
              type: 'number',
              description: 'Monitoring expiration time in seconds (600-2073600)',
              required: false,
              default: 86400
            },
            speedPolicy: {
              type: 'string',
              description: 'Speed policy (HighSpeed, MediumSpeed, LowMediumSpeed, LowSpeed)',
              required: false,
              default: 'MediumSpeed'
            },
            lightningDescriptionTemplate: {
              type: 'string',
              description: 'BOLT11 description template with placeholders {StoreName}, {ItemDescription}, {OrderId}',
              required: false
            },
            paymentTolerance: {
              type: 'number',
              description: 'Payment tolerance percentage (0-100)',
              required: false,
              default: 0
            },
            archived: {
              type: 'boolean',
              description: 'If true, store does not appear in stores list by default',
              required: false,
              default: false
            },
            anyoneCanCreateInvoice: {
              type: 'boolean',
              description: 'If true, no authentication needed to create invoices',
              required: false,
              default: false
            },
            lightningAmountInSatoshi: {
              type: 'boolean',
              description: 'Show lightning amounts in satoshi',
              required: false,
              default: false
            },
            lightningPrivateRouteHints: {
              type: 'boolean',
              description: 'Include private route hints in lightning payments',
              required: false,
              default: false
            },
            onChainWithLnInvoiceFallback: {
              type: 'boolean',
              description: 'Unify on-chain and lightning payment URLs',
              required: false,
              default: false
            },
            redirectAutomatically: {
              type: 'boolean',
              description: 'Auto-redirect after successful payment',
              required: false,
              default: false
            },
            showRecommendedFee: {
              type: 'boolean',
              description: 'Show recommended fee in checkout',
              required: false,
              default: true
            },
            recommendedFeeBlockTarget: {
              type: 'number',
              description: 'Fee rate recommendation for confirmation target blocks',
              required: false,
              default: 1
            },
            defaultLang: {
              type: 'string',
              description: 'Default language for checkout page',
              required: false,
              default: 'en'
            },
            htmlTitle: {
              type: 'string',
              description: 'HTML title of the checkout page',
              required: false
            },
            networkFeeMode: {
              type: 'string',
              description: 'Network fee mode (Always, MultiplePaymentsOnly, Never)',
              required: false,
              default: 'Always'
            },
            payJoinEnabled: {
              type: 'boolean',
              description: 'Enable payjoin in checkout if possible',
              required: false,
              default: false
            },
            autoDetectLanguage: {
              type: 'boolean',
              description: 'Adapt checkout language to browser settings',
              required: false,
              default: false
            },
            showPayInWalletButton: {
              type: 'boolean',
              description: 'Show "Pay in wallet" button (Checkout V2)',
              required: false,
              default: true
            },
            showStoreHeader: {
              type: 'boolean',
              description: 'Show store header on checkout page (Checkout V2)',
              required: false,
              default: true
            },
            celebratePayment: {
              type: 'boolean',
              description: 'Celebrate payments with confetti (Checkout V2)',
              required: false,
              default: true
            },
            playSoundOnPayment: {
              type: 'boolean',
              description: 'Enable sounds on checkout page (Checkout V2)',
              required: false,
              default: false
            },
            lazyPaymentMethods: {
              type: 'boolean',
              description: 'Enable payment methods individually upon user interaction',
              required: false,
              default: false
            },
            defaultPaymentMethod: {
              type: 'string',
              description: 'Default payment method (e.g., BTC-CHAIN, BTC-LN)',
              required: false
            },
            receipt: {
              type: 'object',
              description: 'Additional settings to customize the public receipt',
              required: false
            },
            paymentMethodCriteria: {
              type: 'object',
              description: 'Criteria required to activate specific payment methods',
              required: false
            }
          },
          examples: [
            {
              name: 'Basic store',
              description: 'Create a basic store with minimal settings',
              parameters: {
                name: 'My Bitcoin Store',
                website: 'https://mystore.com',
                defaultCurrency: 'USD'
              }
            },
            {
              name: 'Advanced store',
              description: 'Create a store with custom settings',
              parameters: {
                name: 'Lightning Fast Store',
                website: 'https://lightningstore.com',
                defaultCurrency: 'EUR',
                invoiceExpiration: 30,
                speedPolicy: 'HighSpeed',
                paymentTolerance: 2.5
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get details of a specific store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to retrieve',
              required: true
            }
          },
          examples: [
            {
              name: 'Get store details',
              description: 'Retrieve information about a specific store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'list',
          description: 'List all stores accessible to the current user',
          parameters: {},
          examples: [
            {
              name: 'List all stores',
              description: 'Get all stores you have access to',
              parameters: {}
            }
          ]
        },
        {
          name: 'update',
          description: 'Update an existing store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to update',
              required: true
            },
            name: {
              type: 'string',
              description: 'Store name',
              required: false
            },
            website: {
              type: 'string',
              description: 'Store website URL',
              required: false
            },
            defaultCurrency: {
              type: 'string',
              description: 'Default currency for the store',
              required: false
            },
            invoiceExpiration: {
              type: 'number',
              description: 'Invoice expiration time in minutes',
              required: false
            },
            speedPolicy: {
              type: 'string',
              description: 'Speed policy (HighSpeed, MediumSpeed, LowMediumSpeed, LowSpeed)',
              required: false
            }
          },
          examples: [
            {
              name: 'Update store name',
              description: 'Change the store name and website',
              parameters: {
                storeId: 'store123',
                name: 'Updated Store Name',
                website: 'https://newdomain.com'
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete store',
              description: 'Permanently delete a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'getPaymentMethods',
          description: 'Get payment methods configured for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            enabled: {
              type: 'boolean',
              description: 'Filter by enabled status',
              required: false
            }
          },
          examples: [
            {
              name: 'Get all payment methods',
              description: 'List all payment methods for a store',
              parameters: {
                storeId: 'store123'
              }
            },
            {
              name: 'Get enabled payment methods',
              description: 'List only enabled payment methods',
              parameters: {
                storeId: 'store123',
                enabled: true
              }
            }
          ]
        },
        {
          name: 'updatePaymentMethod',
          description: 'Update a payment method for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'Cryptocurrency code (e.g., BTC, LTC)',
              required: true
            },
            enabled: {
              type: 'boolean',
              description: 'Whether the payment method is enabled',
              required: false
            },
            derivationScheme: {
              type: 'string',
              description: 'Derivation scheme for the payment method',
              required: false
            },
            label: {
              type: 'string',
              description: 'Label for the payment method',
              required: false
            }
          },
          examples: [
            {
              name: 'Enable Bitcoin payments',
              description: 'Enable Bitcoin payment method with derivation scheme',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                enabled: true,
                derivationScheme: 'xpub661...',
                label: 'Main Bitcoin Wallet'
              }
            }
          ]
        },
        {
          name: 'getRates',
          description: 'Get exchange rates for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            currencyPairs: {
              type: 'array',
              description: 'Array of currency pairs (e.g., ["BTC_USD", "BTC_EUR"])',
              required: false
            }
          },
          examples: [
            {
              name: 'Get BTC rates',
              description: 'Get Bitcoin exchange rates',
              parameters: {
                storeId: 'store123',
                currencyPairs: ['BTC_USD', 'BTC_EUR']
              }
            }
          ]
        },
        {
          name: 'previewRates',
          description: 'Preview exchange rates with custom configuration',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            currencyPairs: {
              type: 'array',
              description: 'Array of currency pairs to preview',
              required: true
            },
            script: {
              type: 'string',
              description: 'Rate script to preview',
              required: false
            }
          },
          examples: [
            {
              name: 'Preview custom rates',
              description: 'Preview rates with custom script',
              parameters: {
                storeId: 'store123',
                currencyPairs: ['BTC_USD'],
                script: 'coinbase(X_Y) * 1.02'
              }
            }
          ]
        },
        {
          name: 'getRateConfiguration',
          description: 'Get rate configuration for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get rate config',
              description: 'Get current rate configuration',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'updateRateConfiguration',
          description: 'Update rate configuration for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            script: {
              type: 'string',
              description: 'Rate script',
              required: false
            },
            effectiveScript: {
              type: 'string',
              description: 'Effective rate script',
              required: false
            },
            spread: {
              type: 'number',
              description: 'Spread percentage',
              required: false
            }
          },
          examples: [
            {
              name: 'Update rate script',
              description: 'Set custom rate calculation script',
              parameters: {
                storeId: 'store123',
                script: 'coinbase(X_Y) * 1.05',
                spread: 2.0
              }
            }
          ]
        },
        {
          name: 'uploadLogo',
          description: 'Upload a logo for the store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            file: {
              type: 'string',
              description: 'Logo file data (binary)',
              required: true
            }
          },
          examples: [
            {
              name: 'Upload store logo',
              description: 'Upload a logo image for the store',
              parameters: {
                storeId: 'store123',
                file: 'binary_file_data'
              }
            }
          ]
        },
        {
          name: 'deleteLogo',
          description: 'Delete the store logo',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete store logo',
              description: 'Remove the store\'s logo',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'getRoles',
          description: 'Get store roles',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get store roles',
              description: 'Get information about the store\'s available roles',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'create': {
        return await this.client.createStore(
          parameters.name,
          parameters.defaultCurrency || 'USD',
          parameters.website
        );
      }

      case 'get':
        return await this.client.getStore(parameters.storeId);

      case 'list':
        const stores = await this.client.listStores();
        return stores;

      case 'update':
        return await this.client.updateStore(parameters.storeId, parameters);

      case 'delete':
        return await this.client.deleteStore(parameters.storeId);

      case 'getPaymentMethods':
        return await this.client.getStorePaymentMethods(parameters.storeId, parameters.enabled);

      case 'updatePaymentMethod':
        return await this.client.updateStorePaymentMethod(
          parameters.storeId,
          parameters.cryptoCode,
          {
            enabled: parameters.enabled,
            config: {
              derivationScheme: parameters.derivationScheme,
              label: parameters.label
            }
          }
        );

      case 'getRates':
        return await this.client.getStoreRates(parameters.storeId, parameters.currencyPairs);

      case 'previewRates':
        return await this.client.previewStoreRates(
          parameters.storeId,
          parameters.currencyPairs,
          parameters.script
        );

      case 'getRateConfiguration':
        return await this.client.getRateConfiguration(parameters.storeId);

      case 'updateRateConfiguration':
        return await this.client.updateRateConfiguration(parameters.storeId, parameters.script);

      case 'uploadLogo':
        return await this.client.uploadStoreLogo(parameters.storeId, parameters.file);

      case 'deleteLogo':
        return await this.client.deleteStoreLogo(parameters.storeId);

      case 'getRoles':
        return await this.client.getStoreRoles(parameters.storeId);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
