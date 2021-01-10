export interface IEmailSender {
    name?: string;
    emailId: string;
    greeting?: string;
    contactNumber?: string;
    contactAddress?: string;
}

export class EmailSender implements IEmailSender {
    public name?: string;
    public emailId: string;
    public greeting?: string;
    public contactNumber?: string;
    public contactAddress?: string;

    constructor(emailId: string, name?: string, greeting?: string, contactNumber?: string, contactAddress?: string) {
        this.name = name;
        this.emailId = emailId;
        this.greeting = greeting;
        this.contactNumber = contactNumber;
        this.contactAddress = contactAddress;
    }

}
