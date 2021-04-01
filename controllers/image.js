const Clarifai= require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c37e0ea616854f06b9020d44f7b85821'
   });
 
  const handelApiCall=(request, response)=>{
   app.models.predict(Clarifai.FACE_DETECT_MODEL,request.body.inputUrl) 
    .then(data =>{ 
        response.json(data);
    })
    .catch(err => response.status(400).json('Unable to fetch Clarify API'))    

    
  }

const handelImage =(request, response,db)=>{
   
    const {id} =request.body;
 
         db('users')
         .where('id','=',id)
         .increment('entries',1)
         .returning('entries')
         .then(entries=>{
             if(entries.length)
             {
             response.json(entries[0]);
             }else{
                 response.json('unable get entries');
             }
         })
         .catch(err=> response.status(400).json('123 unable get entries'))
 }


 module.exports={
    handelImage:handelImage,
    handelApiCall:handelApiCall
}