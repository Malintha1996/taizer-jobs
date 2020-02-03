const express=require("express");
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const Submission=require('../models/submission')
const Task=require('../models/task');
const authconfig=require('../config/auth')
const gaccount=require('../config/google')
const async=require('async');
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const bcrypt=require('bcryptjs');
const Point=require('../models/point')
const Claim=require('../models/claimpoints')
var cloudinary = require('cloudinary').v2
const path=require('path')


//Register
router.post('/register',(req,res,next)=>{
  console.log(req.body)
  let newUser=new User({
      email:req.body.email,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      address: req.body.address,
      country: req.body.country,
      postalcode: req.body.postalcode,
      password:req.body.password,
      phone:req.body.phone,
      banned: false,
      usertype:'reviewer'
  });
  User.getUserByEmail(newUser.email,(err,user)=>{
     if(user){
        res.json({success:false,msg:"This email address is already registered!"});
     }
     else{
        User.addUser(newUser,(err,user)=>{ 
            if(err){
                res.json({success:false,msg:"Failed to register user!"});
            }else{
                res.json({success:true,msg:"Successfully Registred!,Welcome onboard ".concat(user.firstname)});
            }
        });
     }
  })

}
);

//Authenticate
router.post('/authenticate',(req,res,next)=>{

    const email=req.body.email;
    const password=req.body.password;
    User.getUserByEmail(email,(err,user)=>{
        if(err){
          return res.json({success:false,msg:"Unable to login"});
        }
        else{
         if(!user){
            return res.json({success:false,msg:"User not found"});
         }
          User.comparePassword(password,user.password,(err,isMatch)=>{
          if(isMatch){
              deducteduser={
                _id:user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                phone:user.phone,
                banned: user.banned,
                usertype:user.usertype,
              }
              const token=jwt.sign({user:deducteduser},authconfig.secret,{
                expiresIn:3600*24
              });
              res.json({
                success:true,
                token:'JWT '+token,
                user:{
                  _id:user._id,
                  firstname:user.firstname,
                  lastname:user.lastname,
                  email:user.email,
                  address: user.address,
                  country: user.country,
                  postalcode: user.postalcode,
                  usertype:user.usertype,
                  profilepic:user.profilepic,
                  accounts:user.accounts,
                  gainedPoints:user.gainedPoints,
                  completedTasks:user.completedTasks
                },
                msg:"Hello".concat(user.firstname).concat(", Welcome back!")
              });
          }else{
              return res.json({success:false,msg:"Incorrect Password"});
          }
        
    })
   }
   });
});

//password reset
router.post('/reset',(req,res,next)=>{
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            return res.json({success:false,msg:'No account with that email address exists.'});       
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: gaccount.email,
            pass: gaccount.password
          }
        });
        var mailOptions = {
          to: user.email,
          from: gaccount.email,
          subject: 'Taizerreviews Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/resetnewpwd/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          return res.json({success:true,msg:"An e-mail has been sent to ".concat(user.email).concat(" with further instructions."),token:token});   
        });
      }
    ], function(err) {
      return res.json({success:false,msg:"Couldn't reset password!try again or contact us for support"});   
    });
});
router.post('/resetpwd',(req,res,next)=> {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.json({success:false,msg:'Password reset token is invalid or has expired.'});   
        }
        if(req.body.password === req.body.confirm) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(req.body.password,salt,(err,hash)=>{ 
                  if(err) throw err;
                  user.password=hash;
                  user.save(function(err) {
                    done(err, user);
                  });
              });  
             });     
        } else {
          return res.json({success:false,msg:'Passwords do not match'});   
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: gaccount.email,
          pass: gaccount.password
        }
      });
      var mailOptions = {
        to: user.email,
        from: gaccount.email,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        return res.json({success:true,msg:'Success! Your password has been changed.'});   
      });
    }
  ], function(err) {
    return res.json({success:false,msg:"Couldn't change password,Try again or contact us for support"});   
  });
});

//ban user
router.post('/banuser',(req,res,next)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user && decoded.user.usertype==="admin"){
    userId=req.body.userId
    status=req.body.status
    User.ban(userId,status,(err,user)=>{
       if(err){
         res.send({success:false,msg:"Couldn't ban user"})
       }
       else{
         if(status){
          msg="Successfully banned user"
         }
         else{
          msg="User has regained access, allowed user successfully!"
         }
         res.send({success:true,msg:msg,user:user})
       }
    })
  }
})

