const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req,res,next)=>{
    try{
        console.log(1);
        console.log(req.body);
        const user = await db.User.create(req.body);
        const {id,username} = user;
        const token = jwt.sign({id,username},process.env.SECRET);
        res.status(201).json({id,username,token});

    }catch(err){
        if(err.code==11000)
            err.message = "Sorry that username is already taken";

         next(err);   
    }
   
}
exports.login = async (req,res,next) => {
    try{
        const user = await db.User.findOne({username : req.body.username});
        const valid = await user.comparePassword(req.body.password);
        if (valid){
            
            const token = jwt.sign({id,username},process.env.SECRET);
            res.json({
                id,
                username,
                usertype,
                token
            });
        }
        else{
            throw new Error('Invalid Username/Password');
        }
    }
    catch(err){
        err.message = "Invalid username and password"; 
        next(err);
    }
}