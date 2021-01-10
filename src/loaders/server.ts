import bodyParser from 'body-parser';
import cors from 'cors';
import {Application} from 'express';
import logger from 'logger';
import morgan from 'morgan';
import {API_CALL_LOG_FORMAT, CORS_ORIGIN_URLS, REQUEST_BODY_LIMIT} from './config';

export function loadServer(app: Application) {
    logger.info('initializationExpressServer()');
    const corsOptions = {
        origin: CORS_ORIGIN_URLS,
        methods: 'GET, OPTIONS, PUT, POST, DELETE',
        exposedHeaders: 'message,showMessage'
    };

    app.use(bodyParser.urlencoded({
        limit: `${REQUEST_BODY_LIMIT}mb`,
        extended: true,
    }));

    app.use(bodyParser.json({
        limit: `${REQUEST_BODY_LIMIT}mb`,
    }));

    app.use(cors(corsOptions));

    const stream = {
        write: (message: string) => {
            logger.info(message);
        },
    };
    app.use(morgan(API_CALL_LOG_FORMAT, {stream}));
}
