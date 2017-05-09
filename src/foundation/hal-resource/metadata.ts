/* tslint:disable */

/**
 * Enumeration of accepted parameter types
 */
export enum ParamType {
    path,
    query,
    header,
    cookie,
    form,
    body,
    param,
    file,
    files,
    context,
    context_request,
    context_response,
    context_next,
    context_accept,
    context_accept_language
}

export class MethodParam {
    constructor(name: string, type: Function, paramType: ParamType) {
        this.name = name;
        this.type = type;
        this.paramType = paramType;
    }

    name: string;
    type: Function;
    paramType: ParamType;
}

export class ResourceInfo { 
    constructor(targetClass: any) {
        this.targetClass = targetClass;
    }

    public targetClass: any;
    public methods: Map<string, ResourceMethodInfo> = new Map<string, ResourceMethodInfo>();
    public properties: Map<string, ResourcePropertyInfo> = new Map<string, ResourcePropertyInfo>();
    public path: string;
};

export class ResourceMethodInfo {
    constructor(name: string, descriptor: PropertyDescriptor, path: string) {
        this.name = name;
        this.descriptor = descriptor;
        this.path = path;
    }

    public name: string;
    public descriptor: PropertyDescriptor;
    public path: string;
}

export class ResourcePropertyInfo {
    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }

    public name: string;
    public path: string;
}