//plugged in accounts
router.post('/addaccount',(req,res,next)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  account=req.body
  if(decoded.user && decoded.user.usertype==="reviewer"){
    User.addAccount(account,decoded.user._id,(err,user)=>{
       if(err){
         res.send({success:false,msg:"Couldn't load accounts"})
       }
       else{
         res.send({success:true,msg:"Successfully added new account",user:user})
       }
    })
  }
})
//Tasks------------------------------------------------------
router.get('/gettasksofreviewer',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Task.getTasks((err,tasks)=>{
      if(err){
        res.json({success:false,msg:"Failed to load tasks"});
      }else{
        availableTasks=[]
        tasks.forEach((task)=>{
          if(task.numberOfAcceptedSubmissions < task.numberOfSubmissionsRequired && !task.completionStatus && !task.paused && !task.deleted && new Date(task.deadline).getTime() > new Date().getTime()){
            availableTasks.push(task)
          }
        })
        res.json({success:true,tasks:availableTasks});
      }
    } 
);
})
router.post('/addpointstouser',(req,res,next)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user && decoded.user.usertype==="admin"){
    userId=req.body.userId
    points=req.body.amount
    User.addPoints(userId,points,(err,user)=>{
       if(err){
         res.send({success:false,msg:"Couldn't add points to user"})
       }
       else{
         res.send({success:true,msg:"Added ".concat(points).concat(" points to user sccessfully"),user:user})
       }
    })
  }
})

router.get('/taskspool',passport.authenticate('jwt',{session:false}),(req,res)=>{

  Task.getTasks((err,tasks)=>{
    if(err){
      res.json({success:false,msg:"Failed to load tasks"});
    }else{
      completedTasks=[]
      incompletedTasks=[]
      tasks.forEach((task)=>{
        if(task.completionStatus){
          completedTasks.push(task)
        }
        else{
          incompletedTasks.push(task)
        }
      })
      res.json({success:true,incompletedTasks:incompletedTasks,completedTasks:completedTasks});
    }
  } 
);
})


router.post('/loadtask',passport.authenticate('jwt',{session:false}),(req,res)=>{

  taskId=req.body.taskId
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  user=decoded.user
  Task.getTask(taskId,(err,task)=>{
    if(user.usertype==="admin"){
      Submission.getSubmissionsofTask(taskId,(err,submissions)=>{
      if(err){
        res.json({success:false,msg:"Failed to load task"});
      }else{
        res.json({success:true,task:task,submissions:submissions});
      }
      })
    }
    else{
      if(err){
        res.json({success:false,msg:"Failed to load task"});
      }else{
        res.json({success:true,task:task,submissions:[]});
      }
    }
   
  })
});

router.post('/edittask',passport.authenticate('jwt',{session:false}),(req,res)=>{
  taskId=req.body.taskId
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(decoded.user.usertype!=null &&  decoded.user.usertype=="admin"){
    Task.findOne({_id:taskId},(err,task)=>{
      if(err){
        res.json({success:false,msg:"error editiong task!,task couldn't be found"});
      }
      else{
        Object.keys(task).forEach((key)=>{
          if(req.body.key && req.body.key!= task.key){
              task.key=req.body.key
          }
        })
        task.save((err,newTask)=>{
          if(err){
            res.json({success:false,msg:"error editiong task!"});
          }
          else{
            res.json({success:true,msg:"Enrolled Successfully!",task:newTask});
          }
        })
      }
    })
  }
  else{
    res.json({success:false,msg:"error editiong task,unauthorized!"});
  }
})

router.post('/deletetask',passport.authenticate('jwt',{session:false}),(req,res)=>{
  taskId=req.body.taskId
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(decoded.user.usertype!=null &&  decoded.user.usertype=="admin"){
    Task.findOne({_id:taskId},(err,task)=>{
      if(err){
        res.json({success:false,msg:"Failed to delete task!"});
      }
      else{
        if(task.completionStatus){
          res.json({success:false,msg:"Can't delete task,Task has been completed!"});
        }
        else{
          Task.deleteTask(taskId,(err,result)=>{
            if(err){
              res.json({success:false,msg:"Failed to delete task!"});
            }else{
              res.json({success:true,task:task,msg:"Successfully deleted task!"});
            }
          })
        }
      }
     })
  }
  else{
       res.json({success:false,msg:"Unauthorized!"});
  }
})

