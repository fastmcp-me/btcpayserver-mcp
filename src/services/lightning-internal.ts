import { BaseService, ServiceInfo } from './base-service.js';

export class LightningInternalService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'lightning-internal',
      description: 'Lightning Internal Node operations - server-level Lightning Network node management',
      category: 'lightning',
      methods: [
        {
          name: 'getNodeInfo',
          description: 'Get Lightning node information',
          parameters: {
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query (e.g., BTC)',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get BTC node info',
              description: 'Get Bitcoin Lightning node information',
              parameters: {
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getNodeBalance',
          description: 'Get Lightning node balance',
          parameters: {
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get node balance',
              description: 'Get on-chain and off-chain balance',
              parameters: {
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getNodeHistogram',
          description: 'Get Lightning node balance histogram',
          parameters: {
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get balance histogram',
              description: 'Get weekly balance histogram',
              parameters: {
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'connectToNode',
          description: 'Connect to another Lightning node',
          parameters: {
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
              name: 'Connect to peer',
              description: 'Connect to another Lightning node',
              parameters: {
                cryptoCode: 'BTC',
                nodeURI: '03abcd1234@ln.example.com:9735'
              }
            }
          ]
        },
        {
          name: 'getChannels',
          description: 'Get Lightning node channels',
          parameters: {
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'List channels',
              description: 'Get all Lightning channels',
              parameters: {
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'openChannel',
          description: 'Open a Lightning channel',
          parameters: {
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
              name: 'Open channel',
              description: 'Open a Lightning channel with another node',
              parameters: {
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
            cryptoCode: {
              type: 'string',
              description: 'The cryptoCode of the lightning-node to query',
              required: true,
              default: 'BTC'
            }
          },
          examples: [
            {
              name: 'Get deposit address',
              description: 'Get an on-chain address for funding the Lightning node',
              parameters: {
                cryptoCode: 'BTC'
              }
            }
          ]
        },
        {
          name: 'getPayment',
          description: 'Get Lightning payment details',
          parameters: {
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
              name: 'Get payment status',
              description: 'Check the status of a Lightning payment',
              parameters: {
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
              name: 'Get invoice details',
              description: 'Get details of a specific Lightning invoice',
              parameters: {
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
              name: 'Pay invoice',
              description: 'Pay a Lightning invoice with fee limits',
              parameters: {
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
              name: 'List all invoices',
              description: 'Get all Lightning invoices',
              parameters: {
                cryptoCode: 'BTC'
              }
            },
            {
              name: 'List pending invoices',
              description: 'Get only pending Lightning invoices',
              parameters: {
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
              name: 'Create invoice',
              description: 'Create a new Lightning invoice',
              parameters: {
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
              name: 'List all payments',
              description: 'Get all Lightning payments',
              parameters: {
                cryptoCode: 'BTC'
              }
            },
            {
              name: 'List with pending',
              description: 'Get payments including pending ones',
              parameters: {
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
        return await this.client.getInternalLightningInfo(parameters.cryptoCode);

      case 'getNodeBalance':
        return await this.client.getInternalLightningBalance(parameters.cryptoCode);

      case 'getNodeHistogram':
        return await this.client.getInternalLightningHistogram(parameters.cryptoCode);

      case 'connectToNode':
        return await this.client.connectToInternalLightningNode(parameters.cryptoCode, parameters.nodeURI);

      case 'getChannels':
        return await this.client.getInternalLightningChannels(parameters.cryptoCode);

      case 'openChannel':
        return await this.client.openInternalLightningChannel(
          parameters.cryptoCode,
          parameters.nodeURI,
          parameters.channelAmount,
          parameters.feeRate
        );

      case 'getDepositAddress':
        return await this.client.getInternalLightningDeposit(parameters.cryptoCode);

      case 'getPayment':
        return await this.client.getInternalLightningPayment(parameters.cryptoCode, parameters.paymentHash);

      case 'getInvoice':
        return await this.client.getInternalLightningInvoice(parameters.cryptoCode, parameters.invoiceId);

      case 'payInvoice':
        return await this.client.payInternalLightningInvoice(
          parameters.cryptoCode,
          parameters.bolt11,
          parameters.amount,
          parameters.maxFeePercent,
          parameters.maxFeeFlat,
          parameters.sendTimeout
        );

      case 'getInvoices':
        return await this.client.getInternalLightningInvoices(
          parameters.cryptoCode,
          parameters.pendingOnly,
          parameters.offsetIndex
        );

      case 'createInvoice':
        return await this.client.createInternalLightningInvoice(
          parameters.cryptoCode,
          parameters.amount,
          parameters.description,
          parameters.descriptionHashOnly,
          parameters.expiry,
          parameters.privateRouteHints
        );

      case 'getPayments':
        return await this.client.getInternalLightningPayments(
          parameters.cryptoCode,
          parameters.includePending,
          parameters.offsetIndex
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
