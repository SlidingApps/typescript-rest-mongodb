
export interface IApplicationConfig {
    apiBaseUrl: string;
    db: IDatabaseConfig;
}
 
export interface IDatabaseConfig {
    uri: string;
}

// tslint:disable-next-line:variable-name
const ApplicationConfig = require('./application-config.json');

export class Configuration {

    // tslint:disable-next-line:variable-name
    private static application_config: IApplicationConfig = (<IApplicationConfig>ApplicationConfig);

    public static get ENVIRONMENT(): string { return process.env.NODE_ENV || 'development'; }

    public static get IS_PRODUCTION(): boolean { return Configuration.ENVIRONMENT === 'production'; }

    public static get IS_DEVELOPMENT(): boolean { return Configuration.ENVIRONMENT === 'development'; }

    public static get APPLICATION_CONFIG(): IApplicationConfig { return Configuration.application_config; }
}