router.post('/togglepause',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(decoded.user.usertype=="admin"){
    taskId=req.body.taskId
    status=req.body.status
    Task.togglePause(status,taskId,(err,task)=>{
      if(err){
        if(status){
          res.json({success:false,msg:"Failed to pause task!"});
        }
        else{
          res.json({success:false,msg:"Failed to resume task!"});
        }
        
      }else{
        if(status){
          res.json({success:true,task:task,msg:"Task paused successfully!"});
        }
        else{
          res.json({success:true,task:task,msg:"Task resumed successfully!"});
        }
       
      }
    })
  }
  else{
    res.json({success:false,msg:"Unauthorized"});
  }
});



router.post('/extenddeadline',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(decoded.user.usertype=="admin"){
    deadline=new Date(req.body.deadline).toDateString()
    taskId=req.body.taskId
    Task.extendDeadline(deadline,taskId,(err,task)=>{
      if(err){
        res.json({success:false,msg:"Failed to Extend Deadline"});
      }else{
        res.json({success:true,msg:"Successfuly Extended the Deadline",task:task});
      }
    })
  }
  else{
    res.json({success:false,msg:"Unauthorized"});
  }
});


router.post('/acceptsubmission',passport.authenticate('jwt',{session:false}),(req,res)=>{
  taskId=req.body.taskId
  submissionId=req.body.submissionId
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(user!=null && decoded.user.usertype=="admin"){
    Submission.acceptSubmission(submissionId,(err,result)=>{
      if(err){
        res.json({success:false,msg:"Failed to accept submission!" });
      }else{
        Task.acceptSubmission(taskId,result.userId,(err,resulttask)=>{
          if(err){
            res.json({success:false,msg:"Failed to accept submission!"});
          }
          else{
            if(resulttask.numberOfAcceptedSubmissions===resulttask.numberOfSubmissionsRequired){
              Task.setCompletionStatus(taskId,(err,setresult)=>{
                User.findOneAndUpdate({_id:result.userId},{$inc:{completedTasks:1,gainedPoints:resulttask.pointsAllocated}},{},(err,result)=>{
                  if(err){
                   res.json({success:false,msg:"Failed to accept submission!"});
                  }else{
                    res.json({success:true,msg:" Submission accepted successfully!"});
                  }
                 })
              })
            }
            else{
              User.findOneAndUpdate({_id:result.userId},{$inc:{completedTasks:1,gainedPoints:resulttask.pointsAllocated}},{},(err,result)=>{
                if(err){
                 res.json({success:false,msg:"Failed to accept submission!"});
                }else{
                  res.json({success:true,msg:" Submission accepted successfully!"});
                }
               })
            }
            
          }
        })
      }
    })
  }else{
    res.json({success:false,msg:"Unauthorized!"});
  }
});


router.post('/rejectsubmission',passport.authenticate('jwt',{session:false}),(req,res)=>{

  taskId=req.body.taskId
  submissionId=req.body.submissionId
  usertoken=req.headers.authorization
  token =usertoken.split(' ');
  decoded =jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  if(user!=null && decoded.user.usertype=="admin"){
  Submission.rejectSubmission(submissionId,(err,result)=>{
    if(err){
      res.json({success:false,msg:"Failed to reject submission" });
    }else{
      Task.rejectSubmission(taskId,result.userId,(err,result)=>{
        if(err){
          res.json({success:false,msg:"Failed to reject submission"});
        }
        else{
          res.json({success:false,msg:"Submission rejected successfully!"});
        }
      })
      
    }
  })
  }
  else{
    res.json({success:false,msg:"Unauthorized!"});
  }
});



router.get('/completedtasks',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  Task.getCompltedTasks(userId,(err,tasks)=>{
      if(err){
        res.json({success:false,msg:"Failed to load complted tasks"});
      }else{
        res.json({success:true,tasks:tasks});
      }
  })
})

