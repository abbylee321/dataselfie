const fs = require('fs');
//Use Express to create my web server 
//have access to Express package, like an import statement 
const express = require('express');

const Datastore = require('nedb');

//create my application 
const app = express(); 

//server is listening for requests (port, callback)
app.listen(3000, () => console.log('listening at 3000')); 

//give server my public folder file to access the contents, serve the static content 
app.use(express.static('public'));

//parse data as JSON
app.use(express.json({limit: '1mb'})); 

//database stored on local laptop 
const database  = new Datastore('database.db');
database.loadDatabase(); 
// database.insert({name: 'Sheefmahn', status: 'rainbow'});
// database.insert({name: 'Dan', status: 'train'});

//callback function with request and response 
app.get('/api', (req, res) => {
     database.find({},(err, data) => {
          if (err) {
               res.end();
               return; 
          }
          res.json({data});
     });
});

// '/' is the address where I receive that post also called an endpoint,  and callback function(req,res) where I look at info coming in and set up response 
//request and response are arguments
//request variable holds everything that's contained within that request(any data that's being sent, any info I need I need to know about that particular client that's sending the info)
//response variable is used to send things back to client  
app.post('/api', (req, res) => {
     // console.log('I got a request!');
     console.log(req.body);
     const data = req.body;
     const base64Data = data.image64.replace(/^data:image\/png;base64,/, "");
     //URL path
     const filePath = `/logs/images/${data.vegetable}.png`;
     //path in my local file 
     fs.writeFile(__dirname + "/public" + filePath, base64Data, "base64", function (err) {
          console.log(err);
     }); 

     //...data is referencing all items contained in data, only change is image64
     const formattedData = {
          ...data,
          image64: filePath,
     };

     const timestamp = Date.now();
     data.timestamp = timestamp;
     console.log(timestamp);
     database.insert(formattedData);
     res.json(formattedData);
     

     // //read as json
     // res.json({
     //      status: "success",
     //      timestamp: timestamp,
     //      latitude: data.lat,
     //      longitude: data.lon,
     //      vegetable: data.vegetable
     // });
}); 

//trying to retrieve files 
app.get('/getlat', (req, res) => {
     database.find({image64: /radish/}, (err, output) => {
          if (err){
               response.end();
               return; 
          }
          res.JSON(output);
     }); 
}); 