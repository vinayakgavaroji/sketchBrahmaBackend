const client = require('./db');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const PORT = 3000

app.listen(3000, (req, res) => {
    console.log('Express API is running at port:' + PORT);
});

client.connect();

app.get('/userDetailsById/:id', (req, res) => {
    client.query(`Select * from registerUser where id=${req.params.id}`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/registeredUsers', (req, res) => {
    client.query(`Select * from registerUser`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/registerUser', (req, res)=> {
    const user = req.body;
    // console.log("vinayakk", user);
    let insertQuery = `insert into registeruser(id, name, email, phone_no, password) 
                       values(${user.id}, '${user.name}', '${user.email}', '${user.phone_no}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(201).json({statusCode: 201, message:"successfully"})
        }
        else{ console.log(err.message) }
    });
    client.end;
})

app.delete('/deleteUser/:id', (req, res)=> {
    let insertQuery = `delete from registeruser where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.get('/logout', (req, res) => {
    const user = req.body;
    // console.log("ddadasdas", user);
    if(user){
        req.body = null;
        console.log("asdasdasd", req.body);
        return res.status(201).json({statusCode: 201, message:"user logout successfully"})
    }
    res.status(201).json({statusCode: 201, message:"user logout successfully"})
})

app.get('/userDetails', (req, res) => {
    client.query(`Select * from registerUser`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})