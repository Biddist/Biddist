import { GetParametersCommand, SSMClient } from "@aws-sdk/client-ssm";
import { BiddistParams } from "./interfaces/Iserver.js";
/**
 * Manages essential parameters such as database connection string, email domain, and credentials.
 */
class paramStore{
    private static  params: BiddistParams = null;

    /**
     * Invalidates in memory parameters so that they are
     * fetched from AWS next time they are retrieved.
     */
    static invalidateParams(){
        paramStore.params = null;
    }

    /**
     * Fetches program parameters such as API keys and database connection.
     */
    static getAllParams = async(): Promise<BiddistParams> =>{
        if(paramStore.params != null){
            return paramStore.params;
        }
        else {
            if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
                paramStore.params = {
                    frontend_domain: /^http:\/\/localhost(:\d+)?$/,
                    db_conn: process.env.DB_CONN,
                    stripe: process.env.STRIPE,
                    mailtrap: process.env.MAILTRAP,
                }
            }
            if (process.env.NODE_ENV == 'production') {
                const ssm = new SSMClient({region: "us-east-2"});
                const query = new GetParametersCommand({Names: ["db_conn", "mailtrap", "stripe", "frontend_domain"]});
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