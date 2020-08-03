const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
var fname = req.body.fname;
var lname = req.body.lname;
const mail = req.body.email;
console.log(mail);

var data = {
  members: [
    {
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname,

      }

    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us8.api.mailchimp.com/3.0/lists/a43fa55439";

const options = {
  method: "POST",
  auth: "Inayath:c9be64743a960b8f8e8d7d7927bef2e0-us8"
};

const request = https.request(url, options, function(response){
if (response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
});

request.write(jsonData);
request.end();
});


app.listen(3000, function(){
  console.log("listening on port 3000");
});

//api key mail chimp
//c9be64743a960b8f8e8d7d7927bef2e0-us8

//audiance
//a43fa55439
