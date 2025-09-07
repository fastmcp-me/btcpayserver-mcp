#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { BTCPayServerClient } from './utils/btcpay-client.js';
import { BTCPayServerConfig } from './types.js';
import { ServiceRegistry } from './services/service-registry.js';

class BTCPayServerMCP {
  private server: Server;
  private client: BTCPayServerClient | null = null;
  private serviceRegistry: ServiceRegistry | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'btcpayserver-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupErrorHandling();
    this.setupToolHandlers();
  }

  private getClient(): BTCPayServerClient {
    if (!this.client) {
      const baseUrl = process.env.BTCPAY_BASE_URL;
      const apiKey = process.env.BTCPAY_API_KEY;
      const storeId = process.env.BTCPAY_STORE_ID;

      if (!baseUrl || !apiKey) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          'BTCPayServer configuration missing. Please set BTCPAY_BASE_URL and BTCPAY_API_KEY environment variables.'
        );
      }

      const config: BTCPayServerConfig = {
        baseUrl,
        apiKey,
        storeId
      };

      this.client = new BTCPayServerClient(config);
      this.serviceRegistry = new ServiceRegistry(this.client);
    }

    return this.client;
  }

  private getServiceRegistry(): ServiceRegistry {
    if (!this.serviceRegistry) {
      // This will initialize both client and service registry
      this.getClient();
    }
    return this.serviceRegistry!;
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          // Service Discovery Tools (Square MCP Pattern)
          {
            name: 'get_service_info',
            description: 'Discover available BTCPayServer services and their methods. Use this to explore what operations are available.',
            inputSchema: {
              type: 'object',
              properties: {
                serviceName: {
                  type: 'string',
                  description: 'Optional: Get info for a specific service (e.g., "payment-requests", "invoices", "lightning"). If not provided, lists all services.'
                }
              }
            }
          },
          {
            name: 'get_method_info',
            description: 'Get detailed parameter requirements and examples for a specific service method.',
            inputSchema: {
              type: 'object',
              properties: {
                serviceName: {
                  type: 'string',
                  description: 'Service name (e.g., "payment-requests", "invoices", "lightning")'
                },
                methodName: {
                  type: 'string',
                  description: 'Method name (e.g., "create", "get", "list", "delete")'
                }
              },
              required: ['serviceName', 'methodName']
            }
          },
          {
            name: 'btcpay_request',
            description: 'Execute a BTCPayServer API operation using the service-based approach.',
            inputSchema: {
              type: 'object',
              properties: {
                serviceName: {
                  type: 'string',
                  description: 'Service name (e.g., "payment-requests", "invoices", "lightning")'
                },
                methodName: {
                  type: 'string',
                  description: 'Method name (e.g., "create", "get", "list", "delete")'
                },
                parameters: {
              type: 'object',
                  description: 'Parameters for the method (use get_method_info to see required parameters)'
                }
              },
              required: ['serviceName', 'methodName']
            }
          }
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        this.getClient(); // Initialize client
        const serviceRegistry = this.getServiceRegistry();

        switch (name) {
          // Service Discovery Tools (Square MCP Pattern)
          case 'get_service_info': {
            const serviceName = args?.serviceName as string;
            
            if (serviceName) {
              // Get info for a specific service
              const service = serviceRegistry.getService(serviceName);
              if (!service) {
            return {
              content: [
                {
                  type: 'text',
                      text: `Service "${serviceName}" not found.\n\nAvailable services: ${serviceRegistry.getServiceNames().join(', ')}`
                }
              ]
            };
          }

              const serviceInfo = service.getServiceInfo();
            return {
              content: [
                {
                  type: 'text',
                    text: `**${serviceInfo.name}** (Category: ${serviceInfo.category})\n\n${serviceInfo.description}\n\n**Available Methods:**\n${serviceInfo.methods.map(m => `• **${m.name}**: ${m.description}`).join('\n')}\n\nUse get_method_info to see detailed parameters for each method.`
                  }
                ]
              };
            } else {
              // List all services
              const allServices = serviceRegistry.getAllServiceInfo();
              const servicesByCategory = allServices.reduce((acc, service) => {
                if (!acc[service.category]) acc[service.category] = [];
                acc[service.category].push(service);
                return acc;
              }, {} as Record<string, any[]>);
              
              let output = "**BTCPayServer Services Directory**\n\n";
              for (const [category, services] of Object.entries(servicesByCategory)) {
                output += `**${category.toUpperCase()}:**\n`;
                services.forEach(service => {
                  output += `• **${service.name}**: ${service.description} (${service.methods.length} methods)\n`;
                });
                output += '\n';
              }
              output += "Use get_service_info with a specific service name to see available methods.";
              
            return {
              content: [
                {
                  type: 'text',
                    text: output
                }
              ]
            };
          }
          }

          case 'get_method_info': {
            const serviceName = args?.serviceName as string;
            const methodName = args?.methodName as string;
            
            const service = serviceRegistry.getService(serviceName);
            if (!service) {
            return {
              content: [
                {
                  type: 'text',
                    text: `Service "${serviceName}" not found.\n\nAvailable services: ${serviceRegistry.getServiceNames().join(', ')}`
                }
              ]
            };
          }

            const serviceInfo = service.getServiceInfo();
            const method = serviceInfo.methods.find(m => m.name === methodName);
            if (!method) {
            return {
              content: [
                {
                  type: 'text',
                    text: `Method "${methodName}" not found in service "${serviceName}".\n\nAvailable methods: ${serviceInfo.methods.map(m => m.name).join(', ')}`
                }
              ]
            };
          }

            let output = `**${serviceName}.${methodName}**\n\n${method.description}\n\n`;
            
            output += "**Parameters:**\n";
            for (const [paramName, paramDef] of Object.entries(method.parameters)) {
              const required = paramDef.required ? " (required)" : " (optional)";
              const defaultVal = paramDef.default !== undefined ? ` [default: ${paramDef.default}]` : "";
              output += `• **${paramName}** (${paramDef.type})${required}${defaultVal}: ${paramDef.description}\n`;
            }
            
            if (method.examples && method.examples.length > 0) {
              output += "\n**Examples:**\n";
              method.examples.forEach((example, index) => {
                output += `\n**${index + 1}. ${example.name}**\n${example.description}\n\`\`\`json\n${JSON.stringify(example.parameters, null, 2)}\n\`\`\`\n`;
              });
            }
            
            return {
              content: [
                {
                  type: 'text',
                  text: output
                }
              ]
            };
          }

          case 'btcpay_request': {
            const serviceName = args?.serviceName as string;
            const methodName = args?.methodName as string;
            const parameters = args?.parameters as Record<string, any> || {};
            
            const service = serviceRegistry.getService(serviceName);
            if (!service) {
            return {
              content: [
                {
                  type: 'text',
                    text: `Service "${serviceName}" not found.\n\nAvailable services: ${serviceRegistry.getServiceNames().join(', ')}`
                }
              ]
            };
          }

            try {
              const result = await service.executeMethod(methodName, parameters);
            return {
              content: [
                {
                  type: 'text',
                    text: `**${serviceName}.${methodName}** executed successfully:\n\n\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``
                  }
                ]
              };
            } catch (error) {
            return {
              content: [
                {
                  type: 'text',
                    text: `**Error executing ${serviceName}.${methodName}:**\n\n${error instanceof Error ? error.message : String(error)}\n\nUse get_method_info to check parameter requirements.`
                }
              ]
            };
          }
          }

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('BTCPayServer MCP server running on stdio');
  }
}

const server = new BTCPayServerMCP();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
