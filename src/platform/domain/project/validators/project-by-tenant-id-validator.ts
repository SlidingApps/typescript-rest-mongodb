
import { Singleton } from 'typescript-ioc';
import { AbstractValidator, Severity } from 'fluent-ts-validator';

import { ProjectByTenantID } from '../queries';

@Singleton
export class ProjectByTenantIDValidator extends AbstractValidator<ProjectByTenantID> {
    constructor() {
        super();

        this.validateIf(x => x.tenantID)
            .isNotNull()
            .isNotEmpty();
    }
}
