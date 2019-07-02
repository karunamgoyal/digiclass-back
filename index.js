require('dotenv').config();
//Initial imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const handle=require('./handlers');
const routes = require('./routes');
// server created
const app = express();
//basic middle ware
app.use(cors());
app.use(bodyParser.json);

const port = process.env.PORT || 4000;
//test app
app.get('/',function(req,res){
    res.send("Hello world");
});
//middleware
app.use('/api/auth',routes.auth);
app.use('/api/class',routes.course);
//error control 
app.use(handle.notFound);
app.use(handle.errors);

//starting serverS
app.listen(port,console.log('Server started on '+port));
