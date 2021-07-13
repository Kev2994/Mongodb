// JavaScript source code
const dotenv = require('dotenv');
dotenv.config({path: `${__dirname}/../../config.env`});
const fs = require('fs');
const mongoose = require('mongoose');

const DB= process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() =>{
  console.log('DB connection Successful');
});

//Read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const Tour = require('./../../models/tourmodel');

// import data into DB
const importData = async ()=>{
    try{
    await Tour.create(tours);
    console.log('Data loaded');
    process.exit();
    }catch(err){
    console.log(err);
    }
};

// Delete all data from DB
const deleteData = async ()=>{
    try{
    await Tour.deleteMany();
    console.log('Data deleted');
    process.exit();
    }catch(err){
    console.log(err);
    }
};

if(process.argv[2] === '--import'){
   importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
};






