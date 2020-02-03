const AssignedReviewer=require('./assignedreviewer')
const Submission=require('./submission')
const mongoose=require('mongoose');

//task detail schema
const ReviewerSchema=mongoose.Schema({
    userId:{
      type:String,
      require:true,
    },
    submssionId:{
        type:String,
    },
    acceptance:{
        type:Boolean,
        required:true,
        default:false
    },
    rejection:{
        type:Boolean,
        required:true,
        default:false
    }
});
const Reviewer=mongoose.model('Reviewer',ReviewerSchema);
//user Schema
const TaskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
      },
    platform:{
       type:String,
       required:true
    },
    description:{
        type:String,
        required:true
    },
    addedDate:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    client:{
        type:{},
        required:true
    },
    numberOfSubmissionsRequired:{
        type:Number,
        required:true
    },
    submittedList:{
        type:[ReviewerSchema],
    },
    completionStatus:{
        type:Boolean,
        required:true,
        default:false
    },
    pointsAllocated:{
        type:Number,
        required:true,
        default:0
    },
    gain:{
        type:Number,
        required:true,
        default:0
    },
    taskLink:{
        type:String,
        required:true
    },
    numberOfSubmissions:{
        type:Number,
        required:false,
        default:0
    },
    numberOfAcceptedSubmissions:{
        type:Number,
        required:false,
        default:0
    },
    numberOfRejectedSubmissions:{
        type:Number,
        required:false,
        default:0
    },
    paused:{
       type:Boolean,
       required:false,
       default:false
    },
    deleted:{
        type: Boolean,
        required:true,
        default: false
    }
});

const Task=module.exports=mongoose.model('Task',TaskSchema);

module.exports.addTask=function(newTask,callback){
    newTask.save(callback)
} 
module.exports.getTasks=function(callback){
    const query={}
    Task.find(query,callback);
}
module.exports.getTask=function(taskId,callback){
    const query={_id:taskId}
    Task.findOne(query,callback);
}

module.exports.getCompltedTasks=function(userId,callback){
    Task.find({"submittedList.userId":userId},callback);
}
module.exports.submitTaskProof=function(taskId,userId,submissionId,callback){
    const reviewer=new Reviewer({
        userId:userId,
        submissionId:submissionId
    })
     Task.findOneAndUpdate({_id:taskId},{$push:{submittedList:reviewer},$inc:{numberOfSubmissions:1}},{
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback);
}
module.exports.getFullyCompltedTasks=function(callback){
    const query={completionStatus:true}
    Task.find(query,callback);
}
module.exports.rejectSubmission=function(taskId,userId,callback){
    Task.findOneAndUpdate({_id:taskId,'submittedList.userId':userId},{$inc:{numberOfRejectedSubmissions:1},$set:{'submittedList.$.acceptance':false,'submittedList.$.rejection':true}},{},callback)
}
module.exports.acceptSubmission=function(taskId,userId,callback){
    Task.findOneAndUpdate({_id:taskId,'submittedList.userId':userId},{$inc:{numberOfAcceptedSubmissions:1},$set:{'submittedList.$.acceptance':true,'submittedList.$.rejection':false}},{
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback) 
}
module.exports.setCompletionStatus=function(taskId,callback){
    Task.findOneAndUpdate({_id:taskId},{$set:{completionStatus:true}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
      },callback)
}
module.exports.findPoints=function(taskIdList,callback){
    Task.find({_id:{$in:taskIdList}},callback)
}
module.exports.deleteTask=function(taskId,callback){
    Task.findOneAndUpdate({_id:taskId},{$set:{deleted:true}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
      },callback)
}
module.exports.togglePause=function(status,taskId,callback){
    Task.findOneAndUpdate({_id:taskId},{$set:{paused:status}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
      },callback)
}
module.exports.extendDeadline=function(deadline,taskId,callback){
    Task.findOneAndUpdate({_id:taskId},{$set:{deadline:deadline}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
      },callback)
}


