import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number,
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        console.log(process.env.MONGODB_URI);
        
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0]. readyState

        console.log("db is connected sucessfully");
    } catch (error) {
        console.log("Database connection is failed",error);
        process.exit(1)
    }
}

export default dbConnect;