import {backendURL, postConfig} from "./FetchConfig.js";

class AuthAPIService {
    /**
     * Sends information to the server to create an inactive account.
     * @param username
     * @param password
     * @param email
     * @param address
     */
    public static async postInitSignup(username: string, password: string, email: string, address: string): Promise<number> {
        const config = JSON.parse(JSON.stringify(postConfig));
        config.body = JSON.stringify({
            email: email,
            password: password,
            username: username,
            address: address
        });
        console.log(config.body);
        const response = await fetch(backendURL + "/auth/signup",config);
        return response.status;
    }
    /**
     * Requests a One Time Password with login intent.
     * @param user
     * @param password
     */
    public static async login(user: string, password: string): Promise<number> {
        const config = JSON.parse(JSON.stringify(postConfig));
        config.body = JSON.stringify({
            user: user,
            password: password,
            intent: "login",
        });
        const response = await fetch(backendURL + "/auth/otp",config);
        return response.status;
    }
}
export {AuthAPIService};