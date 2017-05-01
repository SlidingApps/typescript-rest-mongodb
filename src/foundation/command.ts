
export interface ICommand {

}

export abstract class Command<TIntent> implements ICommand {

    constructor(intent?: TIntent) {
        this.intent = intent;
    }

    public intent: TIntent;
    
}
