import { BaseService, ServiceInfo } from './base-service.js';

export class StoresUsersService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-users',
      description: 'Store users operations - manage store user access and permissions',
      category: 'store-management',
      methods: [
        {
          name: 'getUsers',
          description: 'Get store users',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get all store users',
              description: 'List all users with access to the store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'addUser',
          description: 'Add a user to the store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            id: {
              type: 'string',
              description: 'The id of the user',
              required: false
            },
            email: {
              type: 'string',
              description: 'The email of the user',
              required: true
            },
            name: {
              type: 'string',
              description: 'The name of the user',
              required: false
            },
            storeRole: {
              type: 'string',
              description: 'The role of the user (Owner, Manager, Employee, Guest)',
              required: true
            },
            emailConfirmed: {
              type: 'boolean',
              description: 'True if the email has been confirmed by the user',
              required: false
            },
            approved: {
              type: 'boolean',
              description: 'True if an admin has approved the user',
              required: false
            },
            disabled: {
              type: 'boolean',
              description: 'True if an admin has disabled the user',
              required: false
            }
          },
          examples: [
            {
              name: 'Add manager user',
              description: 'Add a new manager to the store',
              parameters: {
                storeId: 'store123',
                email: 'manager@example.com',
                name: 'John Manager',
                storeRole: 'Manager',
                emailConfirmed: true,
                approved: true
              }
            }
          ]
        },
        {
          name: 'updateUser',
          description: 'Update a store user',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            idOrEmail: {
              type: 'string',
              description: 'The user\'s id or email',
              required: true
            },
            storeRole: {
              type: 'string',
              description: 'The role of the user (Owner, Manager, Employee, Guest)',
              required: false
            },
            name: {
              type: 'string',
              description: 'The name of the user',
              required: false
            },
            approved: {
              type: 'boolean',
              description: 'True if an admin has approved the user',
              required: false
            },
            disabled: {
              type: 'boolean',
              description: 'True if an admin has disabled the user',
              required: false
            }
          },
          examples: [
            {
              name: 'Promote user to manager',
              description: 'Change user role from employee to manager',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'employee@example.com',
                storeRole: 'Manager'
              }
            }
          ]
        },
        {
          name: 'removeUser',
          description: 'Remove a user from the store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            idOrEmail: {
              type: 'string',
              description: 'The user\'s id or email',
              required: true
            }
          },
          examples: [
            {
              name: 'Remove user access',
              description: 'Remove user access from the store',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'former-employee@example.com'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getUsers':
        return await this.client.getStoreUsers(parameters.storeId);

      case 'addUser':
        return await this.client.addStoreUser(
          parameters.storeId,
          {
            id: parameters.id || '',
            email: parameters.email || '',
            name: parameters.name || null,
            imageUrl: parameters.imageUrl || null,
            invitationUrl: parameters.invitationUrl || null,
            emailConfirmed: parameters.emailConfirmed || false,
            requiresEmailConfirmation: parameters.requiresEmailConfirmation || false,
            approved: parameters.approved || false,
            requiresApproval: parameters.requiresApproval || false,
            created: parameters.created || null,
            disabled: parameters.disabled || false,
            roles: parameters.roles || [],
            userId: parameters.userId,
            role: parameters.role,
            storeRole: parameters.storeRole
          }
        );

      case 'updateUser':
        return await this.client.updateStoreUser(
          parameters.storeId,
          parameters.idOrEmail,
          {
            storeRole: parameters.storeRole,
            name: parameters.name,
            approved: parameters.approved,
            disabled: parameters.disabled
          }
        );

      case 'removeUser':
        return await this.client.removeStoreUser(parameters.storeId, parameters.idOrEmail);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
