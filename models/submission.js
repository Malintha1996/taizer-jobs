const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//Submission Schema


const SubmissionSchema=mongoose.Schema({
        userId:{
            type:String,
            required:true
        },
        user:{
            type:{},
            required:true
        },
        taskId:{
            type:String,
            required:true
        },
        proof:{
          type:[],
          required:true
        },
        acceptance:{
            type:Boolean,
            required:false,
            default:false
        },
        rejected:{
            type:Boolean,
            required:false,
            default:false
        },
        submittedDate:{
           type:String,
           required:true
        }
});
module.exports.SubmissionSchema

const Submission=module.exports=mongoose.model('Submission',SubmissionSchema);


module.exports.getSubmissionById=function(id,callback){
  query={_id:id}
  Submission.findOne(query,callback);
}

module.exports.findByUserId=function(userId,callback){
    query={userId:userId}
    Submission.find(query,callback);
  }

module.exports.addSubmission=function(newSubmission,callback){
    newSubmission.save(callback);
} 
module.exports.getSubmissions=function(callback){
    Submission.find({},callback)
}
module.exports.getSubmissionsofTask=function(taskId,callback){
    Submission.find({taskId:taskId},callback)
}
module.exports.rejectSubmission=function(submissionId,callback){
    Submission.findOneAndUpdate({_id:submissionId},{$set:{rejected:true,acceptance:false}},{},callback)
}
module.exports.acceptSubmission=function(submissionId,callback){
    Submission.findOneAndUpdate({_id:submissionId},{$set:{rejected:false,acceptance:true}},{},callback)
}
module.exports.deleteTask=function(taskId,callback){
    Submission.deleteMany({taskId:{$in:[taskId]}},callback)
}
