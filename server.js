const express= require('express');
const bodyParser = require('body-parser');
const e = require('express');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '611992',
      database : 'smart-brain'
    }
  });
const register= require('./controllers/register')  ;
const signin = require('./controllers/signin')
const profile= require('./controllers/profile')
const image = require('./controllers/image')

const app= express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{ res.json('working');})

app.post('/signin',(request, response)=>{signin.handelSigin(request, response,db,bcrypt)});

app.post('/register',(request, response)=>{register.handelRegister(request, response,db,bcrypt)});

app.post('/profile/:id',(request, response)=>{profile.handelProfile(request, response,db)});

app.put('/image',(request, response)=>{image.handelImage(request, response,db)});

app.post('/imageurl',(request, response)=>{image.handelApiCall(request, response)});
      
app.listen(process.env.PORT || 4000,()=>{    console.log(`App is running on ${process.env.PORT}`);})



// 