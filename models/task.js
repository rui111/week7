var mongoose=require('mongoose');

let taskSchema=mongoose.Schema({
    TaskName:String,
    AssignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dev'
    },
    DueDate:{
        type:Date,
        default:Date.now,
        require:true
    },
    TaskStatus:{
        type:String,
        emum:["InProgress","Complete"],
        require:true
    },
    TaskDescription:{
        type:String
    }
     



})
let taskModel=mongoose.model('task',taskSchema);
module.exports=taskModel;