import logger from "logger";
import {buildErrorMessage} from "utils/string";
import {Application} from 'express';
import express from 'express';
import {loadServer} from "loaders/server";
import {sqlConnection} from "data_stores/mysql/database";

export async function startApplication() {
    try {
        logger.info('startApplication()');
        const app: Application = express();
        loadServer(app);
        await sqlConnection();
        app.listen(8000, () => {
            logger.debug('SERVER STARTED ON PORT: ' + 8000)
        })
    } catch (error) {
        logger.error(buildErrorMessage('index', 'startApplication()'), error);
        logger.debug('Stopping application!!')
        process.exit(1);
    }
}

startApplication();
