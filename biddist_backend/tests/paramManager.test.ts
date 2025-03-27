import paramStore from "../src/paramManager"

describe('testing to see if program parameters like API keys are properly fetched', () => {
    test('check to see param initialization',async ()=>{
        const params = await paramStore.getAllParams();
        expect(params.mailtrap).toBeDefined();
        expect(params.mailtrap.length).toBeGreaterThan(0);
        expect(params.db_conn).toBeDefined();
        expect(params.db_conn.length).toBeGreaterThan(0)
        expect(params.stripe).toBeDefined();
        expect(params.stripe.length).toBeGreaterThan(0);
        expect(params.frontend_domain).toBeDefined();
    })
});
