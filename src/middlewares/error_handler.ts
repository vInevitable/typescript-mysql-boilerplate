import {ErrorCodes, ErrorMessages} from 'constants/error_constants';
import {HttpStatusCodes} from 'constants/status_codes';
import {NextFunction, Request, Response} from 'express';
import {responseBuilder} from 'helpers/response_builder';
import logger from 'logger';
import {APIError, IServiceResponse, ServiceResponse} from 'models';

export function errorHandler(error: Error, req: Request, res: Response, next?: NextFunction): void {
    logger.info('errorHandler()');
    try {
        logger.error('handling ERROR :', error);
        const response: IServiceResponse = new ServiceResponse(
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
            ErrorMessages.INTERNAL_SERVER_ERROR,
            null);
        return responseBuilder(response, res);
    } catch (e) {
        logger.error('Error in middlewares.errorHandler()', e);
    }
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        errors: [new APIError(ErrorMessages.INTERNAL_SERVER_ERROR, ErrorCodes.SYSTEM_ERROR, null)]
    });
}
