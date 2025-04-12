import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`${process.env.CONNECTION_STRING}/user`).then(()=>{
    console.log('Connected')
}).catch((ERR)=>{
    console.log('ERR',ERR)
})

export default mongoose.connection;