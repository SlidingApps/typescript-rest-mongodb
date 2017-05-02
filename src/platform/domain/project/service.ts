
import { Inject } from 'typescript-ioc';

import * as Foundation from '../../../foundation';
import { Representation, Command, Intent, Entity, Query, Validator } from './';
import { Project } from '../../persistence';

export class Action {
  public static Result<TResult>(result: TResult, error: any) {
    if (error) {
      throw new Error(error);
    } else {
      return result;
    }
  }
}

export class Service {
  
  constructor(
    @Inject private validator: Validator.Validator,
    @Inject private repostory: Project.Repository
    ) { }
  
  public getCollection(query: Query.ProjectByTenantID): Promise<Representation.IProjectCollection> {
    this.validator.validate(query);
    
    const promise: Promise<Representation.IProjectCollection> = 
      new Promise<Representation.IProjectCollection>((resolve, reject) => {

        this.repostory
          .find({ tenantID: query.tenantID })
          .exec((error, documents) => Action.Result(documents, error))
          .then(documents => Representation.ProjectCollection.Create(documents.map(document => new Representation.Project(document) as Representation.IProject)))
          .then(representations => resolve(representations));

      });

      return promise;
  }

  public get(query: Query.ProjectByID): Promise<Representation.IProject> {
    this.validator.validate(query);

    const promise: Promise<Representation.IProject> = 
      new Promise<Representation.IProject>((resolve, reject) => {

        this.repostory
          .findOne({ tenantID: query.tenantID, projectID: query.projectID })
          .exec((error, document) => Action.Result(document, error))
          .then(document => new Representation.Project(document) as Representation.IProject)
          .then(representation => resolve(representation));

      });

      return promise;
  }

  public create(command: Command.Command<Intent.CreatePoject>): Promise<Entity.Project> {
    const project: Entity.Project = Entity.Project.Create(Foundation.Generator.uuid(), command.tenantID, command.intent.name);

    const promise: Promise<Representation.IProject> = 
      new Promise<Entity.Project>((resolve, reject) => {
        this.repostory
          .create(project.$$getData(), (error, document) => 
              resolve(Action.Result(new Entity.Project(document), error)));
      });

      return promise;
  }

}
