import { config as dotenvConfig } from "dotenv";

dotenvConfig();

interface IConfig {
    PORT: string;
    DB_USERNAME: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    JWT_SECRET: string;
    // AWS_ACCESSKEY: string;
    // AWS_SECRETKEY: string;
    // AWS_REGION: string;
    // AWS_SENDEREMAIL: string;
    // SUPER_ADMIN_ASSESSMENT_SECRET_KEY: string;
    // JUDGE0_RAPIDAPI_KEY: string;
    // JUDGE0_RAPIDAPI_HOST: string;
    // JUDGE0_API_ENDPOINT_PREFIX: string;
    // GCLOUD_STORAGE_TESTCASES_BUCKET: string;
    // GOOGLE_APPLICATION_CREDENTIALS: string;
    // NEWRELIC_LICENSE_KEY: string;
    // NEWRELIC_LOGGING_BASE_URL: string;
    // NEWRELIC_APP_NAME: string;
    // ENVIRONMENT: string;
    // SUPER_ADMIN_ACCESS_TOKEN_KEY: string;

    // ACCESSKEY: string;
    // SECRETKEY: string;
    // USER_POOL_ID: string;
    // APP_CLIENT_ID: string;
    // REGION: string;
    // CLIENT_SECRET: string;
    // SUPER_AMDIN_EMAIL_ID: string;
}

const config: IConfig = {
    PORT: process.env.PORT || "",
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: process.env.DB_PORT || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
}

export default config;