
import * as Foundation from '../../../../foundation';
import { Project as ProjectPersistence } from '../../../persistence';

export interface IProject extends Foundation.IDomainEntity {
    id: string;
    tenantID: string;
    name: string;
    timestamp: Date;
}

export interface IProjectList extends Foundation.IDomainEntityList {
}

export class Project extends Foundation.DomainEntity implements IProject {
    
    constructor(private data?: ProjectPersistence.IProjectAttributes) { 
        super();

        this.data = !!this.data  ? this.data : { projectID: Foundation.Generator.uuid(), tenantID: '', name: '', timestamp: new Date() };
    }

    public get id(): string { return this.data.projectID; }
    public set id(value: string) { this.data.projectID = value; }

    public get tenantID(): string { return this.data.tenantID; }
    public set tenantID(value: string) { this.data.tenantID = value; }

    public get name(): string { return this.data.name; }
    public set name(value: string) { this.name = value; }

    public get timestamp(): Date { return this.data.timestamp; }
    public set timestamp(value: Date) { this.data.timestamp = value; }
}