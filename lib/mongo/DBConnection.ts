import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Using existing connection');

    return true;
  }

  try {
    const URI = process.env.MONGODB_URI;

    if (!URI) {
      console.log('Please set a MongoDB URI');

      throw new Error('Please set a MongoDB URI');
    }

    await mongoose.connect(URI);
    console.log('MongoDB connected');

    return true;
  } catch (error) {
    console.log('connectMongoDB error', error);

    throw new Error('Could not connect to MongoDB');
  }
};

export default connectMongoDB;
