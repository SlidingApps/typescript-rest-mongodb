import * as Foundation from '../../../../foundation';

export class ProjectByID extends Foundation.Query {
    constructor(public tenantID: string, public projectID: number) {
        super();
    }
}