router.get('/getfullycompltedtasks',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user.usertype==="admin"){
    Task.getFullyCompltedTasks((err,tasks)=>{
      if(err){
        res.json({success:false,msg:"Failed to load tasks"});
      }else{
        res.json({success:true,tasks:tasks,msg:"Successfully loaded tasks"});
      }
  })
  }else{
    res.json({success:false,msg:"unauthorized"})
  }
});

router.get('/getsubmissions',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user.usertype==="admin"){
    Submission.getSubmissions((err,submissions)=>{
      if(err){
        res.json({success:false,msg:"Failed to load submissions"});
      }else{
        res.json({success:true,submissions:submissions,msg:"Successfully loaded submissions"});
      }
  })
  }else{
    res.json({success:false,msg:"Unauthorized"})
  }
});


router.post('/addtask',passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log(req.body)
  usertoken=req.headers.authorization
  token=usertoken.split(' ');
  decoded=jwt.verify(token[1],authconfig.secret);
  newtask={
      title:req.body.title,
      platform:req.body.platform,
      description:req.body.description,
      client:{
        email:req.body.clientEmail,
        name:req.body.clientName,
        contact:req.body.clientContact
      },
      numberOfSubmissionsRequired:req.body.numberOfSubmissionsRequired,
      deadline:new Date(req.body.deadline).toDateString(),
      pointsAllocated:req.body.pointsAllocated,
      gain:req.body.gain,
      deleted: false,
      paused:false,
      taskLink:req.body.taskLink
  }  
  newtask.addedDate= new Date().toDateString()
  newtask.numberOfSubmissions=0
  newtask.submittedList=[]
  newtask.completionStatus=false
  newtask.numberOfAcceptedSubmissions=0
  newtask. numberOfRejectedSubmissions=0
  if(decoded.user!=null && decoded.user.usertype=="admin"){
    task=new Task(newtask)
    Task.addTask(task,(err,task)=>{

      if(err){ 
        console.log(err)
       res.json({success:false,msg:"Failed to add new task"})
      }
      else{
        res.json({success:true,task:task,msg:"Successfully added new task!"})
      }
    })
  }
  else{
    res.json({success:false,msg:"Failed to add new task!,unauthorized"})
  }
})



router.post('/submitprooftask',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  userId=decoded.user._id
  taskId=req.body.taskId
  files=req.body.files
  if(decoded.user!=null && decoded.user.usertype=="reviewer"){
    User.findOne({_id:decoded.user._id},(err,user)=>{
    if(err){
      res.json({success:false,msg:"Unauthorized!"})
    }
    else{
     Task.getTask(taskId,(err,task)=>{
      if(err){
        res.json({success:false,msg:"Task Could not be found"})
      }
      else{
        if(task && task.numberOfAcceptedSubmissions < task.numberOfSubmissionsRequired && !task.completionStatus  && !task.paused && new Date(task.deadline).getTime() > new Date().getTime() && !task.deleted && !user.banned ){
          if(!(task.submittedList.filter((obj)=>{return obj.userId=userId})[0])){
            proof=[]
            files.forEach((file,index)=>{
              cloudinary.uploader.upload(file, { tags:decoded.user.email },function(error, result) {
                if(error){
                  console.log(error,"error")
                  res.json({success:false,msg:"Unable to submit proof!"})
                }
                else if(result){
                  proof.push(result.url)
                  if(index==files.length-1){
                    newSubmission=new Submission({
                      userId:userId,
                      user:decoded.user,
                      taskId:taskId,
                      proof:proof,
                      submittedDate:new Date().toDateString(),
                      acceptance:false,
                      rejected:false,
                  })
                  Submission.addSubmission(newSubmission,(err,submission)=>{
                    if(submission){
                      Task.submitTaskProof(taskId,userId,submission._id,(err,result)=>{
                      if(err){
                        res.json({success:false,msg:"Failed to submit proof"})
                      }
                      else{
                        res.json({success:true,msg:"Submitted proof Successfully!Thank you for your contribution",data:submission})
                      }
                      })
                   }
                   else{
                     res.json({success:false,msg:"Failed to submit proof!,Try again"})
                   }
                  })
                  }
                }
                else{
                  res.json({success:false,msg:"Unable to submit proof!"})
                }})
            })
          }
          else{
            res.json({success:false,msg:"you have already submitted proof of work"})
          }
          
        }
        else{
          if(!task){
            res.json({success:false,msg:"Task not available"})
          }
          else if(user.banned){
            res.json({success:false,msg:"You are unauthorized!"})
          }
          else if(task.numberOfAcceptedSubmissions> task.numberOfSubmissionsRequired){
            res.json({success:false,msg:"Sorry! Task is already occupied by other reviewers"})
          }
          else if( new Date(task.deadline).getTime() > new Date().getTime()){
            res.json({success:false,msg:"You didn't submit the task in time!! "})
          }
          else if(task.paused){
            res.json({success:false,msg:"Task is halted temporarily!, try again later"})
          }
          else if(task.completionStatus){
            res.json({success:false,msg:"Task is no longer accepting submissions"})
          }
          else{
            res.json({success:false,msg:"Task not avaialble"})
          }
        }
      }
      
    })
   }
  })
  }
  else{
    res.json({success:false,msg:"Unauthorized"})
  }
})


