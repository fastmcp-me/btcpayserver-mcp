# BTCPayServer Model Context Protocol Server (Beta)

A comprehensive Model Context Protocol (MCP) server for BTCPayServer integration, providing tools for payment processing, store management, user administration, webhook handling and more with full API coverage.

## Tool Reference
The BTCPayServer MCP Server provides a streamlined set of tools for interacting with BTCPayServer APIs:

| Tool | Description | Primary Use |
|------|-------------|-------------|
| `get_service_info` | Discover methods available for a service | Exploration and discovery |
| `get_method_info` | Get detailed parameter requirements | Request preparation |
| `btcpay_request` | Execute API calls to BTCPayServer | Performing operations |

## Integration with AI Assistants

### Claude Desktop Integration
For Claude Desktop integration, add this configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "btcpayserver-mcp": {
      "command": "node",
      "args": ["path/to/btcpayserver-mcp/dist/index.js"],
      "env": {
        "BTCPAY_BASE_URL": "https://your-btcpay-instance.com",
        "BTCPAY_API_KEY": "your_api_key_here",
        "BTCPAY_STORE_ID": "your_default_store_id"
      }
    }
  }
}
```

## Service Catalog
BTCPayServer MCP provides access to BTCPayServer's complete API ecosystem. Check out the [BTCPayServer API Documentation](https://docs.btcpayserver.org/API/Greenfield/v1/) for detailed information about each service:

### Payment Services
| Service | Description |
|---------|-------------|
| `invoices` | Create, manage, and track Bitcoin invoices for payments |
| `payment-requests` | Create payment requests for donations or recurring billing |
| `lightning-internal` | Manage internal Lightning Network operations |
| `lightning-store` | Store-level Lightning Network configurations |
| `lightning-address` | Lightning Address management and setup |

### Store Management
| Service | Description |
|---------|-------------|
| `stores` | Store creation, configuration, and management |
| `stores-email` | Configure and manage store email settings and SMTP |
| `stores-payment-methods` | Manage available payment methods for stores |
| `stores-payout-processors` | Configure automated payout processing |
| `stores-payouts` | Manage and process store payouts |
| `stores-rates` | Exchange rate configuration and management |
| `stores-users` | Store user access and permissions management |
| `stores-wallet` | Store wallet management and operations |

### User & Access Management
| Service | Description |
|---------|-------------|
| `users` | User account management and administration |
| `api-keys` | API key creation and permission management |
| `authorization` | OAuth and authorization flow management |

### Integration & Automation
| Service | Description |
|---------|-------------|
| `webhooks` | Real-time event notifications and webhook management |
| `notifications` | System notifications and alerts |
| `apps` | BTCPayServer app integrations and plugins |
| `pull-payments` | Pull payment requests and refund management |

### System
| Service | Description |
|---------|-------------|
| `server-info` | Server status, version, and configuration information |

## Usage Pattern
For optimal interaction with the BTCPayServer API through MCP:

**1. Discover:** Use `get_service_info` to explore available methods
```
get_service_info(serviceName: "invoices")
```

**2. Understand:** Use `get_method_info` to learn parameter requirements
```
get_method_info(serviceName: "invoices", methodName: "create")
```

**3. Execute:** Use `btcpay_request` to perform the operation
```
btcpay_request(serviceName: "invoices", methodName: "create", parameters: {storeId: "your-store-id", amount: "10.00", currency: "USD"})
```


## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd btcpayserver-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

The MCP server requires the following environment variables:

- `BTCPAY_BASE_URL` - Your BTCPayServer instance URL (e.g., `https://btcpay.example.com`)
- `BTCPAY_API_KEY` - Your BTCPayServer API key
- `BTCPAY_STORE_ID` - (Optional) Default store ID for operations

### Setting up BTCPayServer API Key

1. Log into your BTCPayServer instance
2. Go to **Account** → **Manage Account** → **API Keys**
3. Click **Generate Key**
4. Select the required permissions for your use case:
   - Store management: `btcpay.store.canmodifystoresettings`
   - Payment requests: `btcpay.store.cancreateinvoice`
   - User management: `btcpay.user.canmodifyprofile`
   - Webhooks: `btcpay.store.webhooks.canmodifywebhooks`
   - etc..
5. Copy the generated API key

### Environment Setup

Create a `.env` file in your project root:

```env
BTCPAY_BASE_URL=https://your-btcpay-instance.com
BTCPAY_API_KEY=your_api_key_here
BTCPAY_STORE_ID=your_default_store_id
```

Or set environment variables directly:

```bash
export BTCPAY_BASE_URL=https://your-btcpay-instance.com
export BTCPAY_API_KEY=your_api_key_here
export BTCPAY_STORE_ID=your_default_store_id
```

## Usage

### Running the MCP Server

```bash
npm start
```

For development:
```bash
npm run dev
```

### Development and Debugging

**Using MCP Inspector:**
The MCP Inspector provides a visual interface for testing:

```bash
# Build the project
npm run build

# Start the inspector with the BTCPayServer MCP Server
npx @modelcontextprotocol/inspector node dist/index.js
```

**Development Workflow:**
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development mode: `npm run build`
4. Run the server: `node dist/index.js`
5. Test your changes using the MCP Inspector



The MCP server provides comprehensive error handling:

- **Configuration Errors**: Missing environment variables
- **API Errors**: BTCPayServer API communication issues
- **Validation Errors**: Invalid input parameters
- **Authentication Errors**: Invalid or expired API keys

All errors are properly formatted and returned with descriptive messages.

## Development

### Project Structure

```
src/
├── index.ts              # Main MCP server implementation
├── services/             # BTCPayServer service implementations
│   ├── base-service.ts   # Base service class
│   ├── invoices.ts       # Invoice management
│   ├── payment-requests.ts # Payment request handling
│   ├── stores.ts         # Store management
│   ├── webhooks.ts       # Webhook management
│   └── ...               # Other service modules
├── utils/
│   └── btcpay-client.ts  # BTCPayServer API client
└── types.ts              # TypeScript type definitions
```

### Building

```bash
npm run build
```

### Running in Development

```bash
npm run dev
```

## Security Considerations

1. **API Key Security**: Never commit API keys to version control
2. **Environment Variables**: Use secure environment variable management
3. **Webhook Secrets**: Always use webhook secrets for verification
4. **HTTPS**: Ensure BTCPayServer instance uses HTTPS
5. **Permissions**: Use principle of least privilege for API key permissions

## BTCPayServer Compatibility

This MCP server is compatible with BTCPayServer v1.7.0 and later. It uses the official BTCPayServer REST API v1.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the BTCPayServer documentation
2. Review the API reference
3. Open an issue in this repository

## Help us improve this MCP

**Note:** Some methods might not be working properly. Please help us by reporting requirements and making pull requests to improve them. Also, to keep it up with the latest API version, we need to continue updating it. 