//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html")

  });
app.post("/", function(req, res){
  const query = req.body.cityName;
  const appid = "34ffdf15e939a37628ce6e920c263308";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;

  https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      const iconId = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/"+ iconId+ "@2x.png";
      res.write("<p>the weather is currently" + weatherDiscription+ "</p>");
      res.write("<h1>The temperature in London is "+ temp +" degrees<h1>");
      res.write("<img src="+iconURL+">");
      res.send()
    });


});

});



app.listen(3000,function(){
  console.log("The Server is running  on port: 3000");
})