router.post('/loadsubmissionsoftask',passport.authenticate('jwt',{session:false}),(req,res)=>{
  taskId=req.body.taskId
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user!=null && decoded.user.usertype=="admin"){
      Submission.getSubmissionsofTask(taskId,(err,submissions)=>{
        if(err){
          res.json({success:false,msg:"Unable to load submissions"})
        }
        else if(submissions){
          res.json({success:true,msg:"Successfully loaded tasks",submissions:submissions})
        }
        else{
          res.json({success:false,msg:"No submissions"})
        }
      })
    }
  else{
    res.json({success:false,msg:"Unauthorized"})
  }

})

router.post('/changeprofilepic',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  pic=req.body.pic
  if(decoded.user!=null){
     cloudinary.uploader.upload(pic, { tags: "basic_sample" },function(error, result) {
        if(error){
          console.log(error,"error")
          res.json({success:false,msg:"Unable to update profile picture"})
        }
        else if(result){
          console.log(result, 'result')
          User.changeProfilePic(decoded.user._id,result.url,(err,user)=>{
            if(err){
              res.json({success:false,msg:"Unable to update profile picture"})
            }
            else{
              res.json({success:true,msg:"Profile picture updated Successfully",picture:user.profilepic})
            }
          })
        }
        else{
          res.json({success:false,msg:"Unable to update profile picture"})
        }
     });
    }
  else{
    res.json({success:false,msg:"Unauthorized"})
  }

})

//-------------------------------------------------------------------------------------


router.get('/isauthenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  if(usertoken){
   token = usertoken.split(' ');
   decoded = jwt.verify(token[1],authconfig.secret)
   user=decoded.user
   if(user!=null){
    res.json({success:true,user:user})
   }
   else{
    res.json({success:false})
   }
  }else{
    res.json({success:false})
  }
})


router.get('/getperformance',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  user=decoded.user
  if(user!=null){
    Submission.findByUserId(user._id,(err,submissions)=>{
      if(err){
        res.json({success:false,msg:"failed load performance"})
      }
      else{
        taskIdList=[]
        count=0
        submissions.forEach((submission)=>{
          if(submission.acceptance){
            count=count+1
            taskIdList.push(submission.taskId)
          }
          
        })
        Task.findPoints(taskIdList,(err,tasks)=>{
          if(err){
            res.json({success:false,msg:"failed load performance"})
          }
          else{
            points=0
            tasks.forEach((task)=>{
              points=points+task.pointsAllocated
            })
            res.json({success:true,count:count,points:points,msg:"Successfully loaded performance"})
          }
          
        })
      }
    })
   
    
  }
  else{
    res.json({success:false,msg:"Unauthorized"})
  }
})
router.post('/loadUser',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  if(usertoken){
   token = usertoken.split(' ');
   decoded = jwt.verify(token[1],authconfig.secret)
   user=decoded.user
   if(user!=null && user.usertype==="admin"){
     User.findOne({_id:req.body.userId},(err,user)=>{
       if(err){

       }
       else if(user){
       res.json({success:true,msg:"Successfully loaded user", user:user})
       }
       else{
        res.json({success:false,msg:"User is not available"})
       }
     })
   }
   else{
    res.json({success:false,msg:"Unauthorized"})
   }
  }else{
    res.json({success:false,msg:"Unauthorized"})
  }
})

