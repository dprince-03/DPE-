# Dynamic Profile Endpoint - Stage 0 API

## Project Overview

This project is a simple Express.js API server that provides a dynamic profile endpoint along with basic health and root endpoints. It demonstrates the use of middleware for security, logging, rate limiting, and error handling. The API serves profile information including user details, a timestamp, and a fun cat fact.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to configure environment variables (optional):
   ```
   PORT=5080
   ALLOWED_ORIGINS=*
   NODE_ENV=development
   ```

---

## Usage

Start the server with:

```bash
npm start
```

By default, the server runs on port `5080` unless overridden by the `PORT` environment variable.

---

## API Routes

### GET `/api`

- Description: Basic root endpoint that returns a simple greeting.
- Response: Plain text `"Hello, World!"`

### GET `/api/me`

- Description: Returns dynamic profile information.
- Response: JSON object with the following structure:
  ```json
  {
    "status": "success",
    "user": {
      "email": "user@example.com",
      "name": "User Name",
      "stack": "Technology stack description"
    },
    "timestamp": "2024-06-01T12:00:00.000Z",
    "fact": "A fun cat fact string"
  }
  ```
- Notes: The `timestamp` is the current server time. The `fact` is a dynamic cat fact fetched from an external service.

### GET `/api/health`

- Description: Health check endpoint.
- Notes: This endpoint is mentioned in server logs but no explicit implementation is found in the current codebase. It may be a placeholder or handled externally.

---

## Middleware

- **Helmet**: Secures HTTP headers.
- **CORS**: Configured with allowed origins and methods.
- **Rate Limiting**: Limits requests to 100 per 15 minutes per IP on `/api` routes.
- **Request Logger**: Logs incoming requests.
- **Error Logger and Handler**: Handles and logs errors gracefully.
- **Not Found Handler**: Handles 404 errors.

---

## Environment Variables

- `PORT`: Port number the server listens on (default: 5080).
- `ALLOWED_ORIGINS`: Allowed origins for CORS (default: `*`).
- `NODE_ENV`: Environment mode (default: `development`).

---

## Testing

Tests are written using Jest and Supertest.

To run tests:

```bash
npm test
```

The tests cover the `/api/me` endpoint, verifying response structure, data types, and content validity.

---

## Graceful Shutdown

The server listens for `SIGTERM` and `SIGINT` signals to shut down gracefully, closing the server and exiting the process cleanly.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

For questions or feedback, please open an issue or contact the maintainer.
