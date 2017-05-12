
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
app.get('/*', (req, res, next) => {

  // -----------------------------------------------------------------------
  // authentication

  const auth = {login: 'login', password: 'password'}; // change this
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (!login || !password || login !== auth.login || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="nope"'); // change this
    res.status(401).send('You shall not pass.'); // custom message

    return;
  } else {
      const user: { userId: number } = { userId: 1};
      (<any>req).user = user;
      console.log('request', (<any>req).user);      
      next();
  }

  // -----------------------------------------------------------------------
  // Access granted...

  // code here

});

Server.buildServices(app);

if (Configuration.IS_PRODUCTION) {
    /* tslint:disable-next-line */
    console.error = function() { };
}

app.listen(3000, () => {
    /* tslint:disable-next-line */
    console.log('REST server listening on port 3000');
});
