import { MongoMemoryServer } from 'mongodb-memory-server'

export = async (): Promise<void> => {
    console.log('TEARING DOWN')
    const instance: MongoMemoryServer = (global as any)._MONGO_INSTANCE_
    await instance.stop();
} 