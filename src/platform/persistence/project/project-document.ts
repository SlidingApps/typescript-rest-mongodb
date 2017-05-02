
import * as mongoose from 'mongoose';
import * as Foundation from '../../../foundation';

export interface IProjectAttributes {
    tenantID?: string;
    name?: string;
    timestamp?: Date;
    createdAt?: Date;
    modifiedAt?: Date;
}

export interface IProject extends IProjectAttributes, Foundation.IWithIdentifier {

}

export interface IProjectDocument extends IProjectAttributes, mongoose.Document {

}
