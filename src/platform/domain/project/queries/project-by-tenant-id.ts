import * as Foundation from '../../../../foundation';

export class ProjectByTenantID extends Foundation.Query {
    constructor(public tenantID: string) {
        super();
    }
}
