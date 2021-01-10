export class AppError extends Error {
    public additionalInfo?: string;

    constructor(message, additionalInfo?) {
        super(message);
        this.additionalInfo = additionalInfo;
    }
}
