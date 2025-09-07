import { BaseService, ServiceInfo } from './base-service.js';

export class StoresPaymentMethodsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-payment-methods',
      description: 'Store payment methods operations - manage payment method configurations',
      category: 'store-management',
      methods: [
        {
          name: 'getPaymentMethods',
          description: 'Get store payment methods',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            onlyEnabled: {
              type: 'boolean',
              description: 'Fetch payment methods that are enabled/disabled only',
              required: false
            },
            includeConfig: {
              type: 'boolean',
              description: 'Fetch the config of the payment methods',
              required: false
            }
          },
          examples: [
            {
              name: 'Get all payment methods',
              description: 'Get all payment methods for a store',
              parameters: {
                storeId: 'store123'
              }
            },
            {
              name: 'Get enabled payment methods with config',
              description: 'Get only enabled payment methods with configuration',
              parameters: {
                storeId: 'store123',
                onlyEnabled: true,
                includeConfig: true
              }
            }
          ]
        },
        {
          name: 'getPaymentMethod',
          description: 'Get specific store payment method',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentMethodId: {
              type: 'string',
              description: 'Payment method ID (e.g., BTC-CHAIN)',
              required: true
            },
            includeConfig: {
              type: 'boolean',
              description: 'Fetch the config of the payment method',
              required: false
            }
          },
          examples: [
            {
              name: 'Get Bitcoin payment method',
              description: 'Get Bitcoin on-chain payment method configuration',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                includeConfig: true
              }
            }
          ]
        },
        {
          name: 'updatePaymentMethod',
          description: 'Update store payment method',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentMethodId: {
              type: 'string',
              description: 'Payment method ID (e.g., BTC-CHAIN)',
              required: true
            },
            enabled: {
              type: 'boolean',
              description: 'Whether the payment method is enabled',
              required: false
            },
            config: {
              type: 'object',
              description: 'Payment method configuration object',
              required: false
            }
          },
          examples: [
            {
              name: 'Enable Bitcoin with config',
              description: 'Enable Bitcoin payment method with configuration',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                enabled: true,
                config: {
                  useBech32Scheme: true,
                  lud12Enabled: true
                }
              }
            }
          ]
        },
        {
          name: 'deletePaymentMethod',
          description: 'Delete store payment method',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentMethodId: {
              type: 'string',
              description: 'Payment method ID (e.g., BTC-CHAIN)',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete Bitcoin payment method',
              description: 'Remove Bitcoin payment method from store',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getPaymentMethods':
        return await this.client.getStorePaymentMethods(
          parameters.storeId,
          parameters.onlyEnabled
        );

      case 'getPaymentMethod':
        return await this.client.getStorePaymentMethod(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.includeConfig
        );

      case 'updatePaymentMethod':
        return await this.client.updateStorePaymentMethod(
          parameters.storeId,
          parameters.paymentMethodId,
          {
            enabled: parameters.enabled,
            config: parameters.config
          }
        );

      case 'deletePaymentMethod':
        return await this.client.deleteStorePaymentMethod(
          parameters.storeId,
          parameters.paymentMethodId
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
