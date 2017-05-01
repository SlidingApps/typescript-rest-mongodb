
import * as Foundation from '../../../foundation';
import { IProjectDocument } from './project-document';
import { Model } from './schema'; 

export class Repository extends Foundation.Repository<IProjectDocument> {

    constructor() {
        super(Model);
    }

}

Object.seal(Repository);
