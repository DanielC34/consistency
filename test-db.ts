
import connectDB from './lib/db';

async function test() {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  try {
    await connectDB();
    console.log('Connected successfully');
  } catch (e) {
    console.error('Connection failed:', e);
  }
}

test();
