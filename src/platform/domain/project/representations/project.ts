
import * as Foundation from '../../../../foundation';
import { Project as ProjectPersistence } from '../../../persistence';

export interface IProject extends Foundation.IRepresentation {
    id: string;
    tenantID: string;
    name: string;
    timestamp: Date;
}

export interface IProjectCollection extends Foundation.ICollectionRepresentation {
    projects: Array<IProject>;
}

export class Project extends Foundation.DataRepresentation implements IProject {
    
    constructor(private $$data: ProjectPersistence.IProjectDocument) { 
        super();
    }

    public get id(): string { return this.$$data.projectID; }

    public get tenantID(): string { return this.$$data.tenantID; }

    public get name(): string { return this.$$data.name; }

    public get timestamp(): Date { return this.$$data.timestamp; }
}

export class ProjectCollection extends Foundation.CollectionRepresentation implements IProjectCollection {
    public static Create(projects: Array<IProject>): ProjectCollection {
        const instance: ProjectCollection = new ProjectCollection();
        instance.projects = projects;

        return instance;
    }

    public projects: Array<IProject>;
}
