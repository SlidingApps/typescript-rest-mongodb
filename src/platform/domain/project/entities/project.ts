
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

export class Project extends Foundation.DomainEntity<ProjectPersistence.IProject> implements IProject {
    
    public static Create(id: string, tenantID: string, name: string, timestamp: Date= new Date()): Project {
        const project = new Project({});
        project.id = id;
        project.tenantID = tenantID;
        project.name = name;
        project.timestamp = timestamp;

        return project;
    }

    constructor(data?: ProjectPersistence.IProjectAttributes) { 
        super();
        this.$$data = data || { };
    }

    public get id(): string { return this.$$data.id; }
    public set id(value: string) { this.$$data.id = value; }

    public get tenantID(): string { return this.$$data.tenantID; }
    public set tenantID(value: string) { this.$$data.tenantID = value; }

    public get name(): string { return this.$$data.name; }
    public set name(value: string) { this.$$data.name = value; }

    public get timestamp(): Date { return this.$$data.timestamp; }
    public set timestamp(value: Date) { this.$$data.timestamp = value; }
}
