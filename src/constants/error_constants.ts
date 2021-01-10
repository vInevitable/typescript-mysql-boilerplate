// import Ext_Er_msg

export const ErrorCodes = {
    VALIDATION_ERROR: 'invalid_field',
    SYSTEM_ERROR: 'tech_difficulties',
    UNAUTHORIZED: 'permission_denied',
    RESOURCE_NOT_FOUND: 'resource_not_found',
    RESOURCE_ALREADY_EXIST: 'resource_already_exist',
};

export const ErrorMessages = {
    IS_REQUIRED: '$field is required',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    INVALID_DATE: '$field is invalid date. Date format should be: YYYY-MM-DD.',
    INVALID_FIELD: 'Invalid $field.',
    INVALID_LENGTH: '$field is more than $length length.',
    INVALID_VALUE: '$field must be one of $values',
    MINIMUM_ITEM_REQUIRED: '$field should contain at least $value items.',
    FORBIDDEN: 'Access forbidden.',
    NOT_ALLOWED: '$field is not allowed',
    INVALID_NUMBER_STRING: '$field must be numeric string.',
    DUPLICATE_VALUES: '$field contain duplicate values of $value.',
    INVALID_EMAIL: '$field is not a valid email.',
    SESSION_EXPIRED: 'Session Expired.',
};
