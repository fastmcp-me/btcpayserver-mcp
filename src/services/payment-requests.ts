import { BaseService, ServiceInfo } from './base-service.js';

export class PaymentRequestsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'payment-requests',
      description: 'Manage BTCPayServer payment requests - create, retrieve, list, update, delete payment requests, and pay payment requests (creates invoices)',
      category: 'payments',
      methods: [
        {
          name: 'create',
          description: 'Create a new payment request for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'The store ID to create the payment request for',
              required: true
            },
            amount: {
              type: 'string',
              description: 'Payment amount (optional for custom amount requests)',
              required: false
            },
            currency: {
              type: 'string',
              description: 'Currency code',
              required: false,
              default: 'USD'
            },
            title: {
              type: 'string',
              description: 'Payment request title',
              required: false
            },
            description: {
              type: 'string',
              description: 'Payment request description',
              required: false
            },
            expiryDate: {
              type: 'string',
              description: 'Expiry date in ISO format (e.g., "2025-09-04T00:00:00Z" or "2025-09-04 00:00:00")',
              required: false
            },
            email: {
              type: 'string',
              description: 'Email for payment notifications',
              required: false
            },
            allowCustomPaymentAmounts: {
              type: 'boolean',
              description: 'Allow custom payment amounts',
              required: false,
              default: false
            },
            referenceId: {
              type: 'string',
              description: 'Reference ID for the payment request',
              required: false
            }
          },
          examples: [
            {
              name: 'Fixed amount payment request',
              description: 'Create a payment request for a specific amount',
              parameters: {
                storeId: 'store123',
                amount: '100.00',
                currency: 'USD',
                title: 'Product Payment',
                description: 'Payment for premium product'
              }
            },
            {
              name: 'Custom amount payment request',
              description: 'Create a payment request allowing custom amounts',
              parameters: {
                storeId: 'store123',
                currency: 'USD',
                title: 'Donation',
                description: 'Support our cause',
                allowCustomPaymentAmounts: true
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get a specific payment request by ID',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentRequestId: {
              type: 'string',
              description: 'Payment request ID to retrieve',
              required: true
            }
          },
          examples: [
            {
              name: 'Get payment request',
              description: 'Retrieve details of a specific payment request',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123'
              }
            }
          ]
        },
        {
          name: 'list',
          description: 'List all payment requests for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to list payment requests for',
              required: true
            }
          },
          examples: [
            {
              name: 'List all payment requests',
              description: 'Get all payment requests for a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'update',
          description: 'Update an existing payment request',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentRequestId: {
              type: 'string',
              description: 'Payment request ID to update',
              required: true
            },
            amount: {
              type: 'string',
              description: 'Payment amount',
              required: false
            },
            currency: {
              type: 'string',
              description: 'Currency code',
              required: false
            },
            title: {
              type: 'string',
              description: 'Payment request title',
              required: false
            },
            description: {
              type: 'string',
              description: 'Payment request description',
              required: false
            },
            expiryDate: {
              type: 'string',
              description: 'Expiry date in ISO format',
              required: false
            },
            email: {
              type: 'string',
              description: 'Email for payment notifications',
              required: false
            },
            allowCustomPaymentAmounts: {
              type: 'boolean',
              description: 'Allow custom payment amounts',
              required: false
            },
            referenceId: {
              type: 'string',
              description: 'Reference ID for the payment request',
              required: false
            },
            formId: {
              type: 'string',
              description: 'Form ID to request customer data',
              required: false
            },
            formResponse: {
              type: 'object',
              description: 'Form data response',
              required: false
            }
          },
          examples: [
            {
              name: 'Update payment request title',
              description: 'Update the title of an existing payment request',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123',
                title: 'Updated Product Payment'
              }
            },
            {
              name: 'Update payment request amount',
              description: 'Update the amount and currency of a payment request',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123',
                amount: '150.00',
                currency: 'EUR'
              }
            }
          ]
        },
        {
          name: 'pay',
          description: 'Pay a payment request (creates an invoice for payment)',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentRequestId: {
              type: 'string',
              description: 'Payment request ID to pay',
              required: true
            },
            amount: {
              type: 'string',
              description: 'Invoice amount (if different from payment request amount)',
              required: false
            },
            allowPendingInvoiceReuse: {
              type: 'boolean',
              description: 'Whether to reuse pending invoices for this payment request',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Pay payment request',
              description: 'Pay a payment request for the full amount (creates invoice)',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123'
              }
            },
            {
              name: 'Pay partial amount',
              description: 'Pay a partial amount (requires allowCustomPaymentAmounts)',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123',
                amount: '50.00'
              }
            },
            {
              name: 'Pay with invoice reuse',
              description: 'Pay a payment request allowing reuse of pending invoices',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123',
                allowPendingInvoiceReuse: true
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete a payment request',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentRequestId: {
              type: 'string',
              description: 'Payment request ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete payment request',
              description: 'Remove a payment request',
              parameters: {
                storeId: 'store123',
                paymentRequestId: 'pr_abc123'
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
        return await this.client.createPaymentRequest(
          parameters.storeId,
          parameters.amount,
          parameters.currency || 'USD',
          parameters.title,
          parameters.description,
          parameters.expiryDate,
          parameters.email,
          parameters.allowCustomPaymentAmounts || false,
          parameters.referenceId
        );

      case 'get':
        return await this.client.getPaymentRequest(parameters.storeId, parameters.paymentRequestId);

      case 'list':
        return await this.client.getPaymentRequests(parameters.storeId);

      case 'update':
        return await this.client.updatePaymentRequest(
          parameters.storeId,
          parameters.paymentRequestId,
          parameters.amount,
          parameters.currency,
          parameters.title,
          parameters.description,
          parameters.expiryDate,
          parameters.email,
          parameters.allowCustomPaymentAmounts,
          parameters.referenceId,
          parameters.formId,
          parameters.formResponse
        );

      case 'pay':
        return await this.client.payPaymentRequest(
          parameters.storeId,
          parameters.paymentRequestId,
          parameters.amount,
          parameters.allowPendingInvoiceReuse || false
        );

      case 'delete':
        return await this.client.deletePaymentRequest(parameters.storeId, parameters.paymentRequestId);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
