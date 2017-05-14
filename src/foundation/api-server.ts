
import * as express from 'express';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Server } from 'typescript-rest';
import { Service as AuthorizationService } from '../platform/domain/authorization';

export class ApiServer {

    public static bootStrap(): ApiServer {
        const server: ApiServer = new ApiServer();
        Server.useIoC();

        return server;
    }

    private app: express.Application;
    private controllers: any[];

    public createApplication(): ApiServer {
        this.app = express();

        return this;
    }

    public use(...handlers: express.RequestHandler[]): ApiServer {
        this.app.use(handlers);

        return this;
    }

    public usePassport(): ApiServer {
        passport.use(new BasicStrategy((username, password, done) => {
            const service: AuthorizationService = new AuthorizationService();
            service.verifyCredentials(username, password)
                .then(user => done(null, user))
                .catch(reason => done(null, false));
        }));

        return this;
    }

    public useAuthorizationOn(path: string, strategyName = 'basic'): ApiServer {
        this.app.all(path, 
            passport.authenticate(strategyName, { session: false }), 
            (req, res, next) => next());

        return this;
    }

    public buildServices(): ApiServer {
        Server.buildServices(this.app);

        return this;
    }

    public registerControllers(...controllers: any[]): ApiServer {
        this.controllers = controllers;

        return this;
    }

    /* tslint:disable-next-line */
    public listen(port: number, callback: Function = () => console.log(`API server listing on port ${port}`)): void {
        this.app.listen(port, callback);
    }

}
