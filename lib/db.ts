import mongoose, { Mongoose } from 'mongoose';

// Enable debug logging
const debug = process.env.NODE_ENV !== 'production' ? console.log : () => {};

// Define the shape of our mongoose cache
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  // This extends the global NodeJS namespace to include our mongoose cache
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dove-spiritual';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Initialize the cache if it doesn't exist
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

/**
 * Connects to the MongoDB database using the global cache for connection reuse
 * @returns {Promise<Mongoose>} The Mongoose connection
 */
async function connectDB(): Promise<Mongoose> {
  debug('connectDB called');
  
  // Return the cached connection if it exists
  if (cached.conn) {
    debug('Using cached database connection');
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    debug('Creating new database connection');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    };
    
    debug(`Connecting to MongoDB at: ${MONGODB_URI}`);

    try {
      // Create a new connection promise
      debug('Initiating MongoDB connection...');
      cached.promise = mongoose.connect(MONGODB_URI, opts);
      
      // Log successful connection
      cached.promise.then(() => {
        debug('MongoDB connected successfully');
      });
      
      // Handle connection errors
      cached.promise.catch((error) => {
        console.error('MongoDB connection error:', error);
        // Clear the promise on error to allow retries
        cached.promise = null;
        throw error;
      });
    } catch (error) {
      console.error('Error creating MongoDB connection:', error);
      // Clear the promise on error to allow retries
      cached.promise = null;
      throw error;
    }
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Clear the promise on error to allow retries
    cached.promise = null;
    console.error('Database connection error:', error);
    throw error;
  }
}

export { connectDB };
export default connectDB; 