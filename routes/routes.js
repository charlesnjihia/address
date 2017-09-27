/** express library **/
const express=require('express');
const router=express.Router();
/** Address ODM **/
const Address=require('../models/address');


// GET /  home redirect to show addresses 
router.get('/',(req,res,next)=>{
 return res.redirect('/addresses');   
    

});
// GET /addresses  
router.get('/addresses',(req,res,next)=>{
  
 /** use the address find method to fetch all addresses.sort the addresses
 by id in the descending order **/ 
 Address.find().sort({_id:-1}).exec( function (err, addresses) {
    if (err) {
      //use the error handler to display error
      return next(err);
    } else {
    return res.render('addresses', { title: 'All Addresses',addresses:addresses
    });  
      }
	});    
    

});
// GET /addresses/id fetch an address of given id for update  
router.get('/addresses/:id',(req,res,next)=>{
  let id=req.params.id;
 
 Address.findOne({_id:id}, function (err, address) {
    if (err) {
      //use the error handler to display error
      return next(err);
    } else {
    return res.render('updateadd', { title: 'Update ',address:address
    });  
      }
	});    
    

});


//GEt /address  for rendering the address form 
router.get('/address',(req,res,next)=>{  
 return res.render('newaddress', { title: 'New '});   

});


//POST /newaddress  for creating a new address 
router.post('/newaddress', (req, res, next)=> {
   if(req.body.email && req.body.name && req.body.phone)
    {
     /** create address object with form input     */
      let address = {
        name: req.body.name,
        email: req.body.email,        
        phone: req.body.phone
      };
     /**insert the address details into the Mongo database using the schema create method **/
      Address.create(address, function (error, insertedAddress) {
        if (error) {
           
          return next(error);
        } else {   
                 
          return res.redirect('/addresses'); 
        }
      });    
   
  }
  else{
    let err=new Error('All the details are required!');
    err.status=401;
    return next(err);

  } 
 
});
//POST /updateaddress  for updating an existing address 
router.post('/updateaddress', (req, res, next)=> {
   let id=req.body.id;
   if(req.body.email && req.body.name && req.body.phone)
    {
     /** create address object with form input     */
      let address = {
        name: req.body.name,
        email: req.body.email,        
        phone: req.body.phone
      };
     /** update the address details into the Mongo database using the schema update method **/
      Address.update({_id:id},address, function (error, updatedAddress) {
        if (error) {
           
          return next(error);
        } else {   
                 
          return res.redirect('/addresses'); 
        }
      });    
   
  }
  else{
    let err=new Error('All the details are required!');
    err.status=401;
    return next(err);

  } 
 
});
// GET /addresses/id/delete  delete address for a given id 
router.get('/addresses/:id/delete',(req,res,next)=>{
  let id=req.params.id;
  
  
 
 Address.remove({_id:id}, function (err, msg) {
    if (err) {
      //use the error handler to display error
      return next(err);
    } else {
    return res.redirect('/addresses'); 
    }
 });
}); 

module.exports=router;