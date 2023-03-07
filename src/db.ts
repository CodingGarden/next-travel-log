import { MongoClient } from 'mongodb';
import serverConfig from './lib/serverConfig';

const client = new MongoClient(serverConfig.DB_URL);
client.connect();
export default client.db(serverConfig.DB_NAME);
