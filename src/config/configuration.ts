export class Configuration {
    public static get ENVIRONMENT(): string { return process.env.NODE_ENV || 'development'; }

    public static get IS_PRODUCTION(): boolean { return Configuration.ENVIRONMENT === 'production'; }

    public static get IS_DEVELOPMENT(): boolean { return Configuration.ENVIRONMENT === 'development'; }
}
