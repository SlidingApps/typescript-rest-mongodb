
import * as express from 'express';

export class HalMapper {

    constructor() {  
    }

    public map = (req: express.Request, res: express.Response, next: express.NextFunction) => {       
        this.mapRepresentation(res);

        next();
    }

    private mapRepresentation(response: express.Response): void {
        console.log('mapRepresentation', (<any>response).body);
    }
}