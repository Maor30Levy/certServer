const express = require('express');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs')


const app = express();
const port = 3443;

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    try{
        return res.send('hello')
    }catch(err){
        return res.status(400).send()
    }
});

const sslServer = https.createServer({
    key:fs.readFileSync(path.join(__dirname,'../cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'../cert','cert.pem'))
},app);

sslServer.listen(port, () => {
    console.log(`Secure Server is up on port ${port}!`)
});
