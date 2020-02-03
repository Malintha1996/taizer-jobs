const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//user Schema

const AccountSchema=mongoose.Schema({
    platform:{
       type:String 
    },
    username:{
      type:String
    },
    profilelink:{
        type:String
    }
});
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
      },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    password:{
      type:String,
      required:true
    },
    usertype:{
        type: String,
        enum : ['admin','reviewer','client'],
    },
    phone:{
        type:String,
        required:true
    },
    profilepic:{
       type:String,
       required:false
    },
    gainedPoints:{
         type:Number,
         default:0
    },
    completedTasks:{
        type:Number,
        default:0
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    },
    accounts:{
        type:[AccountSchema]
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required: true
    },
    postalcode:{
        type:String,
        required: true
    },
    banned :{
        type: Boolean,
        required:true,
        default: false       
    }
});
const User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserById=function(id,callback){
  query={_id:id}
  User.findOne(query,callback);
}
module.exports.getUserByEmail=function(email,callback){
    const query={email:email}
    User.findOne(query,callback);
}
module.exports.comparePassword=function(candidatePassword,hash,callback){
    
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}

module.exports.addUser=function(newUser,callback){
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{ 
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        });  
    });
} 
module.exports.changeProfilePic=function(userId,pic,callback){
    User.findOneAndUpdate({_id:userId},{$set:{profilepic:pic}},{ new: true,
        upsert: false, 
        remove: {},
        fields: {} 
      },callback)
}
module.exports.addAccount=function(account,userId,callback){
    User.findOneAndUpdate({_id:userId},{$push:{accounts:account}}, {
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback)
}
module.exports.claimPoints=function(amount,userId,callback){
    User.findOneAndUpdate({_id:userId},{$inc:{gainedPoints:-amount}},{
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback)
}
module.exports.ban=function(userId,status,callback){
    User.findOneAndUpdate({_id:userId},{$set:{banned:status}},{
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback)
}
module.exports.addPoints=function(userId,amount,callback){
    User.findOneAndUpdate({_id:userId},{$inc:{gainedPoints:amount}},{
        new: true,
       upsert: false, 
       remove: {},
       fields: {} 
     },callback)
}
