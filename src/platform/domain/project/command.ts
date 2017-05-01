
import * as Foundation from '../../../foundation';

export class Command<TIntent> extends Foundation.Command<TIntent> {

    constructor(public tenantID: string, intent?: TIntent) {
        super(intent);
    }
}
