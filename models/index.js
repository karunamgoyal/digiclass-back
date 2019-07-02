const mongoose = require('mongoose');

mongoose.set('debug',true);

mongoose.Promise = global.Promise;
const mongodburl="mongodb://localhost:27017/class";
mongoose.connect(mongodburl, { useNewUrlParser: true });

module.exports.User = require('./user');
module.exports.Course = require('./course');