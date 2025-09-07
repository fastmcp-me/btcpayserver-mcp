import { BaseService, ServiceInfo } from './base-service.js';

export class StoresEmailService extends BaseService {
  getServiceInfo(): ServiceInfo {
    return {
      name: 'stores-email',
      description: 'Store email operations - manage email settings and send emails through store SMTP',
      category: 'store-management',
      methods: [
        {
          name: 'getEmailSettings',
          description: 'Get store email settings',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            }
          },
          examples: [
            {
              name: 'Get email settings',
              description: 'Retrieve the email settings configured for a store',
              parameters: {
                storeId: 'store123'
              }
            }
          ]
        },
        {
          name: 'updateEmailSettings',
          description: 'Update store email settings',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            from: {
              type: 'string',
              description: 'The sender email address',
              required: true
            },
            server: {
              type: 'string',
              description: 'SMTP server host',
              required: true
            },
            port: {
              type: 'number',
              description: 'SMTP server port',
              required: true
            },
            login: {
              type: 'string',
              description: 'SMTP username',
              required: true
            },
            disableCertificateCheck: {
              type: 'boolean',
              description: 'Disable TLS certificate security checks',
              required: false,
              default: false
            },
            password: {
              type: 'string',
              description: 'SMTP password (keep null or empty to not update it)',
              required: false
            }
          },
          examples: [
            {
              name: 'Configure Gmail SMTP',
              description: 'Set up Gmail SMTP for store emails',
              parameters: {
                storeId: 'store123',
                from: 'sender@gmail.com',
                server: 'smtp.gmail.com',
                port: 587,
                login: 'John.Smith',
                disableCertificateCheck: false,
                password: 'MyS3cr3t'
              }
            }
          ]
        },
        {
          name: 'sendEmail',
          description: 'Send an email using the store\'s SMTP server',
          parameters: {
            storeId: {
              type: 'string',
              description: 'Store ID',
              required: true
            },
            email: {
              type: 'string',
              description: 'Email of the recipient',
              required: true
            },
            subject: {
              type: 'string',
              description: 'Subject of the email',
              required: true
            },
            body: {
              type: 'string',
              description: 'Body of the email to send as plain text',
              required: true
            }
          },
          examples: [
            {
              name: 'Send notification email',
              description: 'Send a notification email to a customer',
              parameters: {
                storeId: 'store123',
                email: 'customer@example.com',
                subject: 'Order Confirmation',
                body: 'Thank you for your order! Your payment has been received.'
              }
            }
          ]
        }
      ]
    };
  }

  protected async handleMethod(methodName: string, parameters: Record<string, any>): Promise<any> {
    switch (methodName) {
      case 'getEmailSettings':
        return await this.client.getStoreEmailSettings(parameters.storeId);

      case 'updateEmailSettings':
        return await this.client.updateStoreEmailSettings(
          parameters.storeId,
          {
            from: parameters.from,
            server: parameters.server,
            port: parameters.port,
            login: parameters.login,
            disableCertificateCheck: parameters.disableCertificateCheck || false,
            password: parameters.password
          }
        );

      case 'sendEmail':
        return await this.client.sendStoreEmail(
          parameters.storeId,
          {
            email: parameters.email,
            subject: parameters.subject,
            body: parameters.body
          }
        );

      default:
        throw new Error(`Method ${methodName} not implemented`);
    }
  }
}
