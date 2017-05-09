
import * as express from 'express';

import { Configuration } from './configuration';
import * as Metadata from './metadata';

export class Mapper {

    public map<TResource>(baseUrl: string, instance: TResource, isHalContentType = true): any {
        if (Configuration.resources.has(instance.constructor.name) && isHalContentType) {
            let resourceInfo: Metadata.ResourceInfo = Configuration.resources.get(instance.constructor.name);
            let halResource: any = { 
                _links: {
                    self: `${baseUrl}/${resourceInfo.path}`
                } 
            };

            resourceInfo.methods.forEach((value, key) => { 
                const getter = value.descriptor['get'];
                if (!!getter) {
                    halResource[key] = getter.apply(instance);
                }
            });

            resourceInfo.properties.forEach((value, key) => halResource[key] = instance[key]);

            return halResource;
        } else {
            return instance;
        }
    }
}
