
export interface IDomainEntity { }
export interface IDomainEntityList { }

export abstract class DomainEntity implements IDomainEntity { }
export abstract class DomainEntityList extends Array implements IDomainEntityList { }

