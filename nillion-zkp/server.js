var express = require('express');
var app = express();
app.use('/static', express.static('public'))
const path = require('path');


const zkpMod = require('./static/ZKP')
//

var LocalStorage = require('node-localstorage').LocalStorage;
LocalStorage = new LocalStorage('./scratch')


app.get('/', function(req, res){
    console.log("Got a GET request for the homepage");
    res.sendFile(path.join(__dirname+'/home.html'));
})


app.get('/register', function(req, res){
    console.log("Got a GET request for the homepage");
    res.sendFile(path.join(__dirname+'/register.html'));
})



app.post('/register', async(req, res) =>{
    console.log("Got a POST request for the homepage");
    const userpwd = await zkpMod.register()   
    console.log("pwd is", userpwd)
    res.send(userpwd.toString());
})


app.get('/login', function(req, res){
    console.log("Got a GET request for the login");
    res.sendFile(path.join(__dirname+'/login.html'));
})

app.post('/login', async(req, res) => {
    
    console.log("Got a POST request from the login");
    console.log("query param ", req.query.password);
    
    const pwd= req.query.password;

    const resp = await zkpMod.login(pwd)
    if(resp ==  null) {
        res.send("Could not able to authenticate.")
    }
   
    console.log(" resp ", resp);
    res.send(resp);

})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("App listening at", host, port)
})