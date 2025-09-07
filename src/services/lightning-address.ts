import { BaseService, ServiceInfo } from './base-service.js';

export class LightningAddressService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'lightning-address',
      description: 'Lightning Address configuration - manage Lightning addresses for stores',
      category: 'lightning',
      methods: [
        {
          name: 'getLightningAddresses',
          description: 'Get store configured Lightning addresses',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'List Lightning addresses',
              description: 'Get all Lightning addresses configured for the store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'getLightningAddress',
          description: 'Get specific Lightning address configuration',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            username: {
              type: 'string',
              description: 'Lightning address username',
              required: true
            }
          },
          examples: [
            {
              name: 'Get Lightning address',
              description: 'Get configuration for a specific Lightning address',
              parameters: {
                storeId: 'store123',
                username: 'satoshi'
              }
            }
          ]
        },
        {
          name: 'addOrUpdateLightningAddress',
          description: 'Add or update Lightning address configuration',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            username: {
              type: 'string',
              description: 'Lightning address username',
              required: true
            },
            currencyCode: {
              type: 'string',
              description: 'Currency to generate invoices in (leave null for store default)',
              required: false
            },
            min: {
              type: 'string',
              description: 'Minimum amount in sats this address allows',
              required: false
            },
            max: {
              type: 'string',
              description: 'Maximum amount in sats this address allows',
              required: false
            },
            invoiceMetadata: {
              type: 'object',
              description: 'Invoice metadata as JSON',
              required: false
            }
          },
          examples: [
            {
              name: 'Create Lightning address',
              description: 'Create a new Lightning address for the store',
              parameters: {
                storeId: 'store123',
                username: 'satoshi',
                currencyCode: 'USD',
                min: '1000',
                max: '100000000',
                invoiceMetadata: {
                  purpose: 'donations'
                }
              }
            },
            {
              name: 'Update Lightning address',
              description: 'Update existing Lightning address configuration',
              parameters: {
                storeId: 'store123',
                username: 'satoshi',
                max: '500000000'
              }
            }
          ]
        },
        {
          name: 'removeLightningAddress',
          description: 'Remove Lightning address configuration',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            username: {
              type: 'string',
              description: 'Lightning address username to remove',
              required: true
            }
          },
          examples: [
            {
              name: 'Remove Lightning address',
              description: 'Remove a Lightning address from the store',
              parameters: {
                storeId: 'store123',
                username: 'satoshi'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getLightningAddresses':
        return await this.client.getLightningAddresses(parameters.storeId);

      case 'getLightningAddress':
        return await this.client.getLightningAddress(parameters.storeId, parameters.username);

      case 'addOrUpdateLightningAddress':
        return await this.client.createOrUpdateLightningAddress(
          parameters.storeId,
          parameters.username,
          parameters.currencyCode,
          parameters.min,
          parameters.max,
          parameters.invoiceMetadata
        );

      case 'removeLightningAddress':
        return await this.client.deleteLightningAddress(parameters.storeId, parameters.username);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
