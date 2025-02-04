import {Services} from "../src/services";
describe("testing external services",()=>{
    test("check to see if singletons are initialized properly. Requires env file!", async ()=>{
        const mailgun = await Services.getMailgun();
        const mailgun2 = await Services.getMailgun();
        expect(mailgun).toBe(mailgun2);
        const stripe = await Services.getStripe();
        const stripe2 = await Services.getStripe();
        expect(stripe).toBe(stripe2);
    });
})

