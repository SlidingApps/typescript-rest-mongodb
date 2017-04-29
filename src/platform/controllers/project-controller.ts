
import { Path, PathParam, GET } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { Response } from '../../foundation';
import { Version } from './version';
import { Project } from '../domain';

@Path(`/${Version.API}/:tenantid/projects/`)
export class ProjectController {

    constructor(@Inject private service: Project.Service) { }

    @Path('')
    @GET
    public getCollection(@PathParam('tenantid') tenantID: string): Promise<Project.Representation.IProjectCollection> {
        const query: Project.Query.ProjectByTenantID =  new Project.Query.ProjectByTenantID(tenantID);

        return new Promise<Project.Representation.IProjectCollection>((resolve, reject) => {
            const projects: Project.Representation.IProjectCollection = this.service.getCollection(query);
            Response.send(projects, resolve, reject);
        });
    }

    @Path('/:id')
    @GET
    public get(@PathParam('tenantid') tenantID: string, @PathParam('id') projectID: number): Promise<Project.Representation.IProject> {
        const query: Project.Query.ProjectByID =  new Project.Query.ProjectByID(tenantID, projectID);

        return new Promise<Project.Representation.IProject>((resolve, reject) => {
            const project: Project.Representation.IProject = this.service.get(query);
            Response.send(project, resolve, reject);
        });
    }

}
