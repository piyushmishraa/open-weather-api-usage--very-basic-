const { response } = require('express');
const express = require('express');
const bodyparser= require('body-parser');



const https = require('node:https');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+ "/index.html");
    
});
app.post("/",function(req,res){

    
    const query =req.body.cityname;
    const apikey="75786ad39dbd9e7368394a05491";
    const units="metric";
    
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"feaba&units="+units ;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp=weatherdata.main.temp;
        console.log(temp);
        const description=weatherdata.weather[0].description;
        console.log(description);
        
        
        res.write("<p><h1>the temperature in "+query+" is "+temp+" degree celcius</h1></p>");
        res.write("the weather condition is "+description);
        
        res.send();

     
    }
    );
    
    

    })
    
});

// const query ="Ghaziabad";
//     const apikey="75786ad39dbd9e7368394a05491";
//     const units="metric";
    
//     const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"feaba&units="+units ;
//     https.get(url,function(response){
//         console.log(response.statusCode);

//         response.on("data",function(data){
//         const weatherdata=JSON.parse(data);
//         const temp=weatherdata.main.temp;
//         console.log(temp);
//         const description=weatherdata.weather[0].description;
//         console.log(description);
        
        
//         res.write("<p><h1>the temperature is "+temp+" degree celcius</h1></p>");
//         res.write("the weather condition is "+description);
        
//         res.send();

     
//     }
//     );
    
    

    //})
    

app.listen(3000,function(){
    console.log("server has been started");
});

