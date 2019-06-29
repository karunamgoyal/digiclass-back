const mongoose = require('mongoose');

mongoose.set('debug',true);

mongoose.Promise = global.Promise;
const mongodburl=""
mongoose.connect(mongodburl, { useNewUrlParser: true });

module.exports.User = require('./user');
module.exports.Course = require('./course');