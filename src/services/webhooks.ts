import { BaseService, ServiceInfo } from './base-service.js';

export class WebhooksService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'webhooks',
      description: 'Manage store webhooks - create, list, get, update, delete webhooks, and manage delivery tracking for real-time notifications',
      category: 'integrations',
      methods: [
        {
          name: 'create',
          description: 'Register a new webhook for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            url: {
              type: 'string',
              description: 'Webhook endpoint URL',
              required: true
            },
            authorizedEvents: {
              type: 'array',
              description: 'Array of event types to subscribe to',
              required: true
            },
            secret: {
              type: 'string',
              description: 'Secret for webhook signature verification',
              required: false
            }
          },
          examples: [
            {
              name: 'Invoice webhook',
              description: 'Create webhook for invoice events',
              parameters: {
                storeId: 'store123',
                url: 'https://mysite.com/webhooks/btcpay',
                authorizedEvents: ['InvoiceCreated', 'InvoiceExpired', 'InvoiceSettled'],
                secret: 'my-webhook-secret'
              }
            }
          ]
        },
        {
          name: 'list',
          description: 'List all webhooks for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'List webhooks',
              description: 'Get all webhooks for a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get details of a specific webhook',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get webhook details',
              description: 'Retrieve information about a specific webhook',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456'
              }
            }
          ]
        },
        {
          name: 'update',
          description: 'Update an existing webhook',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID to update',
              required: true
            },
            enabled: {
              type: 'boolean',
              description: 'Whether webhook is enabled',
              required: false
            },
            automaticRedelivery: {
              type: 'boolean',
              description: 'Enable automatic redelivery on failure',
              required: false
            },
            url: {
              type: 'string',
              description: 'Webhook endpoint URL',
              required: false
            },
            authorizedEvents: {
              type: 'object',
              description: 'Events to subscribe to {everything: boolean, specificEvents: string[]}',
              required: false
            },
            secret: {
              type: 'string',
              description: 'Secret for webhook signature verification',
              required: false
            }
          },
          examples: [
            {
              name: 'Update webhook URL',
              description: 'Change the webhook endpoint URL',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                url: 'https://mysite.com/webhooks/btcpay-new'
              }
            },
            {
              name: 'Disable webhook',
              description: 'Temporarily disable a webhook',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                enabled: false
              }
            },
            {
              name: 'Update webhook events',
              description: 'Change which events the webhook receives',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                authorizedEvents: {
                  everything: false,
                  specificEvents: ['InvoiceCreated', 'InvoiceSettled']
                }
              }
            }
          ]
        },
        {
          name: 'getDeliveries',
          description: 'Get recent webhook deliveries',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID',
              required: true
            },
            count: {
              type: 'number',
              description: 'Number of recent deliveries to fetch',
              required: false
            }
          },
          examples: [
            {
              name: 'Get recent deliveries',
              description: 'Get the 10 most recent webhook deliveries',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                count: 10
              }
            }
          ]
        },
        {
          name: 'getDelivery',
          description: 'Get details of a specific webhook delivery',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID',
              required: true
            },
            deliveryId: {
              type: 'string',
              description: 'Delivery ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get delivery details',
              description: 'Get information about a specific webhook delivery',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                deliveryId: 'delivery789'
              }
            }
          ]
        },
        {
          name: 'getDeliveryRequest',
          description: 'Get the JSON request payload of a webhook delivery',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID',
              required: true
            },
            deliveryId: {
              type: 'string',
              description: 'Delivery ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get delivery request',
              description: 'Get the JSON payload that was sent to the webhook',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                deliveryId: 'delivery789'
              }
            }
          ]
        },
        {
          name: 'redeliver',
          description: 'Redeliver a failed webhook delivery',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID',
              required: true
            },
            deliveryId: {
              type: 'string',
              description: 'Delivery ID to redeliver',
              required: true
            }
          },
          examples: [
            {
              name: 'Redeliver webhook',
              description: 'Retry a failed webhook delivery',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456',
                deliveryId: 'delivery789'
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete a webhook',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            webhookId: {
              type: 'string',
              description: 'Webhook ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete webhook',
              description: 'Remove a webhook endpoint',
              parameters: {
                storeId: 'store123',
                webhookId: 'webhook456'
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
        return await this.client.createWebhook(
          parameters.storeId,
          parameters.url,
          parameters.events,
          parameters.secret
        );

      case 'list':
        const webhooks = await this.client.listStoreWebhooks(parameters.storeId);
        return webhooks;

      case 'get':
        return await this.client.getStoreWebhook(parameters.storeId, parameters.webhookId);

      case 'update':
        return await this.client.updateWebhook(
          parameters.storeId,
          parameters.webhookId,
          parameters.enabled,
          parameters.automaticRedelivery,
          parameters.url,
          parameters.authorizedEvents,
          parameters.secret
        );

      case 'getDeliveries':
        return await this.client.getWebhookDeliveries(
          parameters.storeId,
          parameters.webhookId,
          parameters.count
        );

      case 'getDelivery':
        return await this.client.getWebhookDelivery(
          parameters.storeId,
          parameters.webhookId,
          parameters.deliveryId
        );

      case 'getDeliveryRequest':
        return await this.client.getWebhookDeliveryRequest(
          parameters.storeId,
          parameters.webhookId,
          parameters.deliveryId
        );

      case 'redeliver':
        return await this.client.redeliverWebhook(
          parameters.storeId,
          parameters.webhookId,
          parameters.deliveryId
        );

      case 'delete':
        return await this.client.deleteWebhook(parameters.storeId, parameters.webhookId);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
