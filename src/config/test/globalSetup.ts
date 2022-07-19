import {MongoMemoryServer } from 'mongodb-memory-server'

export = async (): Promise<void> => {
    console.log('SETTING UP')
    const memory = await MongoMemoryServer.create();
    process.env.MONGO_URI = memory.getUri();
    (global as any)._MONGO_INSTANCE_ = memory;
}