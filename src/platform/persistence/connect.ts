
import * as mongoose from 'mongoose';

import { Configuration } from '../../config/configuration';

const uri: string = Configuration.APPLICATION_CONFIG.db.uri;

(<any>mongoose).Promise = global.Promise;

mongoose.connect(uri, (err) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err.message);
    // tslint:disable-next-line:no-console
    console.log(err);
  } else {
    // tslint:disable-next-line:no-console
    console.log('Connected to MongoDb');
  }
});
