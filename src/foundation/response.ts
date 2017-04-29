
import {  Errors } from 'typescript-rest';

export class Response {

    public static send<TResponse>(response: TResponse, resolve: (value: TResponse|PromiseLike<TResponse>) => void, reject: (reason?: any) => void): void {
        if (!!response) {
            resolve(response);
        } else {
            reject(new Errors.NotFoundError());
        }
    }

}
