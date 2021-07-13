const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));
const Tour = require('./../../models/tourmodel');

exports.aliasTopFive = (req,res,next)=> {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    next();
}
    class ApiFeature{
    constructor(query, queryString){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query(JSON.parse(queryStr));

        return this; //this is returned so that this object can acess other tying methods
    }

    sort(){
          if(this.queryString.sort){
            //console.log(req.query);
           const sortBy = this.queryString.sort.split(',').join(' ');
           //console.log(sortBy);
            
            this.query =this.query.sort('sortBy');
        }else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields(){
         if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(){
        const page = this.queryString.page *1 || 1;
        const limit = this.queryString.limit* 10 || 100;
        const skip = (page-1)*limit ;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}



/*exports.checkID = (req,res,next,val) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }
 next();
}

exports.checkBody = (req,res,next)=>{
     if (!req.body.name || !req.body.price){
        return res.status(404).send('bad request');
    };
    next();
};*/

exports.getAllTour = async (req,res) => {
    try{
    /* 1A) filtering equal to
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => queryObj[el]);


        //const tours = await Tour.find(queryObj);
        //await is removed to return query, query can be chained to another method
        //after that it is awaited to return the data
        

        // 1B) filtering equal or less than and greater than
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));

        //console.log(req.query);

        // 2) sorting
        if(req.query.sort){
            console.log(req.query);
           const sortBy = req.query.sort.split(',').join(' ');
           console.log(sortBy);
            
            query =query.sort('sortBy');
        }else{
            query = query.sort('-createdAt');
        }
        // 3) Field Limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        };

        // pagination
        const page = req.query.page *1 || 1;
        const limit = req.query.limit* 10 || 100;
        const skip = (page-1)*limit ;

        query = query.skip(skip).limit(limit);
       
      const tours1 = await query;
      //console.log(tours);

       */


const features = new ApiFeature(Tour.find(), req.query).filter().sort();
const tours = await features.query; // now query lives in feature object

res.status(200).json({
            status: 'success',
            data: {
                tours,
            }
        });

    }catch(err){
        res.status(404).json({
            status :'fail1',
            error : err
        });
    }
};

exports.getTour = async (req, res) => {
    /*const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    Tour.find() reurn all the data*/
    try{
    const tour= await Tour.findById(req.params.id);
    // Tour.findOne({_id:req.params.id})
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
    }catch(err){
         res.status(400).json({
          status: "fail",
          message: err
        });
    }
};
exports.createTour = async (req, res) => {
    /*console.log(req.body);
    res.send('done')
   
    const newId = tours[tours.length - 1].id + 1;
    //req.body.id = newId;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
        res.status(201).json({
            result: 'success',
            data: {
                tours: newTour
            }
        })
    });*/
    try{
    const newTour = await Tour.create(req.body);
     res.status(201).json({
            result: 'success',
            data: {
                tours: newTour
            }
        });
    }catch(err){
        res.status(400).json({
          status: "fail",
          message: err
        });
    }
};

exports.updateTour = async (req,res)=>{
    try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
       new : true, 
       runValidators : true
    });
    res.status(200).json({
        status: 'success',
        data: {
        tour
        }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err 
        });
    }
    };

exports.deleteTour = (req,res)=> {
    res.status(201).send('Done')
    };
