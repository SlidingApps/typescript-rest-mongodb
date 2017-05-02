
import * as mongoose from 'mongoose';
import { IProjectDocument } from './project-document';

const schema = new mongoose.Schema({
    id: String,
    tenantID: { type: String, required: true, unique: false },
    name: { type: String, required: true, unique: true },
    timestamp: Date
}).pre('save', next => {
    // tslint:disable-next-line:no-invalid-this
    // if (this._doc) {
    //     // tslint:disable-next-line:no-invalid-this
    //     let doc = <IProjectDocument>this._doc;
    //     let now = new Date();
    //     if (!doc.createdAt) {
    //         doc.createdAt = now;
    //     }
    //     doc.modifiedAt = now;
    // }

    next();

    // tslint:disable-next-line:no-invalid-this
    return this;
});

/* tslint:disable-next-line */
const Model = mongoose.model<IProjectDocument>('project', schema, 'projects', true);

export { Model }
