import { BaseService, ServiceInfo } from './base-service.js';

export class ServerInfoService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'server-info',
      description: 'Get BTCPayServer information - server details',
      category: 'system',
      methods: [
        {
          name: 'getInfo',
          description: 'Get general server information',
          parameters: {},
          examples: [
            {
              name: 'Get server info',
              description: 'Retrieve BTCPayServer version and basic information',
              parameters: {}
            }
          ]
        },
      ]
    };
  }

  protected async handleMethod(methodName: string, _parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getInfo':
        return await this.client.getServerInfo();

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
