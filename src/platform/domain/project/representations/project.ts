
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

@Foundation.Hal.HalResource(':tenantID/project/:id')
export class Project extends Foundation.DataRepresentation implements IProject {
    
    constructor(private $$data: ProjectPersistence.IProjectDocument) { 
        super();
    }

    @Foundation.Hal.HalProperty()
    public get id(): string { return this.$$data.id as string; }

    @Foundation.Hal.HalProperty()
    public get name(): string { return this.$$data.name; }

    @Foundation.Hal.HalProperty()
    public get timestamp(): Date { return this.$$data.timestamp; }

    @Foundation.Hal.HalProperty()
    public get tenantID(): string { return this.$$data.tenantID; }
}

export class ProjectCollection extends Foundation.CollectionRepresentation implements IProjectCollection {
    public static Create(projects: Array<IProject>): ProjectCollection {
        const instance: ProjectCollection = new ProjectCollection();
        instance.projects = projects;

        return instance;
    }

    public projects: Array<IProject>;
}
