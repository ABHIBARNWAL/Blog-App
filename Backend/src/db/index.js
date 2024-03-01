import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB}`)
        console.log('Connection Established !! Database Connected !!',await connection.connection.host)
    } catch (error) {
        console.error("MongoDB connection Failed: ", error);
        process.exit(1);
    }
}
export default connectDB;