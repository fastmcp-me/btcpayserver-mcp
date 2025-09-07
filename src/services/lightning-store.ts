import { BaseService, ServiceInfo } from './base-service.js';

export class LightningStoreService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'lightning-store',
      description: 'Lightning Store operations - store-specific Lightning Network node management',
      category: 'lightning',
      methods: [
        {
          name: 'getNodeInfo',
          description: 'Get store Lightning node information',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query (e.g., BTC)',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get store node info',
              description: 'Get Bitcoin Lightning node information for a store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getNodeBalance',
          description: 'Get store Lightning node balance',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get store node balance',
              description: 'Get on-chain and off-chain balance for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getNodeHistogram',
          description: 'Get store Lightning node balance histogram',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get store balance histogram',
              description: 'Get weekly balance histogram for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'connectToNode',
          description: 'Connect to another Lightning node',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            nodeURI: {
              type: 'string',
              description: 'Node URI in the form pubkey@endpoint[:port]',
              required: true
            }
          },
          examples: [
            {
              name: 'Connect store to peer',
              description: 'Connect store Lightning node to another node',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                nodeURI: '03abcd1234@ln.example.com:9735'
              }
            }
          ]
        },
        {
          name: 'getChannels',
          description: 'Get store Lightning node channels',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'List store channels',
              description: 'Get all Lightning channels for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'openChannel',
          description: 'Open a Lightning channel',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            nodeURI: {
              type: 'string',
              description: 'Node URI to open channel with',
              required: true
            },
            channelAmount: {
              type: 'string',
              description: 'The amount to fund (in satoshi)',
              required: true
            },
            feeRate: {
              type: 'number',
              description: 'The fee rate (in satoshi per byte)',
              required: false
            }
          },
          examples: [
            {
              name: 'Open store channel',
              description: 'Open a Lightning channel from store node',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                nodeURI: '03abcd1234@ln.example.com:9735',
                channelAmount: '1000000',
                feeRate: 10
              }
            }
          ]
        },
        {
          name: 'getDepositAddress',
          description: 'Get on-chain deposit address',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get store deposit address',
              description: 'Get an on-chain address for funding the store Lightning node',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getPayment',
          description: 'Get Lightning payment details',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            paymentHash: {
              type: 'string',
              description: 'The payment hash of the Lightning payment',
              required: true
            }
          },
          examples: [
            {
              name: 'Get store payment status',
              description: 'Check the status of a store Lightning payment',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                paymentHash: 'abcd1234...'
              }
            }
          ]
        },
        {
          name: 'getInvoice',
          description: 'Get Lightning invoice details',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            invoiceId: {
              type: 'string',
              description: 'The ID of the Lightning invoice',
              required: true
            }
          },
          examples: [
            {
              name: 'Get store invoice details',
              description: 'Get details of a specific store Lightning invoice',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                invoiceId: 'inv_123456'
              }
            }
          ]
        },
        {
          name: 'payInvoice',
          description: 'Pay Lightning invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            bolt11: {
              type: 'string',
              description: 'The BOLT11 invoice to pay',
              required: true
            },
            amount: {
              type: 'string',
              description: 'Optional explicit payment amount in millisatoshi',
              required: false
            },
            maxFeePercent: {
              type: 'string',
              description: 'Fee limit as percentage of payment amount',
              required: false
            },
            maxFeeFlat: {
              type: 'string',
              description: 'Fee limit as fixed amount in satoshi',
              required: false
            },
            sendTimeout: {
              type: 'number',
              description: 'Payment timeout in seconds',
              required: false,
              default: 30
            }
          },
          examples: [
            {
              name: 'Pay invoice from store',
              description: 'Pay a Lightning invoice from store node with fee limits',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                bolt11: 'lnbc100u1p3...',
                maxFeePercent: '1.0',
                sendTimeout: 60
              }
            }
          ]
        },
        {
          name: 'getInvoices',
          description: 'List Lightning invoices',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            pendingOnly: {
              type: 'boolean',
              description: 'Limit to pending invoices only',
              required: false,
              default: false
            },
            offsetIndex: {
              type: 'number',
              description: 'Index to start the list from',
              required: false,
              default: 0
            }
          },
          examples: [
            {
              name: 'List store invoices',
              description: 'Get all Lightning invoices for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            },
            {
              name: 'List pending store invoices',
              description: 'Get only pending Lightning invoices for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                pendingOnly: true
              }
            }
          ]
        },
        {
          name: 'createInvoice',
          description: 'Create Lightning invoice',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            amount: {
              type: 'string',
              description: 'Amount in millisatoshi (1000 millisatoshi = 1 satoshi)',
              required: true
            },
            description: {
              type: 'string',
              description: 'Description of the invoice',
              required: false
            },
            descriptionHashOnly: {
              type: 'boolean',
              description: 'Use description hash instead of full description',
              required: false,
              default: false
            },
            expiry: {
              type: 'number',
              description: 'Expiration time in seconds',
              required: true
            },
            privateRouteHints: {
              type: 'boolean',
              description: 'Include private route hints',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Create store invoice',
              description: 'Create a new Lightning invoice for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                amount: '100000',
                description: 'Payment for services',
                expiry: 3600
              }
            }
          ]
        },
        {
          name: 'getPayments',
          description: 'List Lightning payments',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            },
            includePending: {
              type: 'boolean',
              description: 'Include pending payments',
              required: false,
              default: false
            },
            offsetIndex: {
              type: 'number',
              description: 'Index to start the list from',
              required: false,
              default: 0
            }
          },
          examples: [
            {
              name: 'List store payments',
              description: 'Get all Lightning payments for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC'
              }
            },
            {
              name: 'List store payments with pending',
              description: 'Get payments including pending ones for store',
              parameters: {
                storeId: 'store123',
                cryptoCode: 'BTC',
                includePending: true
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getNodeInfo':
        return await this.client.getStoreLightningInfo(parameters.storeId, parameters.cryptoCode);

      case 'getNodeBalance':
        return await this.client.getStoreLightningBalance(parameters.storeId, parameters.cryptoCode);

      case 'getNodeHistogram':
        return await this.client.getStoreLightningHistogram(parameters.storeId, parameters.cryptoCode);

      case 'connectToNode':
        return await this.client.connectToStoreLightningNode(parameters.storeId, parameters.cryptoCode, {
          nodeURI: parameters.nodeURI
        });

      case 'getChannels':
        return await this.client.getStoreLightningChannels(parameters.storeId, parameters.cryptoCode);

      case 'openChannel':
        return await this.client.openStoreLightningChannel(parameters.storeId, parameters.cryptoCode, {
          nodeURI: parameters.nodeURI,
          channelAmount: parameters.channelAmount,
          feeRate: parameters.feeRate
        });

      case 'getDepositAddress':
        return await this.client.getStoreLightningDeposit(parameters.storeId, parameters.cryptoCode);

      case 'getPayment':
        return await this.client.getStoreLightningPayment(parameters.storeId, parameters.cryptoCode, parameters.paymentHash);

      case 'getInvoice':
        return await this.client.getStoreLightningInvoice(parameters.storeId, parameters.cryptoCode, parameters.invoiceId);

      case 'payInvoice':
        return await this.client.payStoreLightningInvoice(parameters.storeId, parameters.cryptoCode, {
          BOLT11: parameters.bolt11,
          amount: parameters.amount,
          maxFeePercent: parameters.maxFeePercent,
          maxFeeFlat: parameters.maxFeeFlat,
          sendTimeout: parameters.sendTimeout
        });

      case 'getInvoices':
        return await this.client.getStoreLightningInvoices(
          parameters.storeId,
          parameters.cryptoCode,
          parameters.pendingOnly,
          parameters.offsetIndex
        );

      case 'createInvoice':
        return await this.client.createStoreLightningInvoice(parameters.storeId, parameters.cryptoCode, {
          amount: parameters.amount,
          description: parameters.description,
          descriptionHashOnly: parameters.descriptionHashOnly,
          expiry: parameters.expiry,
          privateRouteHints: parameters.privateRouteHints
        });

      case 'getPayments':
        return await this.client.getStoreLightningPayments(
          parameters.storeId,
          parameters.cryptoCode,
          parameters.includePending,
          parameters.offsetIndex
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
