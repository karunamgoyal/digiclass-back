const mongoose = require('mongoose');
/*const assignSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    } , 
    created:{
        type:Date,
        default:Date.now
    },
    submittedin:{
        type:Number,
        default:10
    }
});*/
const post = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }

})
const courseSchema = new mongoose.Schema ({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    courseid:{
        type:String,
        required:true
    },
   // assignments:[assignSchema],
    posts:[post],
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    created:{
        type:Date,
        default:Date.now
    }
});
module.exports.Course=mongoose.model('Course',courseSchema);
module.exports.Post=mongoose.model('Post',post);