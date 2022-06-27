var express = require('express');
var app = express();
app.use('/static', express.static('public'))
const path = require('path');
// const querystring = require('querystring');
// const bodyParser = require('body-parser');
// const url = require('url');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

const zkpMod = require('./static/ZKP')
//
// const forge = require('node-forge')
// const PKI = forge.pki
// const RANDOM = forge.random
// const RSA = forge.pki.rsa
// const MD = forge.md
//
var LocalStorage = require('node-localstorage').LocalStorage;
LocalStorage = new LocalStorage('./scratch')


const login = async(password) => {
   
    const encryptedPrivateKey = LocalStorage.getItem(100)
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password.toString())

    if (!privateKey) {
        return alert('Wrong password mate')
    }
    const [message, signature] = await makeAuthSignature(privateKey, password)

    return [password, message, signature]
}


app.get('/', function(req, res){
    console.log("Got a GET request for the homepage");

    res.sendFile(path.join(__dirname+'/home.html'));

})

// This responds with "Hello World" on the homepage
app.get('/register', function(req, res){
    console.log("Got a GET request for the homepage");
    res.sendFile(path.join(__dirname+'/register.html'));
})


// This responds a POST request for the homepage
app.post('/register', async(req, res) =>{
    let pwd =100;//it has to be random
    console.log("Got a POST request for the homepage");
    const userpwd = await zkpMod.register(pwd)
   // register(pwd);
   
    console.log("pwd is", userpwd)
    res.send(userpwd.toString());
})

// This responds with "Hello World" on the homepage
app.get('/login', function(req, res){
    console.log("Got a GET request for the login");
  //      register();
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
    //const resp = await login(100)
    console.log(" resp ", resp);
    res.send(resp);

})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("App listening at http://%s:%s", host, port)
})