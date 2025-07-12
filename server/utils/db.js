const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Basava-Parishath-Bengaluru"
    });
    console.log('MongoDB connected to Basava-Parishath-Bengaluru database');
    
    // Test the connection
    await connection.connection.db.admin().ping();
    console.log('Database ping successful');
  }
  catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 