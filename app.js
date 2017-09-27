/** main server file with express framwork **/
const express=require('express');
const app=express();
/** body parser to parse request body **/
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const route=require('./routes/routes');


/** connect to the mongo database.Use mongoose ODM  **/
/** mongo database is using the default port i.e 27017 use the code commented below
 in case of different host, port and user logging credentials 
mongoose.connect('mongodb://username:password@host:port/addresses
 **/
mongoose.connect('mongodb://localhost:27017/addresses',{ useMongoClient: true});
const db=mongoose.connection;
db.on('error',error=>{console.error('errror:',error);});
/**use body-parser middleware to parse incoming requests **/
app.use(bodyParser.urlencoded({extended:false}));
/**set pug as the view engine  by default the engine check the views folder for render files**/
app.set('view engine','pug');
/** serve static files from /public **/
app.use(express.static(__dirname + '/public'));
/**use routes file to handle all incoming requests **/
app.use('/',route);


/** catch all 404 (undefined requests and forward to error handler)  **/
app.use((req, res, next)=> {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

/** handle all errors **/
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    
  });
});
/** set port to the production port, if not available to 3000 **/
const port=process.env.PORT || 3000;;
app.listen(port,()=>{
console.log('app listening to port',port);
});