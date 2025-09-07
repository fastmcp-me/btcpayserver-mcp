import { BaseService, ServiceInfo } from './base-service.js';

export class AuthorizationService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'authorization',
      description: 'Authorization operations for user API key generation and permission management',
      category: 'authentication',
      methods: [
        {
          name: 'authorizeUser',
          description: 'Generate authorization URL to redirect the browser for user API key generation with specific permissions',
          parameters: {
            permissions: {
              type: 'array',
              description: 'Array of permission strings to request (e.g., ["btcpay.store.cancreateinvoice", "btcpay.store.canviewinvoices"])',
              required: false
            },
            strict: {
              type: 'boolean',
              description: 'If permissions are specified and strict is false, allows user to reject some permissions. Default: true',
              required: false,
              default: true
            },
            applicationIdentifier: {
              type: 'string',
              description: 'Application identifier for checking existing API keys. Ignored if redirect is not specified',
              required: false
            },
            selectiveStores: {
              type: 'boolean',
              description: 'If requesting CanModifyStoreSettings permission, allows user to grant permissions to selected stores only. Default: false',
              required: false,
              default: false
            },
            applicationName: {
              type: 'string',
              description: 'The name of your application to display to the user',
              required: false
            },
            redirect: {
              type: 'string',
              description: 'URL to redirect to after user consent, with query parameters appended (permissions, user-id, api-key). If not specified, user is redirected to their API Key list',
              required: false
            }
          },
          examples: [
            {
              name: 'Basic authorization request',
              description: 'Request basic invoice and store permissions',
              parameters: {
                permissions: ['btcpay.store.cancreateinvoice', 'btcpay.store.canviewinvoices'],
                applicationName: 'My E-commerce App',
                redirect: 'https://myapp.com/btcpay/callback'
              }
            },
            {
              name: 'Store management authorization',
              description: 'Request store management permissions with selective stores',
              parameters: {
                permissions: ['btcpay.store.canmodifystoresettings', 'btcpay.store.canviewinvoices'],
                applicationName: 'Store Manager App',
                selectiveStores: true,
                strict: false,
                redirect: 'https://myapp.com/btcpay/setup'
              }
            },
            {
              name: 'Server admin authorization',
              description: 'Request server administration permissions',
              parameters: {
                permissions: ['btcpay.server.canmanageserver', 'btcpay.user.canviewprofile'],
                applicationName: 'BTCPay Admin Tool',
                applicationIdentifier: 'btcpay-admin-v1',
                strict: true,
                redirect: 'https://admin.myapp.com/auth/callback'
              }
            },
            {
              name: 'Simple redirect to API keys',
              description: 'Redirect user to create any API key (no specific permissions)',
              parameters: {
                applicationName: 'Simple Integration'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'authorizeUser':
        return this.buildAuthorizationUrl(parameters);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }

  private buildAuthorizationUrl(parameters: Record<string, any>): { authorizationUrl: string; instructions: string } {
    const baseUrl = this.client.getConfig().baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const authUrl = new URL(`${baseUrl}/api-keys/authorize`);

    // Add query parameters
    if (parameters.permissions && Array.isArray(parameters.permissions)) {
      parameters.permissions.forEach((permission: string) => {
        authUrl.searchParams.append('permissions', permission);
      });
    }

    if (parameters.strict !== undefined) {
      authUrl.searchParams.set('strict', String(parameters.strict));
    }

    if (parameters.applicationIdentifier) {
      authUrl.searchParams.set('applicationIdentifier', parameters.applicationIdentifier);
    }

    if (parameters.selectiveStores !== undefined) {
      authUrl.searchParams.set('selectiveStores', String(parameters.selectiveStores));
    }

    if (parameters.applicationName) {
      authUrl.searchParams.set('applicationName', parameters.applicationName);
    }

    if (parameters.redirect) {
      authUrl.searchParams.set('redirect', parameters.redirect);
    }

    const instructions = this.generateInstructions(parameters);

    return {
      authorizationUrl: authUrl.toString(),
      instructions
    };
  }

  private generateInstructions(parameters: Record<string, any>): string {
    let instructions = "Authorization URL generated successfully.\n\n";
    instructions += "**Next Steps:**\n";
    instructions += "1. Direct the user to the authorization URL in their browser\n";
    instructions += "2. User will see a BTCPay Server authorization page\n";

    if (parameters.permissions && parameters.permissions.length > 0) {
      instructions += "3. User will be prompted to grant the following permissions:\n";
      parameters.permissions.forEach((permission: string) => {
        instructions += `   - ${permission}\n`;
      });
    } else {
      instructions += "3. User can create an API key with any permissions they choose\n";
    }

    if (parameters.selectiveStores) {
      instructions += "4. User can select specific stores to grant permissions to\n";
    }

    if (parameters.redirect) {
      instructions += `5. After authorization, user will be redirected to: ${parameters.redirect}\n`;
      instructions += "6. The redirect URL will include query parameters:\n";
      instructions += "   - permissions: granted permissions (comma-separated)\n";
      instructions += "   - user-id: BTCPay Server user ID\n";
      instructions += "   - api-key: generated API key\n";
    } else {
      instructions += "5. After authorization, user will be redirected to their API Key list\n";
      instructions += "6. User will need to manually provide you with the generated API key\n";
    }

    instructions += "\n**Security Notes:**\n";
    instructions += "- The authorization URL is safe to share with the user\n";
    instructions += "- The actual API key is only accessible to the user or via the redirect callback\n";
    instructions += "- Store the API key securely once received\n";

    if (parameters.strict === false) {
      instructions += "- User can reject some of the requested permissions (strict=false)\n";
    }

    return instructions;
  }
}
