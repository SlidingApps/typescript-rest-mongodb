/* tslint:disable */

interface ClassInfo { 
    constructor: any 
};

interface MemberInfo {
    
}

const HAL_SERIALIZATION_CACHE : Array<ClassInfo> = [];

function Serializable(constructor: Function) {
    console.log('HalSerializable(): evaluated', constructor);
}

function Property() {
    console.log('g(): evaluated');
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('g(): called', target, propertyKey, descriptor);
    }
}

export { Serializable, Property }