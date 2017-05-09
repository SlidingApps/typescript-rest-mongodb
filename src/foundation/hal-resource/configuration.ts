
import * as Metadata from './metadata';
import { IResourceFactory } from './configuration-types';

export class Configuration {

    public static resources: Map<string, Metadata.ResourceInfo> = new Map<string, Metadata.ResourceInfo>();

    public static resourceFactory: IResourceFactory = {
        create: (resource: any) => {
            return new resource();
        },

        getTargetClass: (resource: Function) => {
            return <FunctionConstructor>resource;
        }
    };
    
    public static registerClass(target: Function): Metadata.ResourceInfo {
        target = Configuration.resourceFactory.getTargetClass(target);
        
        const name: string = target['name'];
        if (!Configuration.resources.has(name)) {
            Configuration.resources.set(name, new Metadata.ResourceInfo(target));
        }
        const resourceInfo: Metadata.ResourceInfo = Configuration.resources.get(name);

        return resourceInfo;
    }

    public static registerMethod(target: Function, name: string, descriptor: PropertyDescriptor, path: string): Metadata.ResourceMethodInfo {
        if (name) {
            const resourceInfo: Metadata.ResourceInfo = Configuration.registerClass(target.constructor);
            if (!resourceInfo.methods.has(name)) {
                resourceInfo.methods.set(name, new Metadata.ResourceMethodInfo(name, descriptor, path));
            }
            const methodInfo: Metadata.ResourceMethodInfo = resourceInfo.methods.get(name);
            
            return methodInfo;
        }

        return null;
    }

    public static registerProperty(target: Function, name: string, path: string): Metadata.ResourcePropertyInfo {
        if (name) {
            const resourceInfo: Metadata.ResourceInfo = Configuration.registerClass(target.constructor);
            if (!resourceInfo.properties.has(name)) {
                resourceInfo.properties.set(name, new Metadata.ResourcePropertyInfo(name, path));
            }
            const propertyInfo: Metadata.ResourcePropertyInfo = resourceInfo.properties.get(name);
            
            return propertyInfo;
        }

        return null;
    }

}
