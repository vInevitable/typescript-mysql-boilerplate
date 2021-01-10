import {config} from 'dotenv';
import {existsSync, mkdirSync} from 'fs';
import logger from 'logger';
// import {AppError} from 'models';
import {resolve} from 'path';

config({path: resolve(__dirname, '../../.env')});

export const PORT = process.env.PORT || 8001;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'blling@automation';
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'blling@automation_r';
export const JWT_ACCESS_TOKEN_EXPIRY_TIME = +process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME || 2 * 60 * 60;
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = +process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME || 30 * 24 * 60 * 60;
export const CORS_ORIGIN_URLS = process.env.CORS_ORIGIN || '*';
export const API_CALL_LOG_FORMAT = process.env.API_CALL_LOG_FORMAT ||
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
export const REQUEST_BODY_LIMIT = +process.env.REQUEST_BODY_LIMIT || 100;
export const CONF_DIR_PATH = +process.env.CONF_DIR_PATH || resolve('./config/');
export const SWAGGER_DOC_PATH = process.env.SWAGGER_DOC_PATH || resolve('./oas_doc.yml');
export const AES_ENC_KEY = process.env.ASE_ENC_KEY || 'bf3c199c2470cb477d907b1e0917c17b';
export const AES_IV = process.env.ASE_IV || '5183666c72eec9e4';
export const SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID || '';
export const SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
export const DB_API_BASE_URL = process.env.DB_API_BASE_URL ||
    'http://ec2-15-206-190-15.ap-south-1.compute.amazonaws.com:5050/api';
export const SCHEDULE_SAVE_FOLDER = process.env.SCHEDULE_SAVE_FOLDER ? resolve(process.env.SCHEDULE_SAVE_FOLDER) :
    resolve('./schedules');
if (!existsSync(SCHEDULE_SAVE_FOLDER)) {
    mkdirSync(SCHEDULE_SAVE_FOLDER);
    logger.debug('CREATED FOLDER ' + SCHEDULE_SAVE_FOLDER);
}

export const AWS_S3 = {
    accessKeyId: process.env.ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    acl: process.env.ACL || '',
    bucketName: process.env.BUCKET_NAME || '',
    region: process.env.region || '',

};
export const MYSQL_DATABASE = {
    address: process.env.SQL_DATABASE_ADDRESS || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.SQL_DATABASE_USERNAME,
    password: process.env.SQL_DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME || '',
};

export const GOOGLE_OAUTH = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,

};

export const HOSTED_DOMAIN = process.env.HOSTED_DOMAIN || 'gmail.com';

// export async function checkEnv() {
//     logger.info('STARTED Validation of env variables!');
//     const mandatoryFields = ['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD'];
//     mandatoryFields.forEach((field) => {
//         if (!process.env[field]) {
//             throw new AppError(`Required configuration '${field}' is missing`);
//         }
//     });
// }
