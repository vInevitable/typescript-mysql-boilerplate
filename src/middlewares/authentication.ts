import {AUTHENTICATION} from 'constants/app_defaults';
import {ErrorCodes, ErrorMessages} from 'constants/error_constants';
import {HttpStatusCodes} from 'constants/status_codes';
import {NextFunction, Response} from 'express';
import {verifyAccessToken} from 'helpers/authentication';
import {responseBuilder} from 'helpers/response_builder';
import logger from 'logger';
import {APIError, ServiceResponse, UserSession} from 'models';
import * as nodeUtil from 'util';

export function isAuthenticated(req: any, res: Response, next: NextFunction): void {
    if (AUTHENTICATION.enabled) {
        logger.info('isAuthenticated()');
        let token = null;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }
        try {
            if (!token) {
                logger.debug('TOKEN is missing!');
                const response = new ServiceResponse(HttpStatusCodes.UNAUTHORIZED, 'Token Required.', null, true,
                    [new APIError('Token required.', ErrorCodes.UNAUTHORIZED, 'jwtToken')]);
                return responseBuilder(response, res, next, req);
            }
            const decode: any = verifyAccessToken(token);
            req.userSession = new UserSession(decode.userId, decode.roleId);
            logger.debug('LOGGED IN USER:' + nodeUtil.inspect(req.userSession));
            next();
        } catch (error) {
            logger.error('ERROR occurred in isAuthenticated() ', error);
            let response = new ServiceResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR,
                ErrorMessages.INTERNAL_SERVER_ERROR, true);
            if (error?.message === 'jwt expired') {
                response = new ServiceResponse(HttpStatusCodes.UNAUTHORIZED,
                    ErrorMessages.SESSION_EXPIRED, true);
            }
            return responseBuilder(response, res, next, req);
        }
    } else {
        next();
    }
}
