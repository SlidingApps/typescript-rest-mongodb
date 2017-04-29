
import * as Foundation from '../../../../foundation';

export interface IProject extends Foundation.DataRepresentation {
    id: number;
    tenantID: string;
    name: string;
    timestamp: string;
}

export interface IProjectCollection extends Foundation.CollectionRepresentation {
    projects: Array<IProject>;
}
