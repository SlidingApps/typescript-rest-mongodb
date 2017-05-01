
import * as Foundation from '../../../../foundation';

export class CreatePoject extends Foundation.Intent {
    constructor(public id: string, public name: string) { 
        super();
    }
}
