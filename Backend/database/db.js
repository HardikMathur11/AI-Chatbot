import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.Db_url;
    
    if (!mongoUri) {
      throw new Error("MongoDB connection string is not configured. Please set MONGO_URI environment variable.");
    }

    const options = {
      dbName: process.env.DB_NAME || "ChatbotYoutube",
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(mongoUri, options);

    console.log("✅ MongoDB connected successfully");
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error; // Re-throw to handle in server.js
  }
};

export default connectDb;
