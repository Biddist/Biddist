import { GetParametersCommand, SSMClient } from "@aws-sdk/client-ssm";
import { BiddistParams } from "./interfaces/Iserver.js";
/**
 * Manages essential parameters such as database connection string, email domain, and credentials.
 */
class paramStore{
    private static  params: BiddistParams;
    static getAllParams = async(): Promise<BiddistParams> =>{
        if(paramStore.params){
            return paramStore.params;
        }
        else {
            if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
                paramStore.params = {
                    frontend_domain: /^http:\/\/localhost(:\d+)?$/,
                    db_conn: process.env.DB_CONN,
                    stripe: process.env.STRIPE,
                    mailgun: process.env.MAILGUN,
                    mailgun_domain: process.env.MAILGUN_DOMAIN,
                }
            }
            if (process.env.NODE_ENV == 'production') {
                const ssm = new SSMClient({region: "us-east-2"});
                const query = new GetParametersCommand({Names: ["db_conn", "mailgun","mailgun_domain", "stripe", "frontend_domain"]});
                const result = (await ssm.send(query));
                for (let param of result.Parameters) {
                    paramStore.params[param.Name] = param.Value;
                }
            }
            return paramStore.params;
        }
    }
}
export default paramStore;