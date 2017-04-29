
import * as express from 'express';
import { Server } from 'typescript-rest';

import { Configuration } from './config';
import { Controllers as PlatformControllers } from './platform';

Server.useIoC();

/* tslint:disable-next-line */
const Controllers: any = {
    PlatformControllers
};

const app: express.Application = express();
Server.buildServices(app);

if (Configuration.IS_PRODUCTION) {
    /* tslint:disable-next-line */
    console.error = function() { };
}

app.listen(3000, () => {
    /* tslint:disable-next-line */
    console.log('Rest Server listening on port 3000!');
});
