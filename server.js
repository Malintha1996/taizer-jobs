const express=require('express');
const path=require('path')
const bodyParser=require("body-parser");
const cors=require("cors");
const passport=require("passport");
const mongoose=require("mongoose");
const users=require('./routes/users');
const config=require('./config/database');
const Chatkit = require('@pusher/chatkit-server');
const cloudconfig=require('./config/cloudinary');
var cloudinary = require('cloudinary').v2

//initialization
const app=express();

//middleware
app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(passport.initialize());
require('./config/passport')(passport)
require('dotenv').config({ path: '.env' });

//configuration
const PORT = process.env.PORT
app.use(express.static(path.join(__dirname, 'client/build')));
const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});

cloudinary.config({ 
  cloud_name: cloudconfig.cloud_name, 
  api_key: cloudconfig.api_key, 
  api_secret: cloudconfig.api_secret
})
  

app.post('/userschat', (req, res) => {
  const { userId } = req.body;
  chatkit
    .createUser({
      id: userId,
      name: userId,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${userId}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});
app.post('/authenticatechat', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});
app.use('/users',users);
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/client/build/index.html'));
});


//database connection

mongoose.connect(config.database,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
  console.log("data base connected")
}).catch(error => console.error(error));

app.listen(PORT,()=>{
  console.log("server started")
})



