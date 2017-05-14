
import * as Foundation from './foundation';
import { Controllers as PlatformControllers } from './platform';

Foundation.ApiServer
    .bootStrap()
    .createApplication()
    .usePassport()
    .useAuthorizationOn('/*')
    .registerControllers(PlatformControllers)
    .buildServices()
    .listen(3000);
