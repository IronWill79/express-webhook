# express-webhook

NodeJS/Express webhook to trigger something

Boilerplate that accepts a POST request at `/hook/{.env/WEBHOOK_PATH}` and parrots back the response

## Dependencies

| Package     | Version | URL                                       |
| ----------- | ------- | ----------------------------------------- |
| NodeJS      | v16.x   | https://nodejs.org                        |
| express     | ^4.17.1 | https://www.npmjs.com/package/express     |
| body-parser | ^1.19.0 | https://www.npmjs.com/package/body-parser |
| dotenv      | ^10.0.0 | https://www.npmjs.com/package/dotenv      |

## Setup

1. Clone the repo
1. Run `yarn` to install node modules
1. Copy `.env.example` to `.env` and set variables

## Local Execution

1. `yarn start`
1. Browse to `localhost:PORT`

## Deployment

1. Setup PM2
1. Run `pm2 start npm --name express-webhook -- run start`
1. Serve the port through the firewall or use Nginx to proxy
