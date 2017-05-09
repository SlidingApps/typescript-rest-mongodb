
import * as express from 'express';
import { ContextRequest, Path, PathParam, Return, ServiceContext, GET, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { Configuration } from '../../config/configuration';
import * as Hal from '../../foundation/hal-resource';

import { Version } from './version';
import { Project } from '../domain';

@Path(`/${Version.API}/:tenantid/projects/`)
export class ProjectController {

    constructor(@Inject private service: Project.Service, @Inject private mapper: Hal.Mapper) { 
    }

    @Path('')
    @GET
    public getCollection(@PathParam('tenantid') tenantID: string): Promise<Project.Representation.IProjectCollection> {
        const query: Project.Query.ProjectByTenantID =  new Project.Query.ProjectByTenantID(tenantID);

        return this.service.getCollection(query);
    }

    @Path('/:id')
    @GET
    public get(@PathParam('tenantid') tenantID: string, @PathParam('id') projectID: string, @ContextRequest request: express.Request): Promise<Project.Representation.IProject> {
        const query: Project.Query.ProjectByID =  new Project.Query.ProjectByID(tenantID, projectID);

        return this.service.get(query)
            .then(x => this.mapper.map(Configuration.APPLICATION_CONFIG.apiBaseUrl, x));
    }

    @Path('')
    @PUT
    public put(@PathParam('tenantid') tenantID: string, intent: Project.Intent.CreatePoject, @ContextRequest request: express.Request): Promise<Return.NewResource> {
        const command = new Project.Command.Command<Project.Intent.CreatePoject>(tenantID, intent);

        return this.service.create(command)
            .then(x => new Return.NewResource(request.url + '/' + x.id, { id: x.id }));
    }

}
