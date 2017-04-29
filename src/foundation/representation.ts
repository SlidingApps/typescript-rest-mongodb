
export interface IRepresentation { }
export interface ICollectionRepresentation { }

export abstract class Representation implements IRepresentation { }
export abstract class CollectionRepresentation extends Representation implements ICollectionRepresentation { }

export abstract class DataRepresentation extends Representation { }
