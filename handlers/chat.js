const db = require('../models');

module.exports.getChat = async (req, res, next) => {
    try {
        const { id: cid } = req.params;
        const { id: uid } = req.decoded;
        const course = db.Course.Course.findById(cid);
        const {courseid:cid1} = course;
        if (course) {
            var flag = false;
            for (var i = 0; i < course.students.length; i++) {
                if (uid == course.students[i]._id) {
                    flag = true;
                    break;
                }
            }
            if (course.setQuery._id == uid || flag) {
                const chat = db.Chat.findOne({ courseid: cid1});
                res.status(200).json(chat);
            }
            else {
                throw new Error("Not Enrolled in this Course");
            }
        }
        else {
            throw new Error('Wrong Course');
        }
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
};

module.exports.postChat = async (req,res,next) => {
    try {
        const {id:cid} = req.params;
        const {id:uid} = req.decoded;
        const user = db.User.findById(uid);
        const course = db.Course.Course.findById(cid);
        const {username}=user;
        const {courseid}=course;
        if(course&&user){
            const chat = db.Chat.findOne({courseid:courseid});
            const {message} = req.body;
            if(chat){
                chat.data.push({
                    username,message
                })
                await chat.save();
            }
            else{
                const chat1  = db.Chat.create(
                    {
                     courseid
                    }
                );
                chat1.data.push({
                    username,
                    message
                });
                await chat1.save();

            }
        }
        else{
            throw new Error('Something Went Wrong')
        }
        
    } catch (err) {
        err.status = 400;
        next(err);
    }
}