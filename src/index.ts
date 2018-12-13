import express from 'express';
import * as bodyParser from 'body-parser';

import './controllers';
import { RegisterRoutes } from './routes';

let app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const apiDocPath: string = '/docs';
const apiDocSrcDir: string = 'docs';

app.use(apiDocPath, express.static(apiDocSrcDir));

RegisterRoutes(app);

/**
 * Function for catching and returning errors correctly.
 * API errors have the format:
 * {
 *  "msg": "Some Message",
 *  "code": <http status code>,
 *  "timestamp": <unix timestamp>
 * }
 *
 * Swagger Validation errors have the format:
 * {
 *  "fields": <fields with validation errors>,
 *  "message": "Some Message",
 *  "name": <error name>,
 *  "status": <http status code>
 * }
 *
 * Returned errors will have the format:
 * {
 *  "msg": <always>,
 *  "code": <alway>,
 *  "fields": <if applicable>,
 *  "name": <if applicable>,
 *  "timestamp": <always>
 * }
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Get around typescript unused parameters error.
    req = req;
    next = next;

    const status = err.code || err.status || 500;
    const body: any = {
      fields: err.fields || undefined,
      msg: err.msg || err.message || 'An error occurred during the request.',
      name: err.name,
      code: status,
      timestamp: err.timestamp || Date.now()
    };
    res.status(status).json(body);
  });

console.log(`Starting server on port ${port}...`);
app.listen(port);
