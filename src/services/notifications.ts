import { BaseService, ServiceInfo } from './base-service.js';

export class NotificationsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'notifications',
      description: 'Current user notification management - view, update, and manage notification settings',
      category: 'user',
      methods: [
        {
          name: 'list',
          description: 'Get current user\'s notifications with optional filtering',
          parameters: {
            storeIds: {
              type: 'array',
              description: 'Array of store IDs to filter notifications for specific stores',
              required: false
            },
            take: {
              type: 'number',
              description: 'Number of records to return (pagination)',
              required: false
            },
            skip: {
              type: 'number',
              description: 'Number of records to skip (pagination)',
              required: false
            },
            seen: {
              type: 'string',
              description: 'Filter by seen status: "true", "false", or omit for all',
              required: false
            }
          },
          examples: [
            {
              name: 'Get all notifications',
              description: 'Retrieve all notifications for the current user',
              parameters: {}
            },
            {
              name: 'Get unread notifications',
              description: 'Get only unseen notifications',
              parameters: {
                seen: 'false'
              }
            },
            {
              name: 'Get store-specific notifications',
              description: 'Get notifications for specific stores with pagination',
              parameters: {
                storeIds: ['store1', 'store2'],
                take: 10,
                skip: 0
              }
            },
            {
              name: 'Paginated notifications',
              description: 'Get notifications with pagination',
              parameters: {
                take: 20,
                skip: 40
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get details of a specific notification by ID',
          parameters: {
            id: {
              type: 'string',
              description: 'The notification ID to retrieve',
              required: true
            }
          },
          examples: [
            {
              name: 'Get notification details',
              description: 'Retrieve details of a specific notification',
              parameters: {
                id: 'notification-uuid-123'
              }
            }
          ]
        },
        {
          name: 'update',
          description: 'Update notification status (mark as seen/unseen)',
          parameters: {
            id: {
              type: 'string',
              description: 'The notification ID to update',
              required: true
            },
            seen: {
              type: 'boolean',
              description: 'Mark notification as seen (true) or unseen (false). If omitted, toggles current state',
              required: false
            }
          },
          examples: [
            {
              name: 'Mark as read',
              description: 'Mark a notification as seen/read',
              parameters: {
                id: 'notification-uuid-123',
                seen: true
              }
            },
            {
              name: 'Mark as unread',
              description: 'Mark a notification as unseen/unread',
              parameters: {
                id: 'notification-uuid-123',
                seen: false
              }
            },
            {
              name: 'Toggle seen status',
              description: 'Toggle the seen status of a notification',
              parameters: {
                id: 'notification-uuid-123'
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Remove/delete a specific notification',
          parameters: {
            id: {
              type: 'string',
              description: 'The notification ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete notification',
              description: 'Remove a notification from the user\'s list',
              parameters: {
                id: 'notification-uuid-123'
              }
            }
          ]
        },
        {
          name: 'getSettings',
          description: 'Get current user\'s notification preferences/settings',
          parameters: {},
          examples: [
            {
              name: 'View notification settings',
              description: 'Get all notification type preferences for the current user',
              parameters: {}
            }
          ]
        },
        {
          name: 'updateSettings',
          description: 'Update notification preferences - enable/disable specific notification types',
          parameters: {
            disabled: {
              type: 'array',
              description: 'Array of notification type identifiers to disable. Use "all" to disable all notifications',
              required: true
            }
          },
          examples: [
            {
              name: 'Disable version notifications',
              description: 'Disable new version and plugin update notifications',
              parameters: {
                disabled: ['newversion', 'pluginupdate']
              }
            },
            {
              name: 'Disable invoice notifications',
              description: 'Disable all invoice-related notifications',
              parameters: {
                disabled: [
                  'invoicestate',
                  'invoicestate_invoice_confirmed',
                  'invoicestate_invoice_expiredPaidPartial',
                  'invoicestate_invoice_failedToConfirm',
                  'invoicestate_invoice_paidAfterExpiration'
                ]
              }
            },
            {
              name: 'Disable all notifications',
              description: 'Disable all notification types',
              parameters: {
                disabled: ['all']
              }
            },
            {
              name: 'Selective notifications',
              description: 'Keep only critical notifications enabled',
              parameters: {
                disabled: [
                  'newversion',
                  'pluginupdate',
                  'invoicestate'
                ]
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'list':
        return await this.client.getNotifications(
          parameters.storeIds,
          parameters.take,
          parameters.skip,
          parameters.seen
        );

      case 'get':
        return await this.client.getNotification(parameters.id);

      case 'update':
        const updateData: any = {};
        if (parameters.seen !== undefined) {
          updateData.seen = parameters.seen;
        }
        return await this.client.updateNotification(parameters.id, updateData);

      case 'delete':
        return await this.client.deleteNotification(parameters.id);

      case 'getSettings':
        return await this.client.getNotificationSettings();

      case 'updateSettings':
        return await this.client.updateNotificationSettings({
          disabled: parameters.disabled
        });

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
