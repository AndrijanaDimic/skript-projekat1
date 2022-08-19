const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const BodyParser = require("body-parser");
const { check, validationResult } = require('express-validator')
require('dotenv').config();



const app = express();

app.set('view engine', 'ejs');
const urlencodedParser = BodyParser.urlencoded({ extended: false })

var corsOptions = {
    origin: '*',
    // origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());

app.post('/register' ,  (req, res) => {
    console.log("hello")
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
         return res.status(422).jsonp(errors.array())
      
    } else {
        
        const obj = {
            name: req.body.name,
            email: req.body.email,
            admin: req.body.admin,
            role: 'user',
            password: bcrypt.hashSync(req.body.password, 10),
        };

        Users.create(obj).then(rows => {

            const usr = {
                userId: rows.id,
                user: rows.name
            };

            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

            console.log(token);

            res.json({ token: token });
          
        }).catch(err => res.status(500).json(err));


    }
});

/*app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});
*/

app.post('/loginAdmin', (req, res) => {
    console.log(req.body);
    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if(usr.admin != 1){
                res.status(400).json({ msg: "You are not registered as an admin."});
            }
            else if (bcrypt.compareSync(req.body.password, usr.password) ) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log(usr)
                console.log(token)
                res.json({ token: token, usr: usr});
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});