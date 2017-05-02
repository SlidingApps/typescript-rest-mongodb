
export interface IDomainEntity { }
export interface IDomainEntityList { }

export abstract class DomainEntity<TDocument> implements IDomainEntity {
    protected $$data: TDocument;

    public $$getData(): TDocument { return this.$$data; }
}

export abstract class DomainEntityList extends Array implements IDomainEntityList { }

