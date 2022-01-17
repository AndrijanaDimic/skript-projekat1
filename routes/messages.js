const express = require('express');
const { sequelize, Users, Messages } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
     if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (token == null) return res.status(401).json({ msg: err });
  
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/messages', (req, res) => {
    Messages.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});
route.put('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.userId } })
        .then( usr => {
            usr.create()
        })
        .catch( err => res.status(500).json(err) );
        
});
route.patch('/users', (req, res) => {


    Users.findOne({ where: { id: req.body.id } })
        .then( usr => {
                const role = req.body.role;
                if(role == 'admin' || role == 'moderator' || role == 'user'){
                    usr.role = req.body.role;
                    usr.save();
                }else {
                    res.status(400).json({ msg: "This type of user doesn't exist, look at the example bellow ."})
                }
                if(!req.body.email == ''){
                  usr.email = req.body.email;
                  usr.save();

                }
        
        })
        .catch( err => res.status(500).json(err) );
        
});

route.delete('/users', (req, res) => {
    console.log(req.body.userId);
    Users.findOne({ where: { id: req.body.userId } })
    .then( usr => {
              usr.destroy()
                .then(rows => res.json(rows))
                .catch( err => res.status(500).json(err));
      })
    .catch( err => res.status(400).json(err) );

})
route.post('/messages', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Messages.create({ body: req.body.body, userId: req.user.userId })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

module.exports = route;