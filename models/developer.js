
var mongoose=require('mongoose')
let devSchema=mongoose.Schema({
    Name:{
    FirstName:{
        type:String,
        required:true
    },
    LastName:String,
    },

    Level:{
       type:String,
       emum:["BEGINNER","EXPERT"],
       required:true,
       uppercase:true
    },

    Address:{
        State:String,
        Suburb:String,
        Street:String,
        Unit:String
    }

        
})
let devModel=mongoose.model('dev',devSchema);
module.exports=devModel;