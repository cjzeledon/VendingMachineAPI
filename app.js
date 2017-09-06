const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

//Remember to use THIS code if you are going to use body-parser!
app.use(bodyParser.urlencoded({ extended: false }));

// ******************** VENDING MACHINE API ************************
const db = new Sequelize('venderAPI', 'claudiazeledon', '', {
  dialect: 'postgres',
});

const Vending = db.define('item', {
      name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
});

const Purchases = db.define('purchase',{
    name: Sequelize.STRING,
    price_paid: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
});

// Purchases.belongsTo(Vending, {foreignKey: Vending.id});

Purchases.belongsTo(Vending);

Vending.sync().then(function(){
  console.log('Vending-n-Sync!')
});

Purchases.sync().then(function(){
  console.log('PURCHA-n-Sync!')
});

// Vending.create({
//   name: 'Pineapple and Chocolate Bar',
//   price: 8,
//   quantity: 60,
// });
//
// Vending.create({
//   name: 'Pineapple Bar',
//   price: 7,
//   quantity: 60,
// });
// ***************** END OF VENDING MACHINE API **********************

// Get a list of items
app.get('/api/customer/items', function(req, res){
  Vending.findAll().then(function (stuff) {
    res.json(stuff);
  });
});

// Purchase an item
app.post('/api/customer/items/:itemId/purchases', function(req, res){
  const id = parseInt(req.params.itemId);

  // Vending.findOne({
  //   where: {
  //     id: id,
  //   },
  // }).then(bar => {
  //   Purchases.create({
  //     name: bar.name,
  //     price_paid: bar.price,
  //     quantity: bar.quantity,
  //   }).then(function (purchase) {
  //     // We created a relationship to something called 'Vending'
  //     // Stores the ID
  //     purchase.setItem(bar);
  //   });
  //
  //   }).then(function(){
  //     res.sendStatus(200);
  // });

  Vending.findOne({
    where: {
      id: id,
    },
  }).then(bar => {
    Purchases.create({
      name: bar.name,
      price_paid: bar.price * parseInt(req.body.quantity),
      quantity: parseInt(req.body.quantity),
    }).then(function (purchase) {
      // We created a relationship to something called 'Vending'
      // Stores the ID
      purchase.setItem(bar);
    });

    }).then(function(){
      res.sendStatus(200);
  });

});

// // Get a list of all purchases with their item and date/time
app.get('/api/vendor/purchases', function(req, res){
 Purchases.findAll().then(function (stuff) {
    res.json(stuff);
  });
});

// // Get a total amount of money accepted by the machine
// // This is GET information, meaning you simply want information
// // You are NOT updating, adding or deleting information
app.get('/api/vendor/money', function(req, res){
  Purchases.sum('price_paid').then(function(){res.sendStatus(200);})
});

// Add a new item not previously existing in the machine
app.post('/api/vendor/items', function(req, res){
  Vending.create({
    name: req.body.name,
    price: parseInt(req.body.price),
    quantity: parseInt(req.body.quantity),
  }).then(function(){
    res.sendStatus(200);
  });
});

// Update item quantity, description, and cost
app.put('/api/vendor/items/:itemId', function(req, res){
  const id = parseInt(req.params.itemId);

  Vending.findOne({
    where: {
      id: id,
    },
    }).then(Vending => {Vending.updateAttributes({
      name: req.body.name,
      price: parseInt(req.body.price),
      quantity: parseInt(req.body.quantity)
      });
    }).then(function(){
      res.sendStatus(200);
  });
});

/*
  Vending.update({
  description: req.body.description,
  cost: parseInt(req.body.cost),
  quantity: parseInt(req.body.quantity),
}, where: {
       id: id,
     })
*/

app.listen(3000, function(){
  console.log('Vending Machine is...RUNNING TO YOU.');
});
