
import { Configuration } from './configuration';
import * as Metadata from './metadata';

export class Mapper {

    public map<TRepresentation>(baseUrl: string, instance: TRepresentation, isHalContentType = true): any {
        if (Configuration.resources.has(instance.constructor.name) && isHalContentType) {
            let resourceInfo: Metadata.ResourceInfo = Configuration.resources.get(instance.constructor.name);
            let halResource: any = { 
                _links: {
                    self: `${baseUrl}/${resourceInfo.path}`
                } 
            };

            this.addMethods(instance, halResource);
            this.addProperties(instance, halResource);

            return halResource;
        } else {
            let resource: any = { 
            };

            this.addMethods(instance, resource);
            this.addProperties(instance, resource);

            return resource;
        }
    }

    private addMethods<TRepresentation>(instance: TRepresentation, resource: any): any {
        let resourceInfo: Metadata.ResourceInfo = Configuration.resources.get(instance.constructor.name);

        resourceInfo.methods.forEach((value, key) => { 
                const getter = value.descriptor['get'];
                if (!!getter) {
                    resource[key] = getter.apply(instance);
                }
            });

        return resource;
    }

    private addProperties<TRepresentation>(instance: TRepresentation, resource: any): any {
        let resourceInfo: Metadata.ResourceInfo = Configuration.resources.get(instance.constructor.name);
        resourceInfo.properties.forEach((value, key) => resource[key] = instance[key]);

        return resource;

    }
}
