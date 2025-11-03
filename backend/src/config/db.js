import mongoose from "mongoose";
import config from "./config.js";


const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(config.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
                        if (connect.connection.readyState === 1) {
                                    console.log("Database is created");
                        } else {
                                    console.log("Database is not connected");
                        }
            } catch (error) {
                        console.log(error.message)
            }
}

export default connectDB;