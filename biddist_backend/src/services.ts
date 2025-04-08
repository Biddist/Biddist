import paramStore from "./paramManager.js";
import Stripe from "stripe";
import {MailtrapClient} from "mailtrap"
class Services {
    private static stripe: Stripe;
    private static mailtrap = null;
    /**
     * Returns  (possibly initializing) Mailtrap singleton client
     */
    public static getMailtrap = async()=>{
        if(Services.mailtrap != null){
            return Services.mailtrap;
        }
        else {
            const params = await paramStore.getAllParams();
            Services.mailtrap = new MailtrapClient({
                token: params.mailtrap
            })
            return Services.mailtrap;
        }
    }
    /**
     * Sends an email message using mailtrap client. Meant for 2FA.
     * @param email the email the message is sent to.
     * @param text the text of the message
     * @param subject the subject of the message.
     */
    public static sendMessage = async (email: string,text: string, subject: string) => {
        const client = await Services.getMailtrap();
        await client.send({
            from: {
                email: "hello@demomailtrap.co",
                name: "Mailtrap Test",
            },
            to: [{
                email: email,
            }],
            text: text,
            subject: subject,
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