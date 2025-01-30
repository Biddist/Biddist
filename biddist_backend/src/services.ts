import Mailgun from "mailgun.js"
import formData from "form-data"
import paramStore from "./paramManager";
import Stripe from "stripe"
import {IMailgunClient} from "mailgun.js/Interfaces";
class Services {
    private static stripe: Stripe;
    private static MailgunFactory: Mailgun = new Mailgun(formData);
    private static mailgun: IMailgunClient;
    /**
     * Returns  (possibly initializing) Mailgun singleton client
     */
    public static getMailgun = async()=>{
        if(Services.mailgun){
            return Services.mailgun;
        }
        else {
            const params = await paramStore.getAllParams();
            Services.mailgun = Services.MailgunFactory.client({
                username: "api",
                key: params.mailgun,
            });
            return Services.mailgun;
        }
    }
    /**
     * Sends an email message using mailgun client. Meant for 2FA.
     * @param email the email the message is sent to.
     * @param text the text of the message
     * @param subject the subject of the message.
     */
    public static sendMessage = async (email: string,text: string, subject) => {
        const client = await Services.getMailgun();
        const params = await paramStore.getAllParams();
        await client.messages.create(params.mailgun_domain,{
            from: 'donotreply@' + params.mailgun_domain,
            subject: subject,
            to: email,
            text: text,
        });
    }
    /**
     * Returns (possibly initializing) stripe client using private key.
     */
    public static getStripe = async()=>{
        if(Services.stripe){
            return Services.stripe;
        }
        else {
            const params = await paramStore.getAllParams();
            Services.stripe = new Stripe(params.stripe);
            return Services.stripe;
        }
    }
}
export {Services}