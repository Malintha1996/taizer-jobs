const mongoose=require('mongoose');


//Claim Points Schema

const ClaimSchema=mongoose.Schema({
        userId:{
            type:String,
            required:true
        },
        user:{
            type:{},
            required:true
        },
        claimDetails:{
          type:Object,
          required:true
        },
        paymentStatus:{
            type:Boolean,
            required:false,
            default:false
        },
        requestedDate:{
           type:String,
           required:true
        },
        payedDate:{
            type:String,
            required:false
        }
});
const Claim=module.exports=mongoose.model('Claim',ClaimSchema);


module.exports.payClaim=function(payObj,callback){
    Claim.findOneAndUpdate({_id:payObj._id},{$set:{paymentStatus:true,payedDate:payObj.payedDate}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
    },callback)
}