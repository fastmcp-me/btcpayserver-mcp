import { BTCPayServerClient } from '../utils/btcpay-client.js';

export interface ServiceMethod {
  name: string;
  description: string;
  parameters: Record<string, {
    type: string;
    description: string;
    required: boolean;
    default?: any;
  }>;
  examples?: Array<{
    name: string;
    description: string;
    parameters: Record<string, any>;
  }>;
}

export interface ServiceInfo {
  name: string;
  description: string;
  category: string;
  methods: ServiceMethod[];
}

export abstract class BaseService {
  protected client: BTCPayServerClient;

  constructor(client: BTCPayServerClient) {
    this.client = client;
  }

  abstract getServiceInfo(): ServiceInfo;

  // Common executeMethod implementation - eliminates duplication across all services
  async executeMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    const method = this.getMethodInfo(methodName);
    if (!method) {
      throw new Error(`Unknown method: ${methodName}`);
    }

    this.validateParameters(method, parameters);

    return await this.handleMethod(methodName, parameters);
  }

  // Each service implements this to handle their specific methods
  protected abstract handleMethod(methodName: string, parameters: Record<string, any>): Promise<any>;

  protected validateParameters(method: ServiceMethod, parameters: Record<string, any>): void {
    for (const [paramName, paramDef] of Object.entries(method.parameters)) {
      if (paramDef.required && !(paramName in parameters)) {
        throw new Error(`Required parameter '${paramName}' is missing for method '${method.name}'`);
      }
    }
  }

  protected getMethodInfo(methodName: string): ServiceMethod | undefined {
    return this.getServiceInfo().methods.find(m => m.name === methodName);
  }
}
