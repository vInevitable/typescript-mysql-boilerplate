import {ErrorCodes, ErrorMessages} from 'constants/error_constants';
import {ROLES} from 'constants/master_data_constants';
import {HttpStatusCodes} from 'constants/status_codes';
import {NextFunction, Response} from 'express';
import {responseBuilder} from 'helpers/response_builder';
import logger from 'logger';
import {APIError, ServiceResponse} from 'models';
import * as nodeUtil from 'util';

export function isAdmin(req: any, res: Response, next: NextFunction): void {
    const response = new ServiceResponse(HttpStatusCodes.FORBIDDEN,
        ErrorMessages.FORBIDDEN, true);
    try {
        logger.debug('LOGGED IN USER: ', nodeUtil.inspect(req.userSession));
        if (ROLES['1'].id == req?.userSession?.roleId || ROLES['2'].id == req?.userSession?.roleId) {
            next();
        } else {
            response.addError(new APIError('Access Forbidden.', ErrorCodes.UNAUTHORIZED, 'role'));
            responseBuilder(response, res, next, req);
        }
    } catch (error) {
        logger.error('ERROR occurred in middlewares.permission.isAdmin()', error);
        response.addServerError('Failed to validate permission due to technical issues.');
        return responseBuilder(response, res, next, req);
    }
}
