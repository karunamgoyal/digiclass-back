module.exports={
    ...require('./auth'),
    ...require('./course')
}
module.exports.errors=(err,req,res,next)=>{
    res.status(err.status||400).json({
        message: err.message || "Something Went wrong"
    });

};

module.exports.notFound=(req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};