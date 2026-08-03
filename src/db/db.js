const mongoose=require('mongoose');
env=require('dotenv').config();
const DATABASE_URL=process.env.DATABASE_URL;

async function connectdb()
{
    try{

        await mongoose.connect(DATABASE_URL);
        console.log('database connected successfully');
    }
    catch(err)
    {
        console.log('error in connecting database',err);
    }
    
}




module.exports=connectdb;