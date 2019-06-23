require('dotenv').config();
//Initial imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json);

const port = process.env.PORT || 4000;

app.get('/',function(req,res){
    res.send("Hello world");
});
//starting serverS
app.listen(port,console.log('Server started on '+port));
