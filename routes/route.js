const express = require('express');
const router = express.Router();

const contact = require('../models/contacts')

router.get('/contacts',function(req,res,next){
    contact.find(function(err,contacts){
        res.json(contacts);
    })
})

router.post('/contact',function(req,res,next){
    let newContact = new contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    });
    newContact.save(function(err,contact){
        if(err){
            res.json({msg :"failed to add conatct "})
        }
        else{
            res.json({msg:"conatct added successfully"});
        }
          
    })
})
router.put('/contact/:id',function(req,res,next){
    contact.findOneAndUpdate({_id:req.params.id}, 
   {  $set :
              {
               first_name: req.body.first_name,
               last_name: req.body.last_name,
               phone: req.body.phone
        }},
    function(err,result){
        if(err){
            res.json({msg :"failed to update conatct "}) ;
        }
        else{
            res.json({msg :"Conatct updated successfully "});            
        }
    });
});

router.delete('/contact/:id',function(req,res,next){
    contact.remove({_id:req.params.id},function(err,results){
        if(err){
            res.json(err);
        }
        else{
            res.json(results)
        }
    });
})

module.exports = router;