
const mongoose=require('mongoose');

//user Schema
const AssignedReviewerSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    taskCompletionStatus:{
        type:Boolean,
        required:true
    }
});
const AssignedReviewer=module.exports=mongoose.model('AssignedReviewer',AssignedReviewerSchema);