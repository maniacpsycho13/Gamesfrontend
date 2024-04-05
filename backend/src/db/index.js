import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB= async ()=>{
    try{
      const connInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`MongoDB Connected: ${connInstance.connection.host}`);
    }catch (e){
        console.log('MongoDB connection error ',e);
        process.exit(1);
    }
}

export default connectDB