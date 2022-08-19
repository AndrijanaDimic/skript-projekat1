const express = require('express');
const { sequelize, TypeOfProduct, ProductCategory, Product, ShopCard} = require('./models');
const msgs = require('./routes/messages');
const home = require('./routes/home');
const product = require('./routes/product');
const productType = require('./routes/productType');
const category = require('./routes/productCategory');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const order = require('./routes/order');
const { TokenExpiredError } = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const shopcard = require('./models/shopcard');
const { Op } = require('sequelize');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true 
});

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions));
app.use('/admin', msgs);
app.use('/admin',product);
app.use('/admin',productType);
app.use('/admin',order);
app.use('/admin',category);


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(404, '/loginAdmin');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(404, '/loginAdmin');
    
        req.user = user;
    
        next();
    });
}

app.get('/slikarskiPribor', (req, res) => {
    TypeOfProduct.findAll({where : {productCategoryId:1 }})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
}),
app.get('/boje', (req, res) => {
    TypeOfProduct.findAll({where : {productCategoryId:2}})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});
app.get('/kreativniPribor', (req, res) => {
    TypeOfProduct.findAll({where : {productCategoryId:3}})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});
app.get('/crtanje', (req, res) => {
    TypeOfProduct.findAll({where : {productCategoryId:4}})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});
app.get('/productCategories', (req, res) => {
    ProductCategory.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});
app.get('/productType', (req, res) => {
    TypeOfProduct.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});
app.get('/productType/:id', (req,res) => {
    console.log('id sp je ' + req.params.id)
    Product.findAll({where : {productTypeId : req.params.id}})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err) );
});
app.get('/search/:productTypeId/:searchQuery/:page', (req,res) => {
    const { Op } = require("sequelize");
    var page = parseInt(req.params.page);
    var size = 3;
    var br = 0
    page = page - 1
    const min =  (page * size) + 1
    const max = min + size - 1
    obj = []
    Product.findAll( {
         where :  {
            [Op.and] : [
                {productTypeId: req.params.productTypeId}, 
                {name: { 
                        [Op.like]: '%' + req.params.searchQuery + '%'
                    }
                } 
            ]
        }
    })
    .then(rows => 
         rows.map(item => {
                br++;
                if(br >= min && br <= max){
                    obj.push(item)
                }

    })
    ).then(r=> res.json(obj))
    .catch( err => res.status(500).json(err) );
});

app.get('/search/total/:productTypeId/:searchQuery', (req,res) => {
    const { Op } = require("sequelize");
    var br = 0
    Product.findAll( {
         where :  {
            [Op.and] : [
                {productTypeId: req.params.productTypeId}, 
                {name: { 
                        [Op.like]: '%' + req.params.searchQuery + '%'
                    }
                } 
            ]
        }
    })
.then(rows => 
     rows.map(item => {
        console.log(br)
            br++;

})
).then(r=> res.json(br))
.catch( err => res.status(500).json(err) );
});
// {[Op.and]: [{productTypeId : req.params.productTypeId}, {name : {[Op.like] : '%' + req.params.searchQuery }} ] }
app.get('/product/:name', (req,res) => {
    console.log('name je  ' + req.params.name)
    Product.findOne({where : {name : req.params.name}})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err) );
});
app.get('/product/:productTypeId/:page/:size', (req,res) => {
    const { Op } = require("sequelize");
    console.log(req.params.productTypeId + req.params.page + req.params.size)
    var page = parseInt(req.params.page);
    var size = parseInt(req.params.size);
    const min =  (page * size) + 1
    const max = min + size - 1


    console.log('min' + min + 'max'  + max)
    Product.findAll(
        { where : 
            {[Op.and]: [{productTypeId : req.params.productTypeId}, {rowNum: {[Op.between] : [min,max]}} ]   }
        })
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err) );
});
app.get('/totalProducts', (req, res) => {
    Product.findAll().then(rows => res.json(rows.length))
})

app.post('/shopCard/:userId/:productId', (req,res) => {
    const obj = {
        userId: req.params.userId,
        productId: req.params.productId
    };
    
    ShopCard.create({userId: req.params.userId, productId: req.params.productId })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});
 app.get('/shopCard/:userId', (req,res) => {
    c = []
    br = 0
    const { Op } = require("sequelize");
    ShopCard.findAll({where : {userId : req.params.userId}})
            .then(shopcard => 
                shopcard.map(item => {
                    console.log(item.productId)
                    c.push(item.productId)
                   
                })).then(rows=> Product.findAll({ where : { id : { [Op.in]: c } } },)).then(rows=> res.json(rows))
});
app.delete('/shopCard/:userId/:productId', (req,res)=> {
    ShopCard.findOne({ where:
        {[Op.and]: [{userId : req.params.userId}, {productId : req.params.productId} ]}})
    .then( row => {
            row.destroy()
    }).catch( err => res.status(400).json(err) );

}) 
/*app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});
*/
app.get('/loginAdmin', (req, res) => {
    res.sendFile('loginAdmin.html', { root: './static' });
});
app.get('/',authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}
io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('comment', msg => {
        Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
            .then( rows => {
                Messages.findOne({ where: { id: rows.id }, include: ['user'] })
                    .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});