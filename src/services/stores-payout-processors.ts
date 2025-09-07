import { BaseService, ServiceInfo } from './base-service.js';

export class StoresPayoutProcessorsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-payout-processors',
      description: 'Store payout processors operations - manage automated payout processing configurations',
      category: 'store-management',
      methods: [
        {
          name: 'getPayoutProcessors',
          description: 'Get store configured payout processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get all payout processors',
              description: 'Get all configured payout processors for the store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'removePayoutProcessor',
          description: 'Remove store configured payout processor',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            processor: {
              type: 'string',
              description: 'The processor name',
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
              name: 'Remove processor',
              description: 'Remove a payout processor configuration',
              parameters: {
                storeId: 'store123',
                processor: 'OnChainAutomatedPayoutSenderFactory',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'getOnChainPayoutProcessors',
          description: 'Get configured store onchain automated payout processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
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
              name: 'Get onchain processors',
              description: 'Get onchain automated payout processors',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'updateOnChainPayoutProcessors',
          description: 'Update configured store onchain automated payout processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            paymentMethodId: {
              type: 'string',
              description: 'Payment method ID (e.g., BTC-CHAIN)',
              required: true
            },
            feeTargetBlock: {
              type: 'number',
              description: 'How many blocks should the fee rate calculation target to confirm in',
              required: false
            },
            intervalSeconds: {
              type: 'number',
              description: 'How often should the processor run (in seconds)',
              required: true
            },
            threshold: {
              type: 'string',
              description: 'Only process payouts when this payout sum is reached',
              required: true
            },
            processNewPayoutsInstantly: {
              type: 'boolean',
              description: 'Skip the interval when an eligible payout has been approved',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Configure onchain processor',
              description: 'Configure automated onchain payout processing',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                feeTargetBlock: 6,
                intervalSeconds: 3600,
                threshold: '0.001',
                processNewPayoutsInstantly: true
              }
            }
          ]
        },
        {
          name: 'getLightningPayoutProcessors',
          description: 'Get configured store Lightning automated payout processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutMethodId: {
              type: 'string',
              description: 'Payout method ID (e.g., BTC-LN)',
              required: true
            }
          },
          examples: [
            {
              name: 'Get Lightning processors',
              description: 'Get Lightning automated payout processors',
              parameters: {
                storeId: 'store123',
                payoutMethodId: 'BTC-LN'
              }
            }
          ]
        },
        {
          name: 'updateLightningPayoutProcessors',
          description: 'Update configured store Lightning automated payout processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            payoutMethodId: {
              type: 'string',
              description: 'Payout method ID (e.g., BTC-LN)',
              required: true
            },
            intervalSeconds: {
              type: 'number',
              description: 'How often should the processor run (in seconds)',
              required: true
            },
            cancelPayoutAfterFailures: {
              type: 'number',
              description: 'How many failures should the processor tolerate before cancelling the payout',
              required: false
            },
            processNewPayoutsInstantly: {
              type: 'boolean',
              description: 'Skip the interval when an eligible payout has been approved',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Configure Lightning processor',
              description: 'Configure automated Lightning payout processing',
              parameters: {
                storeId: 'store123',
                payoutMethodId: 'BTC-LN',
                intervalSeconds: 1800,
                cancelPayoutAfterFailures: 3,
                processNewPayoutsInstantly: true
              }
            }
          ]
        },
        {
          name: 'getOnChainTransferProcessors',
          description: 'Get configured store onchain automated transfer processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get transfer processors',
              description: 'Get onchain automated transfer processors',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'updateOnChainTransferProcessors',
          description: 'Update configured store onchain automated transfer processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            feeTargetBlock: {
              type: 'number',
              description: 'How many blocks should the fee rate calculation target to confirm in',
              required: false
            },
            intervalSeconds: {
              type: 'number',
              description: 'How often should the processor run (in seconds)',
              required: true
            },
            threshold: {
              type: 'string',
              description: 'Only process payouts when this payout sum is reached',
              required: true
            },
            processNewPayoutsInstantly: {
              type: 'boolean',
              description: 'Skip the interval when an eligible payout has been approved',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Configure transfer processor',
              description: 'Configure automated onchain transfer processing',
              parameters: {
                storeId: 'store123',
                feeTargetBlock: 12,
                intervalSeconds: 7200,
                threshold: '0.01',
                processNewPayoutsInstantly: false
              }
            }
          ]
        },
        {
          name: 'getLightningTransferProcessors',
          description: 'Get configured store Lightning automated transfer processors',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get Lightning transfer processors',
              description: 'Get Lightning automated transfer processors',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getPayoutProcessors':
        return await this.client.getStorePayoutProcessors(parameters.storeId);

      case 'removePayoutProcessor':
        return await this.client.removeStorePayoutProcessor(
          parameters.storeId,
          parameters.processor,
          parameters.paymentMethodId
        );

      case 'getOnChainPayoutProcessors':
        return await this.client.getStoreOnChainPayoutProcessors(
          parameters.storeId,
          parameters.paymentMethodId
        );

      case 'updateOnChainPayoutProcessors':
        return await this.client.updateStoreOnChainPayoutProcessors(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.feeTargetBlock,
          parameters.intervalSeconds,
          parameters.threshold,
          parameters.processNewPayoutsInstantly
        );

      case 'getLightningPayoutProcessors':
        return await this.client.getStoreLightningPayoutProcessors(
          parameters.storeId,
          parameters.payoutMethodId
        );

      case 'updateLightningPayoutProcessors':
        return await this.client.updateStoreLightningPayoutProcessors(
          parameters.storeId,
          parameters.payoutMethodId,
          parameters.intervalSeconds,
          parameters.cancelPayoutAfterFailures,
          parameters.processNewPayoutsInstantly
        );

      case 'getOnChainTransferProcessors':
        return await this.client.getStoreOnChainTransferProcessors(parameters.storeId);

      case 'updateOnChainTransferProcessors':
        return await this.client.updateStoreOnChainTransferProcessors(
          parameters.storeId,
          parameters.feeTargetBlock,
          parameters.intervalSeconds,
          parameters.threshold,
          parameters.processNewPayoutsInstantly
        );

      case 'getLightningTransferProcessors':
        return await this.client.getStoreLightningTransferProcessors(parameters.storeId);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
