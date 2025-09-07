import { BaseService, ServiceInfo } from './base-service.js';

export class StoresRatesService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-rates',
      description: 'Store rates operations - manage exchange rates and rate configurations',
      category: 'store-management',
      methods: [
        {
          name: 'getRates',
          description: 'Get rates on the store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            currencyPair: {
              type: 'array',
              description: 'The currency pairs to fetch rates for (e.g., ["BTC_USD", "BTC_EUR"])',
              required: false
            }
          },
          examples: [
            {
              name: 'Get all rates',
              description: 'Get all available exchange rates for the store',
              parameters: {
                storeId: 'store123'
              }
            },
            {
              name: 'Get specific currency rates',
              description: 'Get rates for specific currency pairs',
              parameters: {
                storeId: 'store123',
                currencyPair: ['BTC_USD', 'BTC_EUR', 'BTC_JPY']
              }
            }
          ]
        },
        {
          name: 'getRateConfiguration',
          description: 'Get store rate settings for the specified rate source',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            rateSource: {
              type: 'string',
              description: 'The rate source to configure (primary or fallback)',
              required: true,
              default: 'primary'
            }
          },
          examples: [
            {
              name: 'Get primary rate config',
              description: 'Get primary rate source configuration',
              parameters: {
                storeId: 'store123',
                rateSource: 'primary'
              }
            },
            {
              name: 'Get fallback rate config',
              description: 'Get fallback rate source configuration',
              parameters: {
                storeId: 'store123',
                rateSource: 'fallback'
              }
            }
          ]
        },
        {
          name: 'updateRateConfiguration',
          description: 'Update rate settings for the specified store and rate source',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            rateSource: {
              type: 'string',
              description: 'The rate source to configure (primary or fallback)',
              required: true,
              default: 'primary'
            },
            spread: {
              type: 'string',
              description: 'A spread applies to the rate fetched in %. Must be >= 0 or <= 100',
              required: false
            },
            preferredSource: {
              type: 'string',
              description: 'When isCustomScript is false, uses this source in the default script',
              required: false
            },
            isCustomScript: {
              type: 'boolean',
              description: 'Whether to use preferredSource with default script or a custom script',
              required: false
            },
            effectiveScript: {
              type: 'string',
              description: 'Custom script used to calculate exchange rates (when isCustomScript is true)',
              required: false
            }
          },
          examples: [
            {
              name: 'Set custom rate script',
              description: 'Configure a custom rate calculation script',
              parameters: {
                storeId: 'store123',
                rateSource: 'primary',
                spread: '2.5',
                isCustomScript: true,
                effectiveScript: 'coinbase(X_Y) * 1.025'
              }
            },
            {
              name: 'Use preferred source',
              description: 'Configure using a preferred rate source',
              parameters: {
                storeId: 'store123',
                rateSource: 'primary',
                spread: '1.0',
                preferredSource: 'kraken',
                isCustomScript: false
              }
            }
          ]
        },
        {
          name: 'previewRateConfiguration',
          description: 'Preview rate configuration results before applying them',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            currencyPair: {
              type: 'array',
              description: 'The currency pairs to preview',
              required: false
            },
            spread: {
              type: 'string',
              description: 'A spread applies to the rate fetched in %. Must be >= 0 or <= 100',
              required: false
            },
            preferredSource: {
              type: 'string',
              description: 'When isCustomScript is false, uses this source in the default script',
              required: false
            },
            isCustomScript: {
              type: 'boolean',
              description: 'Whether to use preferredSource with default script or a custom script',
              required: false
            },
            effectiveScript: {
              type: 'string',
              description: 'Custom script used to calculate exchange rates (when isCustomScript is true)',
              required: false
            }
          },
          examples: [
            {
              name: 'Preview custom script',
              description: 'Preview results of a custom rate script',
              parameters: {
                storeId: 'store123',
                currencyPair: ['BTC_USD'],
                spread: '3.0',
                isCustomScript: true,
                effectiveScript: 'binance(X_Y) * 1.03'
              }
            },
            {
              name: 'Preview rate source change',
              description: 'Preview switching to a different rate source',
              parameters: {
                storeId: 'store123',
                currencyPair: ['BTC_USD', 'BTC_EUR'],
                spread: '1.5',
                preferredSource: 'coinbase',
                isCustomScript: false
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getRates':
        return await this.client.getStoreRates(parameters.storeId, parameters.currencyPair);

      case 'getRateConfiguration':
        return await this.client.getStoreRateConfiguration(
          parameters.storeId,
          parameters.rateSource || 'primary'
        );

      case 'updateRateConfiguration':
        return await this.client.updateStoreRateConfiguration(
          parameters.storeId,
          parameters.rateSource || 'primary',
          parameters.spread,
          parameters.preferredSource,
          parameters.isCustomScript,
          parameters.effectiveScript
        );

      case 'previewRateConfiguration':
        return await this.client.previewStoreRateConfiguration(
          parameters.storeId,
          parameters.currencyPair,
          parameters.spread,
          parameters.preferredSource,
          parameters.isCustomScript,
          parameters.effectiveScript
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
