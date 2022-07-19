import mongoose from 'mongoose';
console.log('mongo uri', process.env['MONGO_URI']);
beforeAll( async() => await mongoose.connect(process.env['MONGO_URI'] || ''));

afterAll( async() => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});