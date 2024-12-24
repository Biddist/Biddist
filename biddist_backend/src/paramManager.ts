import { GetParametersCommand, SSMClient } from "@aws-sdk/client-ssm";
import { BiddistParams } from "./interfaces/Iserver";
/**
 * Manages essential parameters such as database connection string, domain, and credentials.
 */
class paramStore{
    static  params: BiddistParams;
    static setAllParams = async(): Promise<void> =>{
        if(process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development'){
            paramStore.params = {
                frontend_domain: 'http://localhost:3000',
                db_conn: process.env.DB_CONN,
                stripe: process.env.STRIPE,
                mailgun: process.env.MAILGUN,
                mailgun_domain: process.env.MAILGUN_DOMAIN,
                maintainer: process.env.MAINTAINER
            }
        }
        if(process.env.NODE_ENV == 'production'){
            const ssm = new SSMClient({region: "us-east-2"});
            const query = new GetParametersCommand({Names: ["DB_CONN","DOMAIN","STRIPE_KEY","EMAIL,EMAIL_PASSWORD"]});
            const result =  (await ssm.send(query));
            for (let param of result.Parameters){
                paramStore.params[param.Name] = param.Value;
            }
        }
    }
}
export default paramStore;