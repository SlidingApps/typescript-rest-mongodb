/* tslint:disable */
import * as _ from 'lodash';

import * as Metadata from './metadata';
import { Configuration } from './configuration';

export function HalResource(path: string) {
    return function(...args: any[]) {
        args = _.without(args, undefined);
        if (args.length === 1) {
            const resourceInfo: Metadata.ResourceInfo = ResourceOnClassDecorator.apply(this, [args[0], path]);
            resourceInfo.path = path;
        } else {
            throw new Error(`Invalid @HalResource decorator declaration: ${path}`);
        }
    };
}

export function HalProperty(path?: string) {
    return function(...args: any[]) {
        args = _.without(args, undefined);
        if (args.length === 3 && typeof args[2] === 'object') {
            return PropertyOnMethodDecorator.apply(this, [args[0], args[1], args[2], path]);
        } else if (args.length === 2) {
            return PropertyOnPropertyDecorator.apply(this, [args[0], args[1], path]);
        } else {
            throw new Error(`Invalid @Property decorator declaration: ${path}`);
        }
    };
}

function ResourceOnClassDecorator(target: Function): Metadata.ResourceInfo {
    const resourceInfo: Metadata.ResourceInfo = Configuration.registerClass(target.prototype.constructor);

    return resourceInfo;
}

function PropertyOnMethodDecorator(target: Function, name: string, descriptor: PropertyDescriptor, path: string): Metadata.ResourceMethodInfo {
    const methodInfo: Metadata.ResourceMethodInfo = Configuration.registerMethod(target, name, descriptor, path);

    return methodInfo;
}

function PropertyOnPropertyDecorator(target: Function, name: string, path: string): Metadata.ResourcePropertyInfo {
    const propertyInfo: Metadata.ResourcePropertyInfo = Configuration.registerProperty(target, name, path);

    return propertyInfo;
}
