const mongoose=require('mongoose');
const PointSchema=mongoose.Schema({
    value:{
        type:Number,
        required:true
    }
})
const Point=module.exports=mongoose.model('Point',PointSchema);

module.exports.setPointValue=function(newval,_id,callback){
    Point.findOneAndUpdate({_id:_id},{$set:{value:newval}},{new: true,
        upsert: false, 
        remove: {},
        fields: {} 
    },callback)
}

module.exports.getPointValue=function(callback){
    Point.find({},callback)
}
