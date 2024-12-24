import Mailgun from "mailgun-js";
import FormData from 'form-data';
import paramStore from "./paramManager";

class EmailService{
    static mailgun: Mailgun.Mailgun;
    static initMailgun = async()=>{
        this.mailgun = new Mailgun({
            apiKey: paramStore.params.mailgun,
            domain: paramStore.params.mailgun_domain,
        })
    }
}