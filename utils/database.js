import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if (isConnected) {
        console.log('connected to mongodb');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI,
            {
                dbName: "prTracker",
                useNewUrlParser:true,
                useUnifiedTopology:true,
            }
        )

        
        isConnected = true;
        console.log('mongodb connected')
    } catch (error) {
        console.log(error);
    }

}