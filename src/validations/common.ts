import JoiDate from '@hapi/joi-date';
import {MIN_SEARCH_TEXT_LENGTH} from 'constants/app_defaults';
import {ErrorMessages} from 'constants/error_constants';
import {HttpStatusCodes} from 'constants/status_codes';
import * as JoiBase from 'joi';
import logger from 'logger';
import {APIError, IAPIError, IServiceResponse, ServiceResponse} from 'models';

const Joi = JoiBase.extend(JoiDate);

export function isoDate() {
    return Joi.date().format('YYYY-MM-DD');
}

export function mobileNumberValidation() {
    return Joi.string().min(10).pattern(/^\+?([0-9]{1,3})?-?\s?[1-9]{1}[0-9]{9}$/);
}

export function postalCodeValidation() {
    return Joi.string().pattern(/^[0-9]{6}$/);
}

export function idFilterValidation() {
    return Joi.string().pattern(/^[0-9]+(,[0-9]+)*$/);
}

export function searchTextValidation() {
    return Joi.string().min(MIN_SEARCH_TEXT_LENGTH)
        .messages({
            'any.min': 'Search text field should be minimum of ' + MIN_SEARCH_TEXT_LENGTH
        });
}

export function uniqueIdentifiedValidation() {
    return Joi.any();
}

export function baseQueryListValidation() {
    return Joi.object().keys({
        searchText: searchTextValidation(),
        queryId: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number(),
        sortBy: Joi.string(),
        sortOrder: Joi.string().valid('asc', 'desc'),
    });
}

export function idValidation(field?: string) {
    return Joi.object().keys({
        id: uniqueIdentifiedValidation()
            .required()
            .messages({
                'any.required': ErrorMessages.IS_REQUIRED.replace('$field', field || 'id'),
                'string.pattern.base': ErrorMessages.INVALID_NUMBER_STRING.replace('$field', field || 'id')
            }),
    });
}

export function phoneSchema() {
    return Joi.object().keys({
        phoneCountryCode: Joi.string()
            .required()
            .max(5)
            .messages({
                'any.required': 'phoneCountryCode is required.',
                'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneCountryCode').replace('$length', '5'),
            }),
        phoneNumber: Joi.string()
            .max(12)
            .messages({
                'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneNumber').replace('$length', '12'),
                'string.pattern.base': ErrorMessages.INVALID_VALUE.replace('$field', 'phoneNumber').replace('$value', 'mobile number with 10 digits.')
            }),

    });
}

export function addressSchema() {
    return Joi.object().keys({
        addressLine1: Joi.string()
            .required()
            .max(255)
            .messages({
                'any.required': 'Address line1 is required.',
                'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'addressLine1').replace('$length', '255'),
            }),
        addressLine2: Joi.string()
            .max(255)
            .allow('', null)
            .messages({
                'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'addressLine2').replace('$length', '255'),
            }),
        city: idValidation('city.id')
            .required()
            .messages({
                'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'city'),
            }),
        state: idValidation()
            .required('state.id')
            .messages({
                'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'state'),
            }),
        country: idValidation('country.id')
            .required()
            .messages({
                'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'country'),
            }),
        postalCode: Joi.number()
            .required()
            .messages({
                'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'postalCode'),
                'string.pattern.base': 'postalCode should be length of 6 digits.',
            }),
    });
}

const buildUsefulErrorObject = (errors: any): IServiceResponse => {
    const usefulErrors: IAPIError[] = [];
    for (const error of errors.error.details) {
        if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
            usefulErrors.push(new APIError(error.message, error.type, error.path.join('_')));
        } else {
            logger.debug('missed error:' + error);
        }
    }
    return new ServiceResponse(HttpStatusCodes.BAD_REQUEST, 'Please fill all Mandatory fields with valid values!.',
        null, true, usefulErrors);
};

export async function validate(schema, req, res, next) {
    try {
        logger.info('START of common.validator.validate()');
        schema = schema.append({
            token: Joi.string().allow(''),
        });
        let body = Object.assign({}, req.params, req.query);
        if (req.method === 'POST' || req.method === 'PUT') {
            body = Object.assign(body, req.body);
        }
        const result = await schema.validate(body, {abortEarly: false});
        if (result.error) {
            logger.debug(JSON.stringify(result));
            const errorResponse: IServiceResponse = buildUsefulErrorObject(result);
            res.status(errorResponse.statusCode || HttpStatusCodes.BAD_REQUEST).send({errors: errorResponse.errors});
        } else {
            next();
        }
    } catch (error) {
        logger.error('ERROR occurred in validation.common.validate()');
        next(error);
    }
}
