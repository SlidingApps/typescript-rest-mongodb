
/**
 * The factory used to instantiate the resources.
 */
export interface IResourceFactory {
	/**
	 * Create a new service object. Called before each request handling.
	 */
    create: (resource: Function) => any;
	/**
	 * Return the type used to handle requests to the target service.
	 * By default, returns the serviceClass received, but you can use this
	 * to implement IoC integrations.
	 */
    getTargetClass: (resource: Function) => FunctionConstructor;
}