router.get('/gethomedetails',(req,res)=>{
  User.countDocuments({usertype:"reviewer"},(err,userCount)=>{
    
    if(err){
      res.json({success:false,msg:"couldn't get the user count"})
    }else{
      User.find({},(err,users)=>{
        if(err){
          res.json({success:false,msg:"couldn't load users"})
        }
        else{
          topFive=[]
          users.sort((a, b) => (a.gainedPoints < b.gainedPoints) ? 1 : -1)
          for(i=0;i<users.length && i<5;i++){
            if(users[i].usertype!="admin"){
              let data={}
              data.name=users[i].firstname.concat(" ").concat(users[i].lastname)
              data.profile=users[i].profilepic
              data.tasks=users[i].completedTasks
              topFive.push(data)
            }
          }
          Task.countDocuments({completionStatus:true},(err,taskCount)=>{
            if(err){
             res.json({success:false,msg:"couldn't get the task count"})
            }
            else{
              Task.find({completionStatus:true},(err,completedtasks)=>{
                if(err){
                 res.json({success:false,msg:"couldn't calculate  the points count"})
                }
                else{
                  Point.getPointValue((err,pointval)=>{
                    if(err){
                      res.json({success:false,msg:"couldn't load point value "})
                    }
                    else{
                      pointCount=0
                      completedtasks.forEach((task)=>{
                        pointCount=pointCount+task.numberofReviewersRequired*task.pointsAllocated
                      })
                      data={
                      numberOfReviewers:userCount,
                      numberOfTasksCompleted:taskCount,
                      numberOfPointsDistributed:pointCount,
                      pointValue:pointval[0].value,
                      topFive:topFive
                      }
                      res.json({success:true,data:data})
                      }
                    
                  })
                  
                }
              })
            }
          })
        }
        
      })
       
    }
    
  })
})
router.get('/getreviewers',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user.usertype==='admin'){
     User.find({usertype:"reviewer"},(err,users)=>{
       if(err){
         res.json({success:false,msg:"Couldn't users,unknown error"})
       }
       else{
         var promisses=users.map((user)=>{
            profiles=[]
            user.accounts.forEach((account)=>{
                  profiles.push(account.profilelink.concat('\n\n'))      
            })
            return (
              {
                userId:user._id,
                name:user.firstname.concat(' ').concat(user.lastname),
                email:user.email,
                phone:user.phone,
                gainedPoints:user.gainedPoints,
                completedTasks:user.completedTasks,
              }
            )  
            
         })
        
         Promise.all(promisses).then(function(values){
          res.json({success:true,reviewers:values})
         }
         )
         
       }
     })
  }
  else{
    res.json({success:false,msg:"Unauthorized!"})
  }
})
//chat





