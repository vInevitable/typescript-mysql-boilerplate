import {emailClientLoader} from 'loaders/email_client';
import log from 'logger';
import {IEmailRecipient, IEmailSender} from 'models';

const TAG = 'helpers.email';

export async function sendEmail(emailSender: IEmailSender, emailRecipient: IEmailRecipient, subject: string,
                                body: string, attachments?: any[]) {
    log.info(`${TAG}.sendEmail()`);
    try {
        const emailClient = emailClientLoader();
        // TODO set params as per the email client and send email.
        return await emailClient.sendMail({
            from: emailSender.emailId,
            to: emailRecipient.toEmailIds,
            cc: emailRecipient?.ccEmailIds ?? [],
            bcc: emailRecipient?.bccEmailIds ?? [],
            subject: subject,
            html: body,
            attachments: attachments,
        });
    } catch (error) {
        log.error(`ERROR occurred in ${TAG}.sendEmail()`, error);
        throw error;
    }
}
