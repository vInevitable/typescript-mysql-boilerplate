import {Application} from 'express';
import {SWAGGER_DOC_PATH} from 'loaders/config';
import log from 'logger';
import {errorHandler} from 'middlewares/error_handler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import v1Routes from './v1';

const swaggerDocument = YAML.load(SWAGGER_DOC_PATH);

export default function initializeRoutes(app: Application) {
    log.info('initializeRoutes()');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1/', v1Routes);
    app.use(errorHandler);
}
