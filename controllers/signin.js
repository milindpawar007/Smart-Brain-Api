const handelSigin =(request, response,db,bcrypt)=>{

    const{email,password}= request.body;
   
    if(!email  || !password)
    {
      return  response.status(400).json('incorrect form submisson')
    }

    db.select('email','hash')
    .from ('login')
    .where('email','=',email)
    .then(data=>{
        const isValid =bcrypt.compareSync(password,data[0].hash)
        if(isValid)
        {
          return  db.select('*')
            .from ('users') 
            .where('email','=',email)
            .then(user=>{
               
                    response.json(user[0]);
               
            })
            .catch(err=> response.status(400).json('unable to get user'))
            
        }else{
            response.status(400).json(' wrong username or password');
        }
    })
    .catch(err=> response.status(400).json(' wrong username or password'));

  
}


module.exports={
    handelSigin:handelSigin
}