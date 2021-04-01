const  handelRegister =(request, response ,db,bcrypt)=>{
    const {email,name,password}= request.body;
    if(!email || !name || !password){
      return  response.status(400).json('incorrect form submisson')
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);   
      db.transaction(trx=>{
          trx.insert({
            hash:hash,
            email:email,
          })
          .into('login')
          .returning('email')
          .then(LoginEmail =>{
           return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:LoginEmail[0],
                joined: new Date()
            }).then(user =>{
                response.json(user[0]);
          })
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
       
       .catch(err => response.status(400).json('Unable to Register'))
       
        
}


module.exports={
    handelRegister:handelRegister
}