//claim points
router.post('/setpointvalue',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user!=null && decoded.user.usertype==="admin"){
    newValue=req.body.value
    Point.getPointValue((err,point)=>{
      if(err){
        res.json({success:false,msg:"Couldn't set point value"})
      }
      else{
        if(point.length==0){
            let newPoint=new Point({
                value:newValue
            })
            newPoint.save((err,point)=>{
              if(err){
                res.json({success:false,msg:"Couldn't set point value"})
              }
              else{
                res.json({success:true,msg:"Successfully Changed Point Value"})
              }
          
            })
            
        }
        else{
          Point.setPointValue(newValue,point[0]._id,(err,pointval)=>{
            if(err){
              res.json({success:false,msg:"Couldn't set point value"})
            }
            else{
              res.json({success:true,msg:"Successfully Changed Point Value",value:newValue})
            }
          })
         }
      }
  })

  }
  else{
    res.json({success:false,msg:"Unauthorized!"})
  }
})
router.get('/getpointvalue',(req,res)=>{
  Point.getPointValue((err,point)=>{
    if(err){
      res.json({success:false,msg:"Couldn't get point value!"})
    }
    else{
      res.json({success:false,msg:"Successfully loaded point value",pointval:point[0].value})
    }
  })
})
router.post('/claimpoints',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user!=null && decoded.user.usertype==="reviewer" && !decoded.user.banned){
    claimObj=req.body
    if(claimObj.amount>10000){
      res.send({success:false,msg:"Enter an amount less than 10000"})
    }
    else{
      User.findOne({_id:decoded.user._id},(err,user)=>{
        if(user.gainedPoints<claimObj.amount){
          res.json({success:false,msg:"You have not enough points to claim"})
        }
        else if(user.gainedPoints<1000){
          res.json({success:false,msg:"You must have more than 1000 points to claim"})
        }
        else{
          Point.getPointValue((err,point)=>{
            if(err){
              res.json({success:false,msg:"Couldn't get point value!"})
            }
            else{
              claimDetails=req.body
              claimDetails.currency=point[0].value * claimDetails.amount
              let claim=new Claim({
                userId:decoded.user._id,
                user:{
                  name:decoded.user.firstname.concat(" ").concat(decoded.user.lastname),
                  email:decoded.user.email,
                  phone:decoded.user.phone
                },
                claimDetails:req.body,
                paymentStatus:false,
                requestedDate:new Date().toDateString(),
              })
              claim.save((err,claim)=>{
                if(err){
                  res.json({success:false, msg:"Couldn't claim points,Try again!"})
                }
                else{ 
                  User.claimPoints(claimObj.amount,decoded.user._id,(err,user)=>{
                  if(err){
                    res.json({success:false, msg:"Couldn't claim points,Try again!"})
                  }else{
                    res.send({success:true, msg:"Point Claim request placed successfully! You will have your payment with in 24 hours."})
                  }
                })
                }
                
            })
            }
          })
      }
    })
    }
  }
  else{
    if(decoded.user.banned){
      res.json({success:false, msg:"Sorry you are not authorized to claim points!"})
    }

  }
})
router.post('/payclaim',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user!=null && decoded.user.usertype==="admin"){
    claimback=req.body.payObj
    payObj=req.body.payObj
    file=req.body.file
    payObj.payedDate=new Date().toDateString()
    payObj.paymentStatus=true
    Claim.payClaim(payObj,(err,claim)=>{
      if(err){
        res.json({success:false,msg:"Couldn't make the payment!"})
      }
      else{
        async.waterfall([
          function(user, done) {
            var smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: gaccount.email,
                pass: gaccount.password
              }
            });
            var mailOptions = {
              to: payObj.user.email,
              from: gaccount.email,
              subject: 'Points Claim Statement',
              text: 'Hi '.concat(payObj.user.name).concat(',\n\n') +
                'Following is the payment details of the claim No:'.concat(payObj._id).concat('\n') +
                'For additional deatils please refer the document attached here with.\n\n\n'+
                'Claim no: '.concat(payObj._id).concat('\n')+
                'Claim Amount: '.concat(payObj.claimDetails.amount).concat(' points\n')+
                'Value: '.concat(payObj.claimDetails.currency).concat(' $\n')+
                'Claim method: '.concat(payObj.claimDetails.method).concat('\n')+
                'payed Date: '.concat(payObj.payedDate).concat('\n'),

            };
            smtpTransport.sendMail(mailOptions, function(err) {
              if(err){
                return res.json({success:false,msg:"Couldn't send payment notice"})
              }
              else{
                return res.json({success:true,claim:claimback,msg:"Sucessfully sent payment notice "})
              }
              
             });
          }
         ])
      }
      
    })
    
  }
  else{
    res.json({sucess:false,msg:"Unauthorized!"})
  }
})
router.get('/loadclaims',passport.authenticate('jwt',{session:false}),(req,res)=>{
  usertoken=req.headers.authorization
  token = usertoken.split(' ');
  decoded = jwt.verify(token[1],authconfig.secret)
  if(decoded.user!=null && decoded.user.usertype==="admin"){
    Claim.find({paymentStatus:false},(err,claims)=>{
      if(err){
        res.json({success:false,msg:"Couldn't load claims!"})
      }
      else{
        res.json({success:true,msg:"Payments loaded successfully!",claims:claims})
      }
    })
  }
})
module.exports=router;
 