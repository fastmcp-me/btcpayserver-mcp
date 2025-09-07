import { BaseService, ServiceInfo } from './base-service.js';

export class InvoicesService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'invoices',
      description: 'Manage BTCPayServer invoices - create, retrieve, list, update, archive, mark status, refund, and manage payment methods',
      category: 'payments',
      methods: [
        {
          name: 'create',
          description: 'Create a new invoice for a store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to create invoice for',
              required: true
            },
            amount: {
              type: 'string',
              description: 'Invoice amount',
              required: false
            },
            currency: {
              type: 'string',
              description: 'Currency code',
              required: false,
              default: 'USD'
            },
            orderId: {
              type: 'string',
              description: 'Order ID for the invoice',
              required: false
            },
            buyerEmail: {
              type: 'string',
              description: 'Email for payment notifications',
              required: false
            },
            notificationURL: {
              type: 'string',
              description: 'Webhook URL for payment notifications',
              required: false
            },
            redirectURL: {
              type: 'string',
              description: 'URL to redirect after payment',
              required: false
            },
            defaultPaymentMethod: {
              type: 'string',
              description: 'Preferred payment method',
              required: false
            },
            metadata: {
              type: 'object',
              description: 'Additional metadata for the invoice',
              required: false
            }
          },
          examples: [
            {
              name: 'Basic invoice',
              description: 'Create a simple invoice',
              parameters: {
                storeId: 'store123',
                amount: '50.00',
                currency: 'USD',
                buyerEmail: 'customer@example.com'
              }
            },
            {
              name: 'Invoice with callbacks',
              description: 'Create an invoice with webhook and redirect URLs',
              parameters: {
                storeId: 'store123',
                amount: '100.00',
                currency: 'USD',
                orderId: 'order-456',
                notificationURL: 'https://mysite.com/webhook',
                redirectURL: 'https://mysite.com/success'
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get details of a specific invoice by ID',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID to retrieve',
              required: true
            }
          },
          examples: [
            {
              name: 'Get invoice',
              description: 'Retrieve details of a specific invoice',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123'
              }
            }
          ]
        },
        {
          name: 'list',
          description: 'List all invoices for a store with optional filtering',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to list invoices for',
              required: true
            },
            orderId: {
              type: 'string',
              description: 'Filter by order ID',
              required: false
            },
            status: {
              type: 'string',
              description: 'Filter by status (New, Processing, Expired, Invalid, Settled)',
              required: false
            },
            startDate: {
              type: 'string',
              description: 'Filter invoices created after this date (ISO format)',
              required: false
            },
            endDate: {
              type: 'string',
              description: 'Filter invoices created before this date (ISO format)',
              required: false
            }
          },
          examples: [
            {
              name: 'List all invoices',
              description: 'Get all invoices for a store',
              parameters: {
                storeId: 'store123'
              }
            },
            {
              name: 'Filter by status',
              description: 'Get only settled invoices',
              parameters: {
                storeId: 'store123',
                status: 'Settled'
              }
            }
          ]
        },
        {
          name: 'update',
          description: 'Update an existing invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID to update',
              required: true
            },
            metadata: {
              type: 'object',
              description: 'Updated metadata for the invoice',
              required: false
            }
          },
          examples: [
            {
              name: 'Update invoice metadata',
              description: 'Add or update invoice metadata',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                metadata: {
                  customerNote: 'Priority order',
                  internalRef: 'ref-789'
                }
              }
            }
          ]
        },
        {
          name: 'listAdvanced',
          description: 'List invoices with advanced filtering options',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID to list invoices for',
              required: true
            },
            orderId: {
              type: 'array',
              description: 'Array of order IDs to filter by',
              required: false
            },
            textSearch: {
              type: 'string',
              description: 'Search term to find specific invoices',
              required: false
            },
            status: {
              type: 'string',
              description: 'Filter by status (Expired, Invalid, New, Processing, Settled)',
              required: false
            },
            startDate: {
              type: 'number',
              description: 'Unix timestamp - start date filter',
              required: false
            },
            endDate: {
              type: 'number',
              description: 'Unix timestamp - end date filter',
              required: false
            },
            take: {
              type: 'number',
              description: 'Number of records to return',
              required: false
            },
            skip: {
              type: 'number',
              description: 'Number of records to skip',
              required: false
            }
          },
          examples: [
            {
              name: 'Search invoices',
              description: 'Search for invoices containing specific text',
              parameters: {
                storeId: 'store123',
                textSearch: 'premium product',
                take: 10
              }
            },
            {
              name: 'Filter by date range',
              description: 'Get invoices from a specific period',
              parameters: {
                storeId: 'store123',
                startDate: 1640995200,
                endDate: 1643673600,
                status: 'Settled'
              }
            }
          ]
        },
        {
          name: 'getPaymentMethods',
          description: 'Get payment methods for a specific invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
              required: true
            },
            includeSensitive: {
              type: 'boolean',
              description: 'Include sensitive data (requires additional permissions)',
              required: false,
              default: false
            },
            onlyAccountedPayments: {
              type: 'boolean',
              description: 'Only return accounted payments',
              required: false,
              default: true
            }
          },
          examples: [
            {
              name: 'Get invoice payment methods',
              description: 'Retrieve payment methods for an invoice',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123'
              }
            }
          ]
        },
        {
          name: 'getRefundTriggerData',
          description: 'Get refund calculation data for an invoice payment method',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
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
              name: 'Get refund data',
              description: 'Calculate refund amounts for Bitcoin payments',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'markStatus',
          description: 'Mark an invoice as Invalid or Settled',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
              required: true
            },
            status: {
              type: 'string',
              description: 'Status to mark the invoice as (Invalid or Settled)',
              required: true
            }
          },
          examples: [
            {
              name: 'Mark invoice as settled',
              description: 'Manually mark an invoice as settled',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                status: 'Settled'
              }
            },
            {
              name: 'Mark invoice as invalid',
              description: 'Mark an invoice as invalid',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                status: 'Invalid'
              }
            }
          ]
        },
        {
          name: 'archive',
          description: 'Archive an invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID to archive',
              required: true
            }
          },
          examples: [
            {
              name: 'Archive invoice',
              description: 'Archive an invoice to remove it from active lists',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123'
              }
            }
          ]
        },
        {
          name: 'unarchive',
          description: 'Unarchive an invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID to unarchive',
              required: true
            }
          },
          examples: [
            {
              name: 'Unarchive invoice',
              description: 'Restore an archived invoice to active status',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123'
              }
            }
          ]
        },
        {
          name: 'activatePaymentMethod',
          description: 'Activate a payment method for an invoice (lazy payments)',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
              required: true
            },
            paymentMethodId: {
              type: 'string',
              description: 'Payment method ID to activate (e.g., BTC-CHAIN)',
              required: true
            }
          },
          examples: [
            {
              name: 'Activate Bitcoin payment',
              description: 'Activate Bitcoin on-chain payment for an invoice',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'refund',
          description: 'Create a refund for an invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            invoiceId: {
              type: 'string',
              description: 'Invoice ID to refund',
              required: true
            },
            name: {
              type: 'string',
              description: 'Name for the refund pull payment',
              required: false
            },
            description: {
              type: 'string',
              description: 'Description for the refund',
              required: false
            },
            payoutMethodId: {
              type: 'string',
              description: 'Payout method (e.g., BTC-CHAIN, BTC-LN)',
              required: false
            },
            refundVariant: {
              type: 'string',
              description: 'Refund calculation method (CurrentRate, Custom, Fiat, OverpaidAmount, RateThen)',
              required: false
            },
            subtractPercentage: {
              type: 'string',
              description: 'Percentage to subtract from refund (e.g., processing fee)',
              required: false
            },
            customAmount: {
              type: 'string',
              description: 'Custom refund amount (for Custom variant)',
              required: false
            },
            customCurrency: {
              type: 'string',
              description: 'Custom refund currency (for Custom variant)',
              required: false
            }
          },
          examples: [
            {
              name: 'Full refund at current rate',
              description: 'Refund the full amount at current exchange rate',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                refundVariant: 'CurrentRate',
                payoutMethodId: 'BTC-CHAIN'
              }
            },
            {
              name: 'Partial refund with fee',
              description: 'Refund with processing fee deduction',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                refundVariant: 'RateThen',
                subtractPercentage: '2.5',
                description: 'Partial refund minus processing fee'
              }
            },
            {
              name: 'Custom amount refund',
              description: 'Refund a specific custom amount',
              parameters: {
                storeId: 'store123',
                invoiceId: 'inv_abc123',
                refundVariant: 'Custom',
                customAmount: '25.00',
                customCurrency: 'USD'
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
        return await this.client.createInvoice(
          parameters.storeId,
          parameters.amount,
          parameters.currency || 'USD',
          parameters.orderId,
          parameters.buyerEmail,
          parameters.notificationURL,
          parameters.redirectURL,
          parameters.defaultPaymentMethod,
          parameters.metadata
        );

      case 'get':
        return await this.client.getInvoice(parameters.storeId, parameters.invoiceId);

      case 'list':
        const invoices = await this.client.listInvoices(parameters.storeId, parameters.orderId, parameters.status);
        return invoices;

      case 'update':
        return await this.client.updateInvoice(
          parameters.storeId,
          parameters.invoiceId,
          parameters.metadata
        );

      case 'listAdvanced':
        return await this.client.listInvoicesAdvanced(
          parameters.storeId,
          parameters.orderId,
          parameters.textSearch,
          parameters.status,
          parameters.endDate,
          parameters.take,
          parameters.skip,
          parameters.startDate
        );

      case 'getPaymentMethods':
        return await this.client.getInvoicePaymentMethods(
          parameters.storeId,
          parameters.invoiceId,
          parameters.includeSensitive || false,
          parameters.onlyAccountedPayments !== false
        );

      case 'getRefundTriggerData':
        return await this.client.getInvoiceRefundTriggerData(
          parameters.storeId,
          parameters.invoiceId,
          parameters.paymentMethodId
        );

      case 'markStatus':
        return await this.client.markInvoiceStatus(
          parameters.storeId,
          parameters.invoiceId,
          parameters.status
        );

      case 'archive':
        return await this.client.archiveInvoice(parameters.storeId, parameters.invoiceId);

      case 'unarchive':
        return await this.client.unarchiveInvoice(parameters.storeId, parameters.invoiceId);

      case 'activatePaymentMethod':
        return await this.client.activatePaymentMethod(
          parameters.storeId,
          parameters.invoiceId,
          parameters.paymentMethodId
        );

      case 'refund':
        return await this.client.refundInvoice(
          parameters.storeId,
          parameters.invoiceId,
          parameters.name,
          parameters.description,
          parameters.payoutMethodId,
          parameters.refundVariant,
          parameters.subtractPercentage,
          parameters.customAmount,
          parameters.customCurrency
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}

