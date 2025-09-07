import { BaseService, ServiceInfo } from './base-service.js';

export class AppsService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'apps',
      description: 'Manage BTCPayServer apps - create, get, update, delete Point-of-Sale and Crowdfund applications with comprehensive features',
      category: 'applications',
      methods: [
        {
          name: 'listAll',
          description: 'List all apps for all stores',
          parameters: {},
          examples: [
            {
              name: 'List all apps',
              description: 'Get all apps across all stores',
              parameters: {}
            }
          ]
        },
        {
          name: 'listStore',
          description: 'List all apps for a specific store',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'List store apps',
              description: 'Get all apps for a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'get',
          description: 'Get basic app data',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get app info',
              description: 'Get basic app information',
              parameters: {
                appId: 'app_123'
              }
            }
          ]
        },
        {
          name: 'delete',
          description: 'Delete an app',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete app',
              description: 'Remove an app completely',
              parameters: {
                appId: 'app_123'
              }
            }
          ]
        },
        {
          name: 'uploadImage',
          description: 'Upload an image for an app',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            },
            fileData: {
              type: 'object',
              description: 'FormData object containing the image file',
              required: true
            }
          },
          examples: [
            {
              name: 'Upload app image',
              description: 'Upload an image for app branding',
              parameters: {
                appId: 'app_123',
                fileData: 'FormData with image file'
              }
            }
          ]
        },
        {
          name: 'deleteImage',
          description: 'Delete an app image',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            },
            fileId: {
              type: 'string',
              description: 'File ID to delete',
              required: true
            }
          },
          examples: [
            {
              name: 'Delete app image',
              description: 'Remove an app image',
              parameters: {
                appId: 'app_123',
                fileId: 'file_456'
              }
            }
          ]
        },
        {
          name: 'getSalesStatistics',
          description: 'Get app sales statistics',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            },
            numberOfDays: {
              type: 'number',
              description: 'Number of days to include in statistics',
              required: false,
              default: 7
            }
          },
          examples: [
            {
              name: 'Get sales stats',
              description: 'Get sales statistics for the last 30 days',
              parameters: {
                appId: 'app_123',
                numberOfDays: 30
              }
            }
          ]
        },
        {
          name: 'getTopItems',
          description: 'Get top-selling items for an app',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            },
            count: {
              type: 'number',
              description: 'Number of items to return',
              required: false,
              default: 5
            },
            offset: {
              type: 'number',
              description: 'Offset for pagination',
              required: false,
              default: 0
            }
          },
          examples: [
            {
              name: 'Get top items',
              description: 'Get top 10 selling items',
              parameters: {
                appId: 'app_123',
                count: 10
              }
            }
          ]
        },
        {
          name: 'createPos',
          description: 'Create a new Point-of-Sale app',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            appName: {
              type: 'string',
              description: 'Name given to the app when it was created',
              required: true
            },
            id: {
              type: 'string',
              description: 'Id of the app',
              required: false
            },
            title: {
              type: 'string',
              description: 'Display title of the app',
              required: false
            },
            description: {
              type: 'string',
              description: 'App description',
              required: false
            },
            defaultView: {
              type: 'string',
              description: 'App view type (Static, Cart, Light, Print)',
              required: false
            },
            showItems: {
              type: 'boolean',
              description: 'Display item selection for keypad',
              required: false
            },
            showCustomAmount: {
              type: 'boolean',
              description: 'Whether the option to enter a custom amount is shown',
              required: false
            },
            showDiscount: {
              type: 'boolean',
              description: 'Whether the option to enter a discount is shown',
              required: false
            },
            showSearch: {
              type: 'boolean',
              description: 'Display the search bar',
              required: false
            },
            showCategories: {
              type: 'boolean',
              description: 'Display the list of categories',
              required: false
            },
            enableTips: {
              type: 'boolean',
              description: 'Whether the option to enter a tip is shown',
              required: false
            },
            currency: {
              type: 'string',
              description: 'Currency used for the app',
              required: false
            },
            fixedAmountPayButtonText: {
              type: 'string',
              description: 'Payment button text template for items with a set price',
              required: false
            },
            customAmountPayButtonText: {
              type: 'string',
              description: 'Payment button text which appears for items which allow user to input a custom amount',
              required: false
            },
            tipText: {
              type: 'string',
              description: 'Prompt which appears next to the tip amount field if tipping is enabled',
              required: false
            },
            customTipPercentages: {
              type: 'array',
              description: 'Array of predefined tip percentage amounts',
              required: false
            },
            notificationUrl: {
              type: 'string',
              description: 'Callback notification url to POST to once when invoice is paid',
              required: false
            },
            redirectUrl: {
              type: 'string',
              description: 'URL user is redirected to once invoice is paid',
              required: false
            },
            redirectAutomatically: {
              type: 'boolean',
              description: 'Whether user is redirected to specified redirect URL automatically after the invoice is paid',
              required: false,
              default: false
            },
            htmlLang: {
              type: 'string',
              description: 'Used for SEO, the HTML Lang of the page',
              required: false
            },
            htmlMetaTags: {
              type: 'string',
              description: 'Used for SEO, the Meta tags of the page',
              required: false
            },
            formId: {
              type: 'string',
              description: 'Form ID to request customer data',
              required: false
            },
            template: {
              type: 'string',
              description: 'JSON of item available in the app',
              required: true,
              default: 'string'
            },
            archived: {
              type: 'boolean',
              description: 'If true, the app does not appear in the apps list by default',
              required: false
            }
          },
          examples: [
            {
              name: 'Create basic POS',
              description: 'Create a simple Point-of-Sale app',
              parameters: {
                storeId: 'store123',
                appName: 'Coffee Shop POS',
                id: 'coffee-shop-pos',
                title: 'Coffee Shop',
                description: 'Order coffee and pastries',
                defaultView: 'Cart',
                enableTips: true,
                currency: 'BTC',
                template: 'string',
                redirectAutomatically: false
              }
            },
            {
              name: 'Create advanced POS',
              description: 'Create a fully configured POS app',
              parameters: {
                storeId: 'store123',
                appName: 'Restaurant POS',
                id: 'restaurant-pos',
                title: 'Fine Dining Restaurant',
                description: 'Premium dining experience',
                defaultView: 'Cart',
                showItems: true,
                showCustomAmount: true,
                showDiscount: true,
                enableTips: true,
                currency: 'BTC',
                customTipPercentages: [15, 18, 20, 25],
                fixedAmountPayButtonText: 'Pay {0}',
                customAmountPayButtonText: 'Pay Amount',
                tipText: 'Service was great?',
                notificationUrl: 'https://myrestaurant.com/webhook',
                redirectUrl: 'https://myrestaurant.com/thankyou',
                template: 'string',
                redirectAutomatically: false
              }
            }
          ]
        },
        {
          name: 'getPos',
          description: 'Get Point-of-Sale app details',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get POS app',
              description: 'Retrieve POS app configuration',
              parameters: {
                appId: '3ki4jsAkN4u9rv1PUzj1odX4Nx7s'
              }
            }
          ]
        },
        {
          name: 'updatePos',
          description: 'Update Point-of-Sale app',
          parameters: {
            appId: {
              type: 'string',
              description: 'POS App ID',
              required: true
            },
            appName: {
              type: 'string',
              description: 'Name given to the app when it was created',
              required: false
            },
            title: {
              type: 'string',
              description: 'Display title of the app',
              required: false
            },
            description: {
              type: 'string',
              description: 'App description',
              required: false
            },
            defaultView: {
              type: 'string',
              description: 'App view type (Static, Cart, Light, Print)',
              required: false
            },
            enableTips: {
              type: 'boolean',
              description: 'Whether the option to enter a tip is shown',
              required: false
            },
            currency: {
              type: 'string',
              description: 'Currency used for the app',
              required: false
            },
            customTipPercentages: {
              type: 'array',
              description: 'Array of predefined tip percentage amounts',
              required: false
            },
            archived: {
              type: 'boolean',
              description: 'If true, the app does not appear in the apps list by default',
              required: false
            }
          },
          examples: [
            {
              name: 'Update POS settings',
              description: 'Update POS app configuration',
              parameters: {
                appId: 'pos_app_456',
                title: 'Updated Coffee Shop',
                enableTips: true,
                customTipPercentages: [18, 20, 22]
              }
            }
          ]
        },
        {
          name: 'createCrowdfund',
          description: 'Create a new Crowdfund app',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            appName: {
              type: 'string',
              description: 'Name given to the app when it was created',
              required: true
            },
            id: {
              type: 'string',
              description: 'Id of the app',
              required: false
            },
            title: {
              type: 'string',
              description: 'Display title of the app',
              required: false
            },
            description: {
              type: 'string',
              description: 'App description',
              required: false
            },
            enabled: {
              type: 'boolean',
              description: 'Whether the app is enabled to be viewed by everyone',
              required: false
            },
            enforceTargetAmount: {
              type: 'boolean',
              description: 'Whether contributions over the set target amount are allowed',
              required: false
            },
            startDate: {
              type: 'number',
              description: 'UNIX timestamp for crowdfund start time',
              required: false
            },
            endDate: {
              type: 'number',
              description: 'UNIX timestamp for crowdfund end time',
              required: false
            },
            targetCurrency: {
              type: 'string',
              description: 'Target currency for the crowdfund',
              required: false
            },
            targetAmount: {
              type: 'string',
              description: 'Target amount for the crowdfund',
              required: false
            },
            mainImageUrl: {
              type: 'string',
              description: 'URL for image used as a cover image for the app',
              required: false
            },
            notificationUrl: {
              type: 'string',
              description: 'Callback notification url to POST to once when invoice is paid',
              required: false
            },
            tagline: {
              type: 'string',
              description: 'Tagline for the app displayed to user',
              required: false
            },
            disqusEnabled: {
              type: 'boolean',
              description: 'Whether Disqus is enabled for the app',
              required: false
            },
            disqusShortname: {
              type: 'string',
              description: 'Disqus shortname to used for the app',
              required: false
            },
            soundsEnabled: {
              type: 'boolean',
              description: 'Whether sounds on new contributions are enabled',
              required: false
            },
            animationsEnabled: {
              type: 'boolean',
              description: 'Whether background animations on new contributions are enabled',
              required: false
            },
            resetEveryAmount: {
              type: 'string',
              description: 'Contribution goal reset frequency amount',
              required: false
            },
            resetEvery: {
              type: 'string',
              description: 'Contribution goal reset frequency',
              required: false
            },
            displayPerksValue: {
              type: 'boolean',
              description: 'Whether perk values are displayed',
              required: false
            },
            sortPerksByPopularity: {
              type: 'boolean',
              description: 'Whether perks are sorted by popularity',
              required: false
            },
            sounds: {
              type: 'array',
              description: 'Array of custom sounds which can be used on new contributions',
              required: false
            },
            animationColors: {
              type: 'array',
              description: 'Array of custom HEX colors which can be used for background animations',
              required: false
            },
            htmlLang: {
              type: 'string',
              description: 'Used for SEO, the HTML Lang of the page',
              required: false
            },
            htmlMetaTags: {
              type: 'string',
              description: 'Used for SEO, the Meta tags of the page',
              required: false
            },
            formId: {
              type: 'string',
              description: 'Form ID to request customer data',
              required: false
            },
            perksTemplate: {
              type: 'string',
              description: 'JSON of perks available in the app',
              required: true,
              default: 'string'
            },
            archived: {
              type: 'boolean',
              description: 'If true, the app does not appear in the apps list by default',
              required: false
            }
          },
          examples: [
            {
              name: 'Create project crowdfund',
              description: 'Create a crowdfunding campaign',
              parameters: {
                storeId: 'store123',
                appName: 'Open Source Project',
                id: 'open-source-project',
                title: 'Fund Our Development',
                description: 'Help us build amazing open source software',
                targetCurrency: 'BTC',
                targetAmount: '420.69',
                enabled: true,
                tagline: 'Support innovation',
                perksTemplate: 'string'
              }
            },
            {
              name: 'Create charity crowdfund',
              description: 'Create a charity fundraising campaign',
              parameters: {
                storeId: 'store123',
                appName: 'Charity Drive',
                id: 'charity-drive',
                title: 'Help Those in Need',
                description: 'Supporting local families during difficult times',
                targetCurrency: 'BTC',
                targetAmount: '25.0',
                enabled: true,
                enforceTargetAmount: false,
                animationsEnabled: true,
                soundsEnabled: true,
                disqusEnabled: true,
                perksTemplate: 'string'
              }
            }
          ]
        },
        {
          name: 'getCrowdfund',
          description: 'Get Crowdfund app details',
          parameters: {
            appId: {
              type: 'string',
              description: 'App ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get crowdfund app',
              description: 'Retrieve crowdfund app details',
              parameters: {
                appId: '3ki4jsAkN4u9rv1PUzj1odX4Nx7s'
              }
            }
          ]
        },
        {
          name: 'updateCrowdfund',
          description: 'Update Crowdfund app',
          parameters: {
            appId: {
              type: 'string',
              description: 'Crowdfund App ID',
              required: true
            },
            appName: {
              type: 'string',
              description: 'Name given to the app when it was created',
              required: false
            },
            title: {
              type: 'string',
              description: 'Display title of the app',
              required: false
            },
            description: {
              type: 'string',
              description: 'App description',
              required: false
            },
            enabled: {
              type: 'boolean',
              description: 'Whether the app is enabled to be viewed by everyone',
              required: false
            },
            targetAmount: {
              type: 'string',
              description: 'Target amount for the crowdfund',
              required: false
            },
            targetCurrency: {
              type: 'string',
              description: 'Target currency for the crowdfund',
              required: false
            },
            tagline: {
              type: 'string',
              description: 'Tagline for the app displayed to user',
              required: false
            },
            archived: {
              type: 'boolean',
              description: 'If true, the app does not appear in the apps list by default',
              required: false
            }
          },
          examples: [
            {
              name: 'Update crowdfund target',
              description: 'Update crowdfund target amount',
              parameters: {
                appId: 'crowd_app_789',
                targetAmount: '75000',
                enabled: true,
                tagline: 'We are almost there!'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'listAll':
        return await this.client.listAllApps();

      case 'listStore':
        return await this.client.listStoreApps(parameters.storeId);

      case 'get':
        return await this.client.getApp(parameters.appId);

      case 'delete':
        return await this.client.deleteApp(parameters.appId);

      case 'uploadImage':
        return await this.client.uploadAppImage(parameters.appId, parameters.fileData);

      case 'deleteImage':
        return await this.client.deleteAppImage(parameters.appId, parameters.fileId);

      case 'getSalesStatistics':
        return await this.client.getAppSalesStatistics(
          parameters.appId,
          parameters.numberOfDays || 7
        );

      case 'getTopItems':
        return await this.client.getAppTopItems(
          parameters.appId,
          parameters.count || 5,
          parameters.offset || 0
        );

      case 'createPos':
        // Extract all POS-specific parameters and create the data object
        const posAppData: any = {};
        
        // Required fields
        if (parameters.appName) posAppData.appName = parameters.appName;
        // Template is required - provide default string if not specified
        posAppData.template = parameters.template || 'string';
        
        // Add missing fields that BTCPayServer expects
        if (parameters.id) posAppData.id = parameters.id;
        // Set default redirectAutomatically if not provided
        posAppData.redirectAutomatically = parameters.redirectAutomatically !== undefined ? parameters.redirectAutomatically : false;
        
        // Optional fields
        if (parameters.title !== undefined) posAppData.title = parameters.title;
        if (parameters.description !== undefined) posAppData.description = parameters.description;
        if (parameters.defaultView !== undefined) posAppData.defaultView = parameters.defaultView;
        if (parameters.showItems !== undefined) posAppData.showItems = parameters.showItems;
        if (parameters.showCustomAmount !== undefined) posAppData.showCustomAmount = parameters.showCustomAmount;
        if (parameters.showDiscount !== undefined) posAppData.showDiscount = parameters.showDiscount;
        if (parameters.showSearch !== undefined) posAppData.showSearch = parameters.showSearch;
        if (parameters.showCategories !== undefined) posAppData.showCategories = parameters.showCategories;
        if (parameters.enableTips !== undefined) posAppData.enableTips = parameters.enableTips;
        if (parameters.currency !== undefined) posAppData.currency = parameters.currency;
        if (parameters.fixedAmountPayButtonText !== undefined) posAppData.fixedAmountPayButtonText = parameters.fixedAmountPayButtonText;
        if (parameters.customAmountPayButtonText !== undefined) posAppData.customAmountPayButtonText = parameters.customAmountPayButtonText;
        if (parameters.tipText !== undefined) posAppData.tipText = parameters.tipText;
        if (parameters.customTipPercentages !== undefined) posAppData.customTipPercentages = parameters.customTipPercentages;
        if (parameters.notificationUrl !== undefined) posAppData.notificationUrl = parameters.notificationUrl;
        if (parameters.redirectUrl !== undefined) posAppData.redirectUrl = parameters.redirectUrl;
        if (parameters.htmlLang !== undefined) posAppData.htmlLang = parameters.htmlLang;
        if (parameters.htmlMetaTags !== undefined) posAppData.htmlMetaTags = parameters.htmlMetaTags;
        if (parameters.formId !== undefined) posAppData.formId = parameters.formId;
        if (parameters.template !== undefined) posAppData.template = parameters.template;
        if (parameters.archived !== undefined) posAppData.archived = parameters.archived;
        
        return await this.client.createPosApp(parameters.storeId, posAppData);

      case 'getPos':
        return await this.client.getPosApp(parameters.appId);

      case 'updatePos':
        // Extract all update parameters and create the data object
        const updatePosData: any = {};
        
        if (parameters.appName !== undefined) updatePosData.appName = parameters.appName;
        if (parameters.title !== undefined) updatePosData.title = parameters.title;
        if (parameters.description !== undefined) updatePosData.description = parameters.description;
        if (parameters.defaultView !== undefined) updatePosData.defaultView = parameters.defaultView;
        if (parameters.enableTips !== undefined) updatePosData.enableTips = parameters.enableTips;
        if (parameters.currency !== undefined) updatePosData.currency = parameters.currency;
        if (parameters.customTipPercentages !== undefined) updatePosData.customTipPercentages = parameters.customTipPercentages;
        if (parameters.archived !== undefined) updatePosData.archived = parameters.archived;
        
        return await this.client.updatePosApp(parameters.appId, updatePosData);

      case 'createCrowdfund':
        // Extract all Crowdfund-specific parameters and create the data object
        const crowdfundAppData: any = {};
        
        // Required fields
        if (parameters.appName) crowdfundAppData.appName = parameters.appName;
        // PerksTemplate is required - provide default string if not specified
        crowdfundAppData.perksTemplate = parameters.perksTemplate || 'string';
        
        // Add missing fields that BTCPayServer expects
        if (parameters.id) crowdfundAppData.id = parameters.id;
        
        // Optional fields
        if (parameters.title !== undefined) crowdfundAppData.title = parameters.title;
        if (parameters.description !== undefined) crowdfundAppData.description = parameters.description;
        if (parameters.enabled !== undefined) crowdfundAppData.enabled = parameters.enabled;
        if (parameters.enforceTargetAmount !== undefined) crowdfundAppData.enforceTargetAmount = parameters.enforceTargetAmount;
        if (parameters.startDate !== undefined) crowdfundAppData.startDate = parameters.startDate;
        if (parameters.endDate !== undefined) crowdfundAppData.endDate = parameters.endDate;
        if (parameters.targetCurrency !== undefined) crowdfundAppData.targetCurrency = parameters.targetCurrency;
        if (parameters.targetAmount !== undefined) crowdfundAppData.targetAmount = parameters.targetAmount;
        if (parameters.mainImageUrl !== undefined) crowdfundAppData.mainImageUrl = parameters.mainImageUrl;
        if (parameters.notificationUrl !== undefined) crowdfundAppData.notificationUrl = parameters.notificationUrl;
        if (parameters.tagline !== undefined) crowdfundAppData.tagline = parameters.tagline;
        if (parameters.disqusEnabled !== undefined) crowdfundAppData.disqusEnabled = parameters.disqusEnabled;
        if (parameters.disqusShortname !== undefined) crowdfundAppData.disqusShortname = parameters.disqusShortname;
        if (parameters.soundsEnabled !== undefined) crowdfundAppData.soundsEnabled = parameters.soundsEnabled;
        if (parameters.animationsEnabled !== undefined) crowdfundAppData.animationsEnabled = parameters.animationsEnabled;
        if (parameters.resetEveryAmount !== undefined) crowdfundAppData.resetEveryAmount = parameters.resetEveryAmount;
        if (parameters.resetEvery !== undefined) crowdfundAppData.resetEvery = parameters.resetEvery;
        if (parameters.displayPerksValue !== undefined) crowdfundAppData.displayPerksValue = parameters.displayPerksValue;
        if (parameters.sortPerksByPopularity !== undefined) crowdfundAppData.sortPerksByPopularity = parameters.sortPerksByPopularity;
        if (parameters.sounds !== undefined) crowdfundAppData.sounds = parameters.sounds;
        if (parameters.animationColors !== undefined) crowdfundAppData.animationColors = parameters.animationColors;
        if (parameters.htmlLang !== undefined) crowdfundAppData.htmlLang = parameters.htmlLang;
        if (parameters.htmlMetaTags !== undefined) crowdfundAppData.htmlMetaTags = parameters.htmlMetaTags;
        if (parameters.formId !== undefined) crowdfundAppData.formId = parameters.formId;
        if (parameters.perksTemplate !== undefined) crowdfundAppData.perksTemplate = parameters.perksTemplate;
        if (parameters.archived !== undefined) crowdfundAppData.archived = parameters.archived;
        
        return await this.client.createCrowdfundApp(parameters.storeId, crowdfundAppData);

      case 'getCrowdfund':
        return await this.client.getCrowdfundApp(parameters.appId);

      case 'updateCrowdfund':
        // Extract all update parameters and create the data object
        const updateCrowdfundData: any = {};
        
        if (parameters.appName !== undefined) updateCrowdfundData.appName = parameters.appName;
        if (parameters.title !== undefined) updateCrowdfundData.title = parameters.title;
        if (parameters.description !== undefined) updateCrowdfundData.description = parameters.description;
        if (parameters.enabled !== undefined) updateCrowdfundData.enabled = parameters.enabled;
        if (parameters.targetAmount !== undefined) updateCrowdfundData.targetAmount = parameters.targetAmount;
        if (parameters.targetCurrency !== undefined) updateCrowdfundData.targetCurrency = parameters.targetCurrency;
        if (parameters.tagline !== undefined) updateCrowdfundData.tagline = parameters.tagline;
        if (parameters.archived !== undefined) updateCrowdfundData.archived = parameters.archived;
        
        return await this.client.updateCrowdfundApp(parameters.appId, updateCrowdfundData);

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}