import mongoose from 'mongoose'

const connectMongo=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb") 
    }catch(err){
        console.log("err connect mongodb",err.message);
    }
}

export default connectMongo;