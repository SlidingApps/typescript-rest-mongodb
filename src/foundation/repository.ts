
import * as mongoose from 'mongoose';

export interface IRead<T> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: string, callback: (error: any, result: T) => void) => void;
  findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
  find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;
}

export interface IWrite<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  // tslint:disable-next-line:variable-name
  update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
  // tslint:disable-next-line:variable-name
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export abstract class Repository<TDocument extends mongoose.Document> implements IRead<TDocument>, IWrite<TDocument> {

  protected model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  public create<TAttributes>(item: TAttributes, callback: (error: any, result: TDocument) => void) {
    this.model.create(item, callback);
  }

  public retrieve(callback: (error: any, result: TDocument) => void) {
    this.model.find({}, callback);
  }

  // tslint:disable-next-line:variable-name
  public update(_id: mongoose.Types.ObjectId, item: TDocument, callback: (error: any, result: any) => void) {
    this.model.update({ _id: _id }, item, callback);
  }

  // tslint:disable-next-line:variable-name
  public delete(_id: string, callback: (error: any, result: any) => void) {
    this.model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  // tslint:disable-next-line:variable-name
  public findById(_id: string, callback: (error: any, result: TDocument) => void) {
    this.model.findById(_id, callback);
  }

  public findOne(cond?: Object, callback?: (err: any, res: TDocument) => void): mongoose.Query<TDocument> {
    return this.model.findOne(cond, callback);
  }

  public find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: TDocument[]) => void): mongoose.Query<TDocument[]> {
    return this.model.find(cond, options, callback);
  }

  // tslint:disable-next-line:variable-name
  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

}
