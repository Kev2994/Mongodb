

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const mongoose = require('mongoose');

const DB= process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() =>{
  console.log('DB connection Successful');
});



//console.log(process.env.NODE_ENV1);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}`);
});
