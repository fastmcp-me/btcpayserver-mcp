import { BaseService, ServiceInfo } from './base-service.js';

export class StoresPayoutsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-payouts',
      description: 'Store payouts operations - manage pull payment payouts, approvals, and state changes',
      category: 'store-management',
      methods: [
        {
          name: 'createPayout',
          description: 'Create a new payout',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            destination: {
              type: 'string',
              description: 'The destination of the payout (can be an address or a BIP21 url)',
              required: true
            },
            amount: {
              type: 'string',
              description: 'The amount of the payout in the currency of the pull payment (eg. USD)',
              required: true
            },
            payoutMethodId: {
              type: 'string',
              description: 'Payout method ID (BTC-CHAIN, BTC-LN)',
              required: true
            },
            pullPaymentId: {
              type: 'string',
              description: 'The pull payment to create this for (optional)',
              required: false
            },
            approved: {
              type: 'boolean',
              description: 'Whether to approve this payout automatically upon creation',
              required: false
            },
            metadata: {
              type: 'object',
              description: 'Additional metadata to store with the payout',
              required: false
            }
          },
          examples: [
            {
              name: 'Create Bitcoin payout',
              description: 'Create a new Bitcoin on-chain payout',
              parameters: {
                storeId: 'store123',
                destination: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
                amount: '100.50',
                payoutMethodId: 'BTC-CHAIN',
                approved: true
              }
            },
            {
              name: 'Create Lightning payout',
              description: 'Create a new Lightning Network payout',
              parameters: {
                storeId: 'store123',
                destination: 'lnbc100u1p3...',
                amount: '25.00',
                payoutMethodId: 'BTC-LN',
                pullPaymentId: 'pullpay123',
                metadata: {
                  source: 'API payout',
                  note: 'Weekly payment'
                }
              }
            }
          ]
        },
        {
          name: 'getPayouts',
          description: 'Get store payouts',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
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
              name: 'Get all payouts',
              description: 'Get all payouts for the store',
              parameters: {
                storeId: 'store123'
              }
            },
            {
              name: 'Get payouts including cancelled',
              description: 'Get all payouts including cancelled ones',
              parameters: {
                storeId: 'store123',
                includeCancelled: true
              }
            }
          ]
        },
        {
          name: 'getPayout',
          description: 'Get specific payout',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'The ID of the payout',
              required: true
            }
          },
          examples: [
            {
              name: 'Get payout details',
              description: 'Get details of a specific payout',
              parameters: {
                storeId: 'store123',
                payoutId: 'payout456'
              }
            }
          ]
        },
        {
          name: 'approvePayout',
          description: 'Approve a payout',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'The ID of the payout',
              required: true
            },
            revision: {
              type: 'number',
              description: 'The revision number of the payout being modified',
              required: true
            },
            rateRule: {
              type: 'string',
              description: 'The rate rule to calculate the rate of the payout',
              required: false
            }
          },
          examples: [
            {
              name: 'Approve payout',
              description: 'Approve a payout for processing',
              parameters: {
                storeId: 'store123',
                payoutId: 'payout456',
                revision: 0,
                rateRule: 'kraken(BTC_USD)'
              }
            }
          ]
        },
        {
          name: 'cancelPayout',
          description: 'Cancel the payout',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'The ID of the payout',
              required: true
            }
          },
          examples: [
            {
              name: 'Cancel payout',
              description: 'Cancel a pending payout',
              parameters: {
                storeId: 'store123',
                payoutId: 'payout456'
              }
            }
          ]
        },
        {
          name: 'markPayoutPaid',
          description: 'Mark a payout as paid',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'The ID of the payout',
              required: true
            }
          },
          examples: [
            {
              name: 'Mark payout as paid',
              description: 'Mark a payout as completed/paid',
              parameters: {
                storeId: 'store123',
                payoutId: 'payout456'
              }
            }
          ]
        },
        {
          name: 'markPayout',
          description: 'Mark a payout with a specific state',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutId: {
              type: 'string',
              description: 'The ID of the payout',
              required: true
            },
            state: {
              type: 'string',
              description: 'The state of the payout (AwaitingApproval, AwaitingPayment, InProgress, Completed, Cancelled)',
              required: true
            },
            paymentProof: {
              type: 'object',
              description: 'Additional information about how the payout is being paid out',
              required: false
            }
          },
          examples: [
            {
              name: 'Mark payout in progress',
              description: 'Mark a payout as in progress with payment proof',
              parameters: {
                storeId: 'store123',
                payoutId: 'payout456',
                state: 'InProgress',
                paymentProof: {
                  id: 'tx123',
                  proofType: 'transaction'
                }
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'createPayout':
        return await this.client.createStorePayout(
          parameters.storeId,
          parameters.destination,
          parameters.amount,
          parameters.payoutMethodId,
          parameters.pullPaymentId,
          parameters.approved,
          parameters.metadata
        );

      case 'getPayouts':
        return await this.client.getStorePayouts(
          parameters.storeId,
          parameters.includeCancelled
        );

      case 'getPayout':
        return await this.client.getStorePayout(parameters.storeId, parameters.payoutId);

      case 'approvePayout':
        return await this.client.approveStorePayout(
          parameters.storeId,
          parameters.payoutId,
          parameters.revision,
          parameters.rateRule
        );

      case 'cancelPayout':
        return await this.client.cancelStorePayout(parameters.storeId, parameters.payoutId);

      case 'markPayoutPaid':
        return await this.client.markStorePayoutPaid(parameters.storeId, parameters.payoutId);

      case 'markPayout':
        return await this.client.markStorePayout(
          parameters.storeId,
          parameters.payoutId,
          parameters.state,
          parameters.paymentProof
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
