
import { Singleton, Inject } from 'typescript-ioc';
import { ValidationResult } from 'fluent-ts-validator';

import { Query } from '../';
import { ProjectByIDValidator } from './project-by-id-validator'
import { ProjectByTenantIDValidator } from './project-by-tenant-id-validator'

export type Validatable = 
    Query.ProjectByID | 
    Query.ProjectByTenantID
    ;

@Singleton
export class Validator {

    public validate(instance: any): ValidationResult {
        var result: ValidationResult;

        if (instance instanceof Query.ProjectByID) {
            const validator: ProjectByIDValidator = new ProjectByIDValidator();
            result = validator.validate(instance);
        }

        if (instance instanceof Query.ProjectByTenantID) {
            const validator: ProjectByTenantIDValidator = new ProjectByTenantIDValidator();
            result = validator.validate(instance);
        }

        if (result.isValid()) {
            return result;
        } else {
            throw new Error(result.getFailureMessages().join('\n'));
        }
    }

}
