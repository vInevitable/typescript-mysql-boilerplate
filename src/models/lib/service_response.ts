import {ErrorCodes} from 'constants/error_constants';
import {HttpStatusCodes} from 'constants/status_codes';
import {APIError} from 'models';

export interface IServiceResponse {
    statusCode: number;
    errors?: APIError[];
    data?: any;
    message: string;
    showMessage: boolean;

    addError?(apiError: APIError): any;

    addServerError?(errorMessage: string): any;
}

export class ServiceResponse implements IServiceResponse {
    public statusCode: number;
    public errors?: APIError[];
    public data?: any;
    public message: string;
    public showMessage: boolean;

    constructor(statusCode: number, message: string, showMessage: boolean, data?: any, errors?: APIError[]) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.showMessage = showMessage;
        this.errors = errors;
    }

    public addError(apiError: APIError): any {
        if (!this.errors) {
            this.errors = [];
        }
        this.errors.push(apiError);
    }

    public addServerError(errorMessage: string, responseMessage?: string): any {
        this.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        this.message = responseMessage || errorMessage;
        this.addError(new APIError(errorMessage || 'Failed to process the request due to technical difficulties'
            , ErrorCodes.SYSTEM_ERROR));
    }

}
