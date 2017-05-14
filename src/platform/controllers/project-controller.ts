
import * as express from 'express';
import { ContextRequest, Path, PathParam, Return, GET, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { Configuration } from '../../config/configuration';
import * as Foundation from '../../foundation';

import { Version } from './version';
import { Project } from '../domain';

@Path(`/${Version.API}/:tenantid/projects/`)
export class ProjectController {

    constructor(@Inject private service: Project.Service, @Inject private mapper: Foundation.Hal.Mapper) { 
    }

    @GET
    @Path('')
    public getCollection(@PathParam('tenantid') tenantID: string): Promise<Project.Representation.IProjectCollection> {
        const query: Project.Query.ProjectByTenantID =  new Project.Query.ProjectByTenantID(tenantID);

        return this.service.getCollection(query);
    }

    @GET
    @Path('/:id')
    public get(@PathParam('tenantid') tenantID: string, @PathParam('id') projectID: string, @ContextRequest request: express.Request): Promise<Project.Representation.IProject> {
        const query: Project.Query.ProjectByID =  new Project.Query.ProjectByID(tenantID, projectID);

        const isHalContentType: boolean = this.isHalContentType(request);
        return this.service.get(query)
            .then(x => this.mapper.map(Configuration.APPLICATION_CONFIG.apiBaseUrl, x, isHalContentType));
    }

    @PUT
    @Path('')
    public put(@PathParam('tenantid') tenantID: string, intent: Project.Intent.CreatePoject, @ContextRequest request: express.Request): Promise<Return.NewResource<{id: string}>> {
        const command = new Project.Command.Command<Project.Intent.CreatePoject>(tenantID, intent);

        return this.service.create(command)
            .then(x => new Return.NewResource(request.url + '/' + x.id, { id: x.id }));
    }

    private isHalContentType(request: express.Request): boolean {
        return !!request && !!request.header('accept') && request.header('accept') === 'application/hal+json';
    }

}
