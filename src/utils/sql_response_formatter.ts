import {camelCase, forEach, isArray, isPlainObject} from 'lodash';
import logger from 'logger';

function formCamelCaseForArray(data: any[]) {
    return data.map(toCamelCase);
}

export function toCamelCase(object: any) {
    const camelCaseObject = {};
    try {
        if (Array.isArray(object)) {
            return formCamelCaseForArray(object);
        } else if (!isNaN(object)) {
            return object;
        }
        forEach(object,
            (value, key, i) => {
                if (isPlainObject(value)) {
                    value = toCamelCase(value);
                } else if (isArray(value)) {
                    value = formCamelCaseForArray(value);
                }
                camelCaseObject[camelCase(key)] = value;
            });
        return camelCaseObject;
    } catch (error) {
        logger.error('ERROR occurred in toCamelCase()');
        logger.error(error);
        return object;
    }
}
