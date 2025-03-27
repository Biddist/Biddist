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
        const response = await fetch(backendURL + "/auth/signup",config);
        return response.status;
    }
    /**
     * Requests a One Time Password with login intent.
     * @param user either email or username
     * @param password
     */
    public static async postLoginOTP(user: string, password: string): Promise<number> {
        const config = JSON.parse(JSON.stringify(postConfig));
        config.body = JSON.stringify({
            user: user,
            password: password,
            intent: "login",
        });
        const response = await fetch(backendURL + "/auth/otp",config);
        return response.status;
    }

    /**
     * Requests a One Time Password with signup intent.
     * @param email either email or username
     * @param password
     */
    public static async postSignupOTP(email: string, password: string): Promise<number> {
        const config = JSON.parse(JSON.stringify(postConfig));
        config.body = JSON.stringify({
            user: email,
            password: password,
            intent: "signup",
        });
        const response = await fetch(backendURL + "/auth/otp",config);
        return response.status;
    }

    /**
     * Completes the signup process using otp
     * @param user the user to signup
     * @param otp the one time password emailed to them.
     */
    public static async postFinishSignup(user: string, otp: string): Promise<number> {
        const config = JSON.parse(JSON.stringify(postConfig));
        config.body = JSON.stringify({
            user: user,
            signup_otp: otp,
        });
        const response = await fetch(backendURL + "/auth/otp_signup",config);
        return response.status;
    }
}
export {AuthAPIService};