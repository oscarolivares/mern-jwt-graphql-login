import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/mongodbgraphql', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('Database is connected');
  } catch (error) {
    console.log('Database connection problem');
    console.log(error);
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
