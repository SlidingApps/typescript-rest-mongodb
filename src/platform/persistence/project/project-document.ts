
import * as mongoose from 'mongoose';

export interface IProjectAttributes {
    projectID: string;
    tenantID: string;
    name: string;
    timestamp: Date;
    createdAt?: Date;
    modifiedAt?: Date;
}

export interface IProjectDocument extends IProjectAttributes, mongoose.Document {

}
