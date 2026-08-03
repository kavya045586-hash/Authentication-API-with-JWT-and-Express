const app=require('./src/app.js');
const connectdb=require('./src/db/db.js');
require('dotenv').config();

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
connectdb();