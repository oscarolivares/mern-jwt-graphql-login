import mongoose from 'mongoose';
import config from './config';

async function connect() {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database is connected');
  } catch (error) {
    console.log('Database connection problem');
    // console.log(error);
  }
}

connect();

/* const URI = process.env.MONGOOSE_URI
  ? process.env.MONGOOSE_URI
  : 'mongodb://localhost/merndatabase';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
*/
