const db = require('../models');
//Return a list of Courses
exports.showCourses = async (req,res,next)=>{
    try {
        const courses = await db.Course.Course.find();
        res.status(200).json(courses);
    } catch (err) {
        err.satus= 400;
        next(err);
    }
};
exports.userCourses = async (req,res,next)=>{
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id);
        res.status(200).json(user.courses);
    } catch (err) {
        err.satus= 400;
        next(err);
    }
};
exports.createCourse = async (req,res,next)=>{
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id);
        const {courseid} = req.body;
        const course = await db.Course.Course.create({
            user,
            courseid
        });
        user.courses.push(course._id);
        await user.save();
        res.status(201).json({...course._doc,user:user._id});

    } catch (err) {
        if(err.code == 11000)
            err.message="This Course ID Already Exist Please Choose Another one";
        err.satus= 400;
        next(err);
    }
};
exports.getCourse = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const course = await db.Course.Course.findById(id)
        if(!course)   throw new Error('No Course Found');
        res.status(200).json(course);    

    } catch (err) {
        err.satus= 400;
        next(err);
    }
};
exports.enroll = async (req,res,next)=>{
    try {
        const {id:userid} = req.decoded;
        const {id:courseid} = req.params;
        const course = await db.Course.Course.findById(courseid)
        if(!course)   throw new Error('No Course Found');
        var flag = true;
        for(var i =0;i<course.students.length;i++){
            if(course.students[i]._id==userid){
                    flag=false;
                    break;
            }
        
        }
        if(flag){
            course.students.push(userid);
            await course.save();
            res.status(201).json(course);
        }
        else{
            throw new Error('Already Enrolled');
        }
                        

    } catch (err) {
        err.satus= 400;
        next(err);
    }
};
exports.post = async (req,res,next)=>{
    try {
        const {id :coursei} = req.params;
        const {id :userid} = req.decoded;
        const { post }= req.body;
        if(post){
            
            const user = await db.User.findById(userid);
            const course = await db.Course.Course.findById(coursei);
            if(!course) throw new Error("No Course Found");
            const Post = await db.Course.Post.create({
                user,
                post
            });
            var flag = false;
            for(var i =0;i<course.students.length;i++){
                if(course.students[i]._id==userid){
                    flag=true;
                    break;
                }
        
            }
            if(flag||course.user._id==userid){
                course.posts.push(Post);
                await course.save();
                res.status(201).json(course);
            }
            else{
                throw new Error('Not Enrolled in this Course');
            }

        }
        else{
            throw new Error("Enter some data");
        }

    } catch (err) {
        err.satus= 400;
        next(err);
    }
};
/*exports.addAssignment = async (req,res,next)=>{
    try {
        
    } catch (err) {
        err.satus= 400;
        next(err);
    }
};*/