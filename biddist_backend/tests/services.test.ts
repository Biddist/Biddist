import {Services} from "../src/services";
describe("testing external services",()=>{
    test("check to see if singletons are initialized properly. Requires env file!", async ()=>{
        const mailtrap = await Services.getMailtrap();
        const mailtrap2 = await Services.getMailtrap();
        expect(mailtrap).toBe(mailtrap2);
        const stripe = await Services.getStripe();
        const stripe2 = await Services.getStripe();
        expect(stripe).toBe(stripe2);
    });
})

