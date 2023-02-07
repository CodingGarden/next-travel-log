import { MongoClient } from 'mongodb';

if (!process.env.DB_URL) {
  throw new Error('Missing DB_URL in .env.local');
}

if (!process.env.DB_NAME) {
  throw new Error('Missing DB_NAME in .env.local');
}

const client = new MongoClient(process.env.DB_URL);
client.connect();
export default client.db(process.env.DB_NAME);
