import {setupServer} from "./initialization/setupServer.js";
import {schedule} from "node-cron";
import paramManager from "./paramManager.js";
schedule('0 */12 * * *', async () => {
    paramManager.invalidateParams()
})
const app = await setupServer();
app.listen(8000,()=>{
    console.log('Server started on port 8000')
})