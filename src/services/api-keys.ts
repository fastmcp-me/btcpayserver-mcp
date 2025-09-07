import { BaseService, ServiceInfo } from './base-service.js';

export class ApiKeysService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'api-keys',
      description: 'Manage API keys and permissions - create, get, delete API keys and manage permissions',
      category: 'authentication',
      methods: [
        {
          name: 'create',
          description: 'Create a new API key',
          parameters: {
            label: {
              type: 'string',
              description: 'API key label',
              required: false
            },
            permissions: {
              type: 'array',
              description: 'Array of permission strings',
              required: true
            },
            storeId: {
              type: 'string',
              description: 'Store ID for store-specific permissions',
              required: false
            }
          },
          examples: [
            {
              name: 'Store manager key',
              description: 'Create API key with store management permissions',
              parameters: {
                label: 'Store Manager Key',
                permissions: ['btcpay.store.canmodifystoresettings', 'btcpay.store.canviewinvoices'],
                storeId: 'store123'
              }
            },
            {
              name: 'Invoice-only key',
              description: 'Create API key for invoice operations only',
              parameters: {
                label: 'Invoice API Key',
                permissions: ['btcpay.store.cancreateinvoice', 'btcpay.store.canviewinvoices'],
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get API key details',
          parameters: {
            apiKey: {
              type: 'string',
              description: 'API key to retrieve',
              required: true
            }
          },
          examples: [
            {
              name: 'Get API key info',
              description: 'Retrieve API key information',
              parameters: {
                apiKey: 'your-api-key-here'
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete an API key',
          parameters: {
            apiKey: {
              type: 'string',
              description: 'API key to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Revoke API key',
              description: 'Delete/revoke an API key',
              parameters: {
                apiKey: 'api-key-to-revoke'
              }
            }
          ]
        },
        {
          name: 'getPermissions',
          description: 'Get available API permissions',
          parameters: {},
          examples: [
            {
              name: 'List permissions',
              description: 'Get all available API permissions',
              parameters: {}
            }
          ]
        },
        {
          name: 'revokeCurrent',
          description: 'Revoke the current API key',
          parameters: {},
          examples: [
            {
              name: 'Revoke current key',
              description: 'Revoke the currently used API key',
              parameters: {}
            }
          ]
        },
        {
          name: 'createForUser',
          description: 'Create a new API key for a specific user',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'The user\'s ID or email address',
              required: true
            },
            label: {
              type: 'string',
              description: 'API key label',
              required: false
            },
            permissions: {
              type: 'array',
              description: 'Array of permission strings',
              required: true
            }
          },
          examples: [
            {
              name: 'Create user API key',
              description: 'Create API key for a specific user',
              parameters: {
                idOrEmail: 'user@example.com',
                label: 'User Store Key',
                permissions: ['btcpay.store.cancreateinvoice']
              }
            }
          ]
        },
        {
          name: 'deleteForUser',
          description: 'Delete an API key for a specific user',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'The user\'s ID or email address',
              required: true
            },
            apiKey: {
              type: 'string',
              description: 'API key to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete user API key',
              description: 'Delete/revoke an API key for a specific user',
              parameters: {
                idOrEmail: 'user@example.com',
                apiKey: 'api-key-to-revoke'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'create':
        return await this.client.createApiKey(
          parameters.permissions,
          parameters.label,
          parameters.storeId
        );

      case 'get':
        return await this.client.getApiKey();

      case 'delete':
        return await this.client.deleteApiKey(parameters.apiKey);

      case 'getPermissions':
        return await this.client.getPermissions();

      case 'revokeCurrent':
        return await this.client.revokeCurrentApiKey();

      case 'createForUser':
        return await this.client.createApiKeyForUser(
          parameters.idOrEmail,
          parameters.permissions,
          parameters.label
        );

      case 'deleteForUser':
        return await this.client.deleteApiKeyForUser(
          parameters.idOrEmail,
          parameters.apiKey
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
