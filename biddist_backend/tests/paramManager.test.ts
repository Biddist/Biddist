import paramStore from "../src/paramManager"
test('check to see param intialization',()=>{
    paramStore.setAllParams().then(()=>{
        expect(paramStore.params.frontend_domain).toBe('http://localhost:3000')
    });
})