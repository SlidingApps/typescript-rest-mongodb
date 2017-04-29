
import { Inject } from 'typescript-ioc';
import { Representation, Query, Validator } from './';

export class Service {

  private static STORE: Array<Representation.IProject> = [
    { id: 1, tenantID: 'Apple', name: 'project X', timestamp: new Date().toISOString() },
    { id: 2, tenantID: 'Microsoft', name: 'project Y', timestamp: new Date().toISOString() },
    { id: 3, tenantID: 'Google', name: 'project Z', timestamp: new Date().toISOString() },
    { id: 4, tenantID: 'Apple', name: 'project A', timestamp: new Date().toISOString() }
  ];
  
  constructor(
    @Inject private validator: Validator.Validator
    ) { }
  
  public getCollection(query: Query.ProjectByTenantID): Representation.IProjectCollection {
    this.validator.validate(query);
    
    return {
      projects: Service.STORE.filter(x => x.tenantID.toLocaleLowerCase() === query.tenantID.toLowerCase())
    };
  }

  public get(query: Query.ProjectByID): Representation.IProject {
    this.validator.validate(query);
    
    return Service.STORE.find(x => x.tenantID.toLowerCase()===query.tenantID.toLowerCase() && x.id === query.projectID);
  }

}
