export function buildErrorMessage(fileName: string, functionName: string): string {
    return 'ERROR occurred in ' + fileName + '.' + functionName;
}

import logger from 'logger';

export function generateRandomAlphaNumericString(length: number): string {
    const possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let str = '';
    for (let i = 0; i < length; ++i) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

export function generateRandomNumericString(length: number): string {
    const possible = '0123456789';

    let str = '';
    for (let i = 0; i < length; ++i) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

export function getNumber(input) {
    try {
        if (typeof input != 'number') {
            input = parseInt(input, 10);
        }
    } catch (e) {
        logger.debug('ERROR in getNumber');
        throw e;
    }
    return input;
}

export function getNumberOrDefault(input, defaultValue) {
    try {
        input = getNumber(input);
        input = isNaN(input) ? defaultValue : input;
    } catch (e) {
        logger.debug('Input is not number. Returning Default value');
        return defaultValue;
    }
    return input;
}

export function isNotEmptyArray(arrayObject) {
    try {
        if (arrayObject && Array.isArray(arrayObject) && arrayObject.length > 0) {
            return true;
        }
    } catch (e) {
        logger.debug(e);
    }
    return false;
}

export function checkValidJson(input: string): boolean {
    try {
        JSON.parse(input);
        return true;
    } catch (e) {
        logger.error('ERROR occurred in utils.string.toJson()', e);
    }
    return false;
}
