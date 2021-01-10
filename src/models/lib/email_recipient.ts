export interface IEmailRecipient {
    toEmailIds: string[];
    ccEmailIds?: string[];
    bccEmailIds?: string[];
}

export class EmailRecipient implements IEmailRecipient {
    public toEmailIds: string[];
    public ccEmailIds?: string[];
    public bccEmailIds?: string[];

    constructor(toEmailIds: string[], ccEmailIds?: string[], bccEmailIds?: [string]) {
        this.toEmailIds = toEmailIds;
        this.ccEmailIds = ccEmailIds;
        this.bccEmailIds = bccEmailIds;
    }
}
