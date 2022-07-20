import mongo from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const dbConnect = async ():Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongo.connect(uri);
};

export const dbDisconnect = async ():Promise<void> => {
  await mongo.connection.dropDatabase();
  await mongo.connection.close();
  await mongoServer.stop();
};