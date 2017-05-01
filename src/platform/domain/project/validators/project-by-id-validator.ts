
import { Singleton } from 'typescript-ioc';
import { AbstractValidator, Severity } from 'fluent-ts-validator';

import { ProjectByID } from '../queries';

@Singleton
export class ProjectByIDValidator extends AbstractValidator<ProjectByID> {
    constructor() {
        super();

        this.validateIf(x => x.tenantID)
            .isNotNull()
            .isNotEmpty();

        this.validateIfString(x => x.projectID)
            .isNotNull()
            .isNotEmpty();
    }
}
