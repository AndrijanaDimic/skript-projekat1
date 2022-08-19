const express = require('express');
const { sequelize, Product, ProductCategory, Users} = require('../models');
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

route.get('/productCategory', (req, res) => {
    ProductCategory.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});
route.delete('/productCategory', (req, res) => {
    console.log(req.body.id);
    ProductCategory.findOne({ where: { id: req.body.id } })
    .then( product => {
              product.destroy()
                .then(rows => res.json(rows))
                .catch( err => res.status(500).json(err));
      })
    .catch( err => res.status(400).json(err) );

})
route.post('/productCategory', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.id);
    const obj = {
        name: req.body.name,
        id: req.body.id
    };
    ProductCategory.create(obj)
         .then( rows => res.json(rows) )
         .catch( err => res.status(500).json(err) );
       
});


route.patch('/productCategory', (req, res) => {
    console.log(req.body.name),

    ProductCategory.findOne({ where: { id: req.body.id } })
    .then( product => {
      
         if(!(req.body.name == '')){
            product.name = req.body.name;
            product.save();
        }

    })
    .catch( err => res.status(500).json(err) );
          
});


module.exports = route;