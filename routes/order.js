const express = require('express');
const { sequelize, Users, Order} = require('../models');
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

route.get('/order', (req, res) => {
    Order.findAll({ include: ['user'] })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});


route.delete('/order', (req, res) => {
 console.log(req.body.id)
   Order.findOne({ where: { id: req.body.id} })
    .then( order => {
        console.log(order)
              order.destroy()
                .then(rows => res.json(rows))
                .catch( err => res.status(500).json(err));
      })
    .catch( err => res.status(400).json(err) );

})

module.exports = route;