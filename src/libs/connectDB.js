import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}


async function connectToDatabase() {
  mongoose.connect(MONGODB_URI)
}

export default connectToDatabase;