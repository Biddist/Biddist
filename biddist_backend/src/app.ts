import {setupServer} from "./setupServer";
const app = await setupServer();
app.listen(8000,()=>{
    console.log('Server started on port 8080')
})