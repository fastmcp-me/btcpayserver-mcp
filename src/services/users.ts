import { BaseService, ServiceInfo } from './base-service.js';

export class UsersService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'users',
      description: 'Manage BTCPayServer users - create, update, delete users, manage profiles, handle user administration and store permissions',
      category: 'user-management',
      methods: [
        {
          name: 'create',
          description: 'Create a new BTCPayServer user',
          parameters: {
            email: {
              type: 'string',
              description: 'User email address',
              required: true
            },
            password: {
              type: 'string',
              description: 'User password (if not provided, invitation email will be sent)',
              required: false
            },
            name: {
              type: 'string',
              description: 'User display name',
              required: false
            },
            imageUrl: {
              type: 'string',
              description: 'Profile image URL',
              required: false
            },
            isAdministrator: {
              type: 'boolean',
              description: 'Whether the user should be an administrator',
              required: false,
              default: false
            },
            sendInvitationEmail: {
              type: 'boolean',
              description: 'Whether to send invitation email to the user',
              required: false,
              default: true
            }
          },
          examples: [
            {
              name: 'Create user with password',
              description: 'Create a new user with immediate access',
              parameters: {
                email: 'user@example.com',
                password: 'SecurePassword123!',
                name: 'John Doe',
                isAdministrator: false
              }
            },
            {
              name: 'Create admin with invitation',
              description: 'Create admin and send invitation email',
              parameters: {
                email: 'admin@example.com',
                name: 'Admin User',
                isAdministrator: true,
                sendInvitationEmail: true
              }
            }
          ]
        },
        {
          name: 'getCurrent',
          description: 'Get information about the current authenticated user',
          parameters: {},
          examples: [
            {
              name: 'Get current user',
              description: 'Get details of the currently logged in user',
              parameters: {}
            }
          ]
        },
        {
          name: 'updateCurrent',
          description: 'Update current user information',
          parameters: {
            email: {
              type: 'string',
              description: 'New email address',
              required: false
            },
            name: {
              type: 'string',
              description: 'User display name',
              required: false
            },
            imageUrl: {
              type: 'string',
              description: 'Profile image URL',
              required: false
            },
            currentPassword: {
              type: 'string',
              description: 'Current password (required for password change)',
              required: false
            },
            newPassword: {
              type: 'string',
              description: 'New password',
              required: false
            }
          },
          examples: [
            {
              name: 'Update profile info',
              description: 'Update name and profile picture',
              parameters: {
                name: 'John Doe',
                imageUrl: 'https://example.com/avatar.jpg'
              }
            },
            {
              name: 'Change password',
              description: 'Change user password',
              parameters: {
                currentPassword: 'OldPassword123!',
                newPassword: 'NewPassword456!'
              }
            },
            {
              name: 'Update email and name',
              description: 'Change email and display name',
              parameters: {
                email: 'newemail@example.com',
                name: 'Jane Smith'
              }
            }
          ]
        },
        {
          name: 'deleteCurrent',
          description: 'Delete current user profile and associated data',
          parameters: {},
          examples: [
            {
              name: 'Delete own account',
              description: 'Permanently delete current user account',
              parameters: {}
            }
          ]
        },
        {
          name: 'uploadProfilePicture',
          description: 'Upload a profile picture for the current user',
          parameters: {
            fileData: {
              type: 'object',
              description: 'FormData object containing the image file',
              required: true
            }
          },
          examples: [
            {
              name: 'Upload avatar',
              description: 'Upload a new profile picture',
              parameters: {
                fileData: 'FormData with image file'
              }
            }
          ]
        },
        {
          name: 'deleteProfilePicture',
          description: 'Delete the current user profile picture',
          parameters: {},
          examples: [
            {
              name: 'Remove profile picture',
              description: 'Delete the current profile picture',
              parameters: {}
            }
          ]
        },
        {
          name: 'listAll',
          description: 'List all users (admin only)',
          parameters: {},
          examples: [
            {
              name: 'Get all users',
              description: 'Retrieve all users in the system',
              parameters: {}
            }
          ]
        },
        {
          name: 'getByIdOrEmail',
          description: 'Get user by ID or email (admin only)',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            }
          },
          examples: [
            {
              name: 'Get user by email',
              description: 'Find user by email address',
              parameters: {
                idOrEmail: 'user@example.com'
              }
            },
            {
              name: 'Get user by ID',
              description: 'Find user by user ID',
              parameters: {
                idOrEmail: 'user123'
              }
            }
          ]
        },
        {
          name: 'deleteByIdOrEmail',
          description: 'Delete user by ID or email (admin only)',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete user by email',
              description: 'Delete user account by email',
              parameters: {
                idOrEmail: 'user@example.com'
              }
            }
          ]
        },
        {
          name: 'lock',
          description: 'Lock or unlock a user account (admin only)',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            },
            locked: {
              type: 'boolean',
              description: 'Whether to lock or unlock the user',
              required: true
            }
          },
          examples: [
            {
              name: 'Lock user account',
              description: 'Lock a user account to prevent access',
              parameters: {
                idOrEmail: 'user@example.com',
                locked: true
              }
            },
            {
              name: 'Unlock user account',
              description: 'Unlock a previously locked user account',
              parameters: {
                idOrEmail: 'user@example.com',
                locked: false
              }
            }
          ]
        },
        {
          name: 'approve',
          description: 'Approve or unapprove a user account (admin only)',
          parameters: {
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            },
            approved: {
              type: 'boolean',
              description: 'Whether to approve or unapprove the user',
              required: true
            }
          },
          examples: [
            {
              name: 'Approve user',
              description: 'Approve a pending user registration',
              parameters: {
                idOrEmail: 'user@example.com',
                approved: true
              }
            },
            {
              name: 'Unapprove user',
              description: 'Revoke approval for a user account',
              parameters: {
                idOrEmail: 'user@example.com',
                approved: false
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete a user account',
          parameters: {
            userId: {
              type: 'string',
              description: 'User ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete user',
              description: 'Permanently delete a user account',
              parameters: {
                userId: 'user123'
              }
            }
          ]
        },
        {
          name: 'listStoreUsers',
          description: 'List all users with access to a specific store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'List store users',
              description: 'Get all users who have access to a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'addStoreUser',
          description: 'Add a user to a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            user: {
              type: 'object',
              description: 'User object with properties to set',
              required: true
            }
          },
          examples: [
            {
              name: 'Add user by email and role',
              description: 'Add a user to store by email with specific role',
              parameters: {
                storeId: 'store123',
                user: {
                  email: 'user@example.com',
                  storeRole: 'Manager'
                }
              }
            },
            {
              name: 'Add user by ID with full details',
              description: 'Add existing user with complete information',
              parameters: {
                storeId: 'store123',
                user: {
                  id: 'user456',
                  email: 'user@example.com',
                  name: 'John Doe',
                  storeRole: 'Employee'
                }
              }
            }
          ]
        },
        {
          name: 'updateStoreUser',
          description: 'Update a store user',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            },
            user: {
              type: 'object',
              description: 'User object with properties to update',
              required: true
            }
          },
          examples: [
            {
              name: 'Update user role',
              description: 'Change a user role in the store',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'user@example.com',
                user: {
                  storeRole: 'Owner'
                }
              }
            },
            {
              name: 'Update user details',
              description: 'Update user name and role',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'user456',
                user: {
                  name: 'Jane Smith',
                  storeRole: 'Manager'
                }
              }
            }
          ]
        },
        {
          name: 'removeStoreUser',
          description: 'Remove a user from a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            idOrEmail: {
              type: 'string',
              description: 'User ID or email address',
              required: true
            }
          },
          examples: [
            {
              name: 'Remove store access by email',
              description: 'Remove user access using email',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'user@example.com'
              }
            },
            {
              name: 'Remove store access by ID',
              description: 'Remove user access using user ID',
              parameters: {
                storeId: 'store123',
                idOrEmail: 'user456'
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
        return await this.client.createUser(
          parameters.email,
          parameters.password,
          parameters.name,
          parameters.imageUrl,
          parameters.isAdministrator || false,
          parameters.sendInvitationEmail !== false
        );

      case 'getCurrent':
        return await this.client.getUser();

      case 'updateCurrent':
        return await this.client.updateUser(
          parameters.email,
          parameters.name,
          parameters.imageUrl,
          parameters.currentPassword,
          parameters.newPassword
        );

      case 'deleteCurrent':
        return await this.client.deleteCurrentUser();

      case 'uploadProfilePicture':
        return await this.client.uploadProfilePicture(parameters.fileData);

      case 'deleteProfilePicture':
        return await this.client.deleteProfilePicture();

      case 'listAll':
        return await this.client.listAllUsers();

      case 'getByIdOrEmail':
        return await this.client.getUserByIdOrEmail(parameters.idOrEmail);

      case 'deleteByIdOrEmail':
        return await this.client.deleteUserByIdOrEmail(parameters.idOrEmail);

      case 'lock':
        return await this.client.lockUser(parameters.idOrEmail, parameters.locked);

      case 'approve':
        return await this.client.approveUser(parameters.idOrEmail, parameters.approved);

      case 'delete':
        return await this.client.deleteUser(parameters.userId);

      case 'listStoreUsers':
        return await this.client.listStoreUsers(parameters.storeId);

      case 'addStoreUser':
        return await this.client.addStoreUser(parameters.storeId, parameters.user);

      case 'updateStoreUser':
        return await this.client.updateStoreUser(
          parameters.storeId,
          parameters.idOrEmail,
          parameters.user
        );

      case 'removeStoreUser':
        return await this.client.removeStoreUser(parameters.storeId, parameters.idOrEmail);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
