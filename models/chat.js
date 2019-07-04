const mongoose = require('mongoose');
const Chat = new mongoose.Schema({
    courseid:{
        type:String,
        required:true,
        unique:true
    },
    data:[
        {
            username:{
                type:String,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ]
});

module.exports = mongoose.model('Chat',Chat);