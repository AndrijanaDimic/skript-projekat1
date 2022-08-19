const express = require('express');
const { sequelize, Product, TypeOfProduct, Users} = require('../models');
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

route.get('/product', (req, res) => {
    Product.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});
route.delete('/product', (req, res) => {
    console.log(req.body.id);
    Product.findOne({ where: { id: req.body.id } })
    .then( product => {
              product.destroy()
                .then(rows => res.json(rows))
                .catch( err => res.status(500).json(err));
      })
    .catch( err => res.status(400).json(err) );

})
route.post('/product', (req, res) => {
    const obj = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    };
    
    console.log(req.body.productTypeId)

    TypeOfProduct.findOne({where : {id: req.body.productTypeId}})
        .then(productType =>{
            console.log(productType.productTypeId)
            Product.create({name: req.body.name,price: req.body.price,description: req.body.description, productTypeId: productType.id})
             .then( rows => res.json(rows) )
             .catch( err => res.status(500).json(err) );
       
        }).catch(err => res.status(500).json(err) );
    
});


route.patch('/product', (req, res) => {
    console.log(req.body.id),
    console.log(req.body.price)
    console.log(req.body.description)

    Product.findOne({ where: { id: req.body.id } })
    .then( product => {
        if(!(req.body.price == "")){
            product.price = req.body.price;
            product.save();
        }
         if(!(req.body.name == '')){
            product.name = req.body.name;
            product.save();
        }
        if(!(req.body.description == '')){
            product.description = req.body.description;
            product.save();
        }

    })
    .catch( err => res.status(500).json(err) );
          
});


module.exports = route;