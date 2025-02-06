# tg-api-worker-proxy

This project is a Cloudflare Worker script that acts as a reverse proxy for the Telegram Bot API. It also includes HTTP to HTTPS redirection and a health check endpoint.

## Features

- **HTTP to HTTPS Redirection**: Ensures all traffic is served over HTTPS.
- **Telegram Bot API Proxy**: Forwards requests to the Telegram Bot API.
- **Health Check Endpoint**: Provides a simple health check at the root path.

## Endpoints

- **/**: Health check endpoint that returns a 200 status with "Server is healthy ✅".
- **/bot**: Forwards requests to the Telegram Bot API.
- **All other paths**: Returns a 404 Not Found response.

## Usage

Deploy this script as a Cloudflare Worker to use it as a reverse proxy for the Telegram Bot API.

## Example

To deploy this script, follow these steps:

1. Create a new Cloudflare Worker.
2. Copy the contents of \`_worker.js\` into the worker script editor.
3. Save and deploy the worker.

## License

This project is licensed under the MIT License.
