import { BaseService, ServiceInfo } from './base-service.js';

export class StoresWalletService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-wallet',
      description: 'Store wallet (on-chain) operations - manage wallet balance, transactions, addresses, and UTXOs',
      category: 'store-management',
      methods: [
        {
          name: 'getWalletOverview',
          description: 'Get store on-chain wallet overview',
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
              name: 'Get Bitcoin wallet overview',
              description: 'Get Bitcoin wallet balance information',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'getWalletHistogram',
          description: 'Get store on-chain wallet balance histogram',
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
              name: 'Get wallet histogram',
              description: 'Get wallet balance histogram over time',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'getWalletFeeRate',
          description: 'Get store on-chain wallet fee rate',
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
            blockTarget: {
              type: 'number',
              description: 'Number of blocks away for confirmation target',
              required: false
            }
          },
          examples: [
            {
              name: 'Get current fee rate',
              description: 'Get recommended fee rate for transactions',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                blockTarget: 6
              }
            }
          ]
        },
        {
          name: 'getWalletAddress',
          description: 'Get or generate address for wallet',
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
            forceGenerate: {
              type: 'boolean',
              description: 'Generate a new address even if previous one was not used',
              required: false,
              default: false
            }
          },
          examples: [
            {
              name: 'Get wallet address',
              description: 'Get a receiving address for the wallet',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'unreserveWalletAddress',
          description: 'Unreserve last store on-chain wallet address',
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
              name: 'Unreserve address',
              description: 'Unreserve the last generated address',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'getWalletTransactions',
          description: 'Get store on-chain wallet transactions',
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
            labelFilter: {
              type: 'string',
              description: 'Transaction label to filter by',
              required: false
            },
            limit: {
              type: 'number',
              description: 'Maximum number of transactions to return',
              required: false
            },
            skip: {
              type: 'number',
              description: 'Number of transactions to skip from the start',
              required: false
            },
            statusFilter: {
              type: 'array',
              description: 'Statuses to filter the transactions with',
              required: false
            }
          },
          examples: [
            {
              name: 'Get recent transactions',
              description: 'Get the last 10 confirmed transactions',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                limit: 10,
                statusFilter: ['Confirmed']
              }
            }
          ]
        },
        {
          name: 'createWalletTransaction',
          description: 'Create store on-chain wallet transaction',
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
            destinations: {
              type: 'array',
              description: 'Array of destination objects with address and amount',
              required: true
            },
            feerate: {
              type: 'number',
              description: 'Transaction fee rate',
              required: false
            },
            proceedWithPayjoin: {
              type: 'boolean',
              description: 'Whether to attempt BIP78 payjoin',
              required: false,
              default: true
            },
            proceedWithBroadcast: {
              type: 'boolean',
              description: 'Whether to broadcast the transaction after creating',
              required: false,
              default: true
            },
            noChange: {
              type: 'boolean',
              description: 'Send all spent coins to destinations',
              required: false,
              default: false
            },
            rbf: {
              type: 'boolean',
              description: 'Enable RBF for the transaction',
              required: false
            }
          },
          examples: [
            {
              name: 'Send Bitcoin transaction',
              description: 'Create and broadcast a Bitcoin transaction',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                destinations: [
                  {
                    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
                    amount: '0.001'
                  }
                ],
                feerate: 10
              }
            }
          ]
        },
        {
          name: 'getWalletTransaction',
          description: 'Get store on-chain wallet transaction',
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
            transactionId: {
              type: 'string',
              description: 'The transaction id to fetch',
              required: true
            }
          },
          examples: [
            {
              name: 'Get transaction details',
              description: 'Get details of a specific transaction',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                transactionId: 'abc123...'
              }
            }
          ]
        },
        {
          name: 'updateWalletTransaction',
          description: 'Update store on-chain wallet transaction info',
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
            transactionId: {
              type: 'string',
              description: 'The transaction id to update',
              required: true
            },
            comment: {
              type: 'string',
              description: 'Transaction comment',
              required: false
            },
            labels: {
              type: 'array',
              description: 'Transaction labels',
              required: false
            },
            force: {
              type: 'boolean',
              description: 'Update even if transaction does not exist yet',
              required: false
            }
          },
          examples: [
            {
              name: 'Add comment to transaction',
              description: 'Add a comment to a transaction',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                transactionId: 'abc123...',
                comment: 'Payment to supplier'
              }
            }
          ]
        },
        {
          name: 'getWalletUTXOs',
          description: 'Get store on-chain wallet UTXOs',
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
              name: 'Get wallet UTXOs',
              description: 'Get all unspent transaction outputs',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN'
              }
            }
          ]
        },
        {
          name: 'generateWallet',
          description: 'Generate a wallet and update store payment method',
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
            label: {
              type: 'string',
              description: 'A label for the wallet',
              required: false
            },
            existingMnemonic: {
              type: 'string',
              description: 'A BIP39 mnemonic',
              required: false
            },
            passphrase: {
              type: 'string',
              description: 'A passphrase for the BIP39 mnemonic seed',
              required: false
            },
            accountNumber: {
              type: 'number',
              description: 'The account to derive from the BIP39 mnemonic seed',
              required: false,
              default: 0
            },
            savePrivateKeys: {
              type: 'boolean',
              description: 'Whether to store the seed inside BTCPay Server',
              required: false,
              default: false
            },
            importKeysToRPC: {
              type: 'boolean',
              description: 'Whether to import addresses to the underlying node wallet',
              required: false,
              default: false
            },
            wordList: {
              type: 'string',
              description: 'Word list for mnemonic generation',
              required: false,
              default: 'English'
            },
            wordCount: {
              type: 'number',
              description: 'Word count for mnemonic generation',
              required: false,
              default: 12
            },
            scriptPubKeyType: {
              type: 'string',
              description: 'The type of wallet to generate',
              required: false,
              default: 'Segwit'
            }
          },
          examples: [
            {
              name: 'Generate new wallet',
              description: 'Generate a new Bitcoin wallet for the store',
              parameters: {
                storeId: 'store123',
                paymentMethodId: 'BTC-CHAIN',
                label: 'Store Main Wallet',
                savePrivateKeys: true,
                scriptPubKeyType: 'Segwit'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getWalletOverview':
        return await this.client.getStoreWalletOverview(parameters.storeId, parameters.paymentMethodId);

      case 'getWalletHistogram':
        return await this.client.getStoreWalletHistogram(parameters.storeId, parameters.paymentMethodId);

      case 'getWalletFeeRate':
        return await this.client.getStoreWalletFeeRate(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.blockTarget
        );

      case 'getWalletAddress':
        return await this.client.getStoreWalletAddress(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.forceGenerate
        );

      case 'unreserveWalletAddress':
        return await this.client.unreserveStoreWalletAddress(parameters.storeId, parameters.paymentMethodId);

      case 'getWalletTransactions':
        return await this.client.getStoreWalletTransactions(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.labelFilter,
          parameters.limit,
          parameters.skip,
          parameters.statusFilter
        );

      case 'createWalletTransaction':
        return await this.client.createStoreWalletTransaction(
          parameters.storeId,
          parameters.paymentMethodId,
          {
            destinations: parameters.destinations,
            feerate: parameters.feerate,
            proceedWithPayjoin: parameters.proceedWithPayjoin,
            proceedWithBroadcast: parameters.proceedWithBroadcast,
            noChange: parameters.noChange,
            rbf: parameters.rbf,
            excludeUnconfirmed: parameters.excludeUnconfirmed,
            selectedInputs: parameters.selectedInputs
          }
        );

      case 'getWalletTransaction':
        return await this.client.getStoreWalletTransaction(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.transactionId
        );

      case 'updateWalletTransaction':
        return await this.client.updateStoreWalletTransaction(
          parameters.storeId,
          parameters.paymentMethodId,
          parameters.transactionId,
          {
            comment: parameters.comment,
            labels: parameters.labels
          },
          parameters.force
        );

      case 'getWalletUTXOs':
        return await this.client.getStoreWalletUTXOs(parameters.storeId, parameters.paymentMethodId);

      case 'generateWallet':
        return await this.client.generateStoreWallet(
          parameters.storeId,
          parameters.paymentMethodId,
          {
            label: parameters.label,
            existingMnemonic: parameters.existingMnemonic,
            passphrase: parameters.passphrase,
            accountNumber: parameters.accountNumber,
            savePrivateKeys: parameters.savePrivateKeys,
            importKeysToRPC: parameters.importKeysToRPC,
            wordList: parameters.wordList,
            wordCount: parameters.wordCount,
            scriptPubKeyType: parameters.scriptPubKeyType
          }
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}