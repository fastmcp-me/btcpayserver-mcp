import { BaseService, ServiceInfo } from './base-service.js';

export class PullPaymentsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'pull-payments',
      description: 'Comprehensive pull payments management - create and manage pull payments, payouts, boltcard integration and LNURL functionality',
      category: 'payments',
      methods: [
        {
          name: 'listStore',
          description: 'Get store\'s pull payments',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            includeArchived: {
              type: 'boolean',
              description: 'Whether to include archived pull payments',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'List active pull payments',
              description: 'Get all active pull payments for a store',
              parameters: {
                storeId: 'store123',
                includeArchived: false
              }
            },
            {
              name: 'List all pull payments',
              description: 'Get all pull payments including archived ones',
              parameters: {
                storeId: 'store123',
                includeArchived: true
              }
            }
          ]
        },
        {
          name: 'create',
          description: 'Create a new pull payment',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            pullPaymentData: {
              type: 'object',
              description: 'Pull payment configuration',
              required: true
            }
          },
          examples: [
            {
              name: 'Basic pull payment',
              description: 'Create a simple pull payment',
              parameters: {
                storeId: 'store123',
                pullPaymentData: {
                  name: 'Monthly Payouts',
                  description: 'Employee monthly salary payments',
                  amount: '10000.00',
                  currency: 'USD',
                  autoApproveClaims: false
                }
              }
            },
            {
              name: 'Advanced pull payment',
              description: 'Create a pull payment with full configuration',
              parameters: {
                storeId: 'store123',
                pullPaymentData: {
                  name: 'Project Funding',
                  description: 'Development team payments',
                  amount: '50000.00',
                  currency: 'USD',
                  BOLT11Expiration: 60,
                  autoApproveClaims: true,
                  startsAt: 1672531200,
                  expiresAt: 1704067200,
                  payoutMethods: ['BTC-CHAIN', 'BTC-LN']
                }
              }
            }
          ]
        },
        {
          name: 'archive',
          description: 'Archive a pull payment (cancels all awaiting payouts)',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID to archive',
              required: true
            }
          },
          examples: [
            {
              name: 'Archive pull payment',
              description: 'Archive a pull payment and cancel pending payouts',
              parameters: {
                storeId: 'store123',
                pullPaymentId: 'pp_456'
              }
            }
          ]
        },
        {
          name: 'linkBoltcard',
          description: 'Link a boltcard to a pull payment for NFC payments',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            },
            boltcardData: {
              type: 'object',
              description: 'Boltcard configuration',
              required: true
            }
          },
          examples: [
            {
              name: 'Link new boltcard',
              description: 'Link a new boltcard to pull payment',
              parameters: {
                pullPaymentId: 'pp_456',
                boltcardData: {
                  UID: '46ab87ff36a3b7',
                  onExisting: 'UpdateVersion'
                }
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get pull payment details',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get pull payment',
              description: 'Retrieve pull payment information',
              parameters: {
                pullPaymentId: 'pp_456'
              }
            }
          ]
        },
        {
          name: 'getPayouts',
          description: 'Get payouts for a pull payment',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            },
            includeCancelled: {
              type: 'boolean',
              description: 'Whether to include cancelled payouts',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Get active payouts',
              description: 'Get all active payouts for a pull payment',
              parameters: {
                pullPaymentId: 'pp_456',
                includeCancelled: false
              }
            }
          ]
        },
        {
          name: 'createPayout',
          description: 'Create a new payout from a pull payment',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            },
            payoutData: {
              type: 'object',
              description: 'Payout configuration',
              required: true
            }
          },
          examples: [
            {
              name: 'Create BTC payout',
              description: 'Create a Bitcoin payout',
              parameters: {
                pullPaymentId: 'pp_456',
                payoutData: {
                  destination: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
                  amount: '1000.00',
                  payoutMethodId: 'BTC-CHAIN'
                }
              }
            },
            {
              name: 'Create Lightning payout',
              description: 'Create a Lightning Network payout',
              parameters: {
                pullPaymentId: 'pp_456',
                payoutData: {
                  destination: 'lnbc100n1...',
                  amount: '50.00',
                  payoutMethodId: 'BTC-LN'
                }
              }
            }
          ]
        },
        {
          name: 'getPayout',
          description: 'Get specific payout details',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'Payout ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get payout details',
              description: 'Retrieve specific payout information',
              parameters: {
                pullPaymentId: 'pp_456',
                payoutId: 'payout_789'
              }
            }
          ]
        },
        {
          name: 'getLNURL',
          description: 'Get pull payment LNURL details for Lightning withdrawals',
          parameters: {
            pullPaymentId: {
              type: 'string',
              description: 'Pull payment ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get LNURL details',
              description: 'Get LNURL withdrawal information',
              parameters: {
                pullPaymentId: 'pp_456'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'listStore':
        return await this.client.listStorePullPayments(
          parameters.storeId,
          parameters.includeArchived || false
        );

      case 'create':
        return await this.client.createPullPayment(
          parameters.storeId,
          parameters.pullPaymentData
        );

      case 'archive':
        return await this.client.archivePullPayment(
          parameters.storeId,
          parameters.pullPaymentId
        );

      case 'linkBoltcard':
        return await this.client.linkBoltcard(
          parameters.pullPaymentId,
          parameters.boltcardData
        );

      case 'get':
        return await this.client.getPullPayment(parameters.pullPaymentId);

      case 'getPayouts':
        return await this.client.getPullPaymentPayouts(
          parameters.pullPaymentId,
          parameters.includeCancelled || false
        );

      case 'createPayout':
        return await this.client.createPayout(
          parameters.pullPaymentId,
          parameters.payoutData
        );

      case 'getPayout':
        return await this.client.getPayout(
          parameters.pullPaymentId,
          parameters.payoutId
        );

      case 'getLNURL':
        return await this.client.getPullPaymentLNURL(parameters.pullPaymentId);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}