export interface IAPIError {
    message: string;
    errorCode: string;
    fieldName: string;
}

export class APIError implements IAPIError {
    public message: string;
    public errorCode: string;
    public fieldName: string;

    constructor(message: string, errorCode?: string, fieldName?: string) {
        this.message = message;
        this.errorCode = errorCode;
        this.fieldName = fieldName;
    }
}
