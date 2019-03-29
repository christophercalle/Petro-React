const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = express.Router();
const PORT = 4000;

let Item = require('./item.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/petro', {useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

itemRoutes.route('/').get(function(req,res){
  Item.find(function(err, petro){
    if (err) {
      console.log(err);
    } else {
      res.json(petro);
    }
  });
});

itemRoutes.route('/:id').get(function(req,res){
  let id = req.params.id;
  Item.findById(id, function(err, item){
    res.json(item);
  });
});

itemRoutes.route('/add').post(function(req,res) {
  let item = new Item(req.body);
  item.save()
    .then(item => {
      res.status(200).json({'item': 'item added successfully'});
    })
    .catch(err => {
      res.status(400).send('adding new item failed');
    });
});

itemRoutes.route('/delete/:id').get(function(req,res){
  let itemId = req.params.id
  console.log(itemId)
 Item.findByIdAndDelete(itemId,(error,item)=>{
  if(error) {
     res.status(500).json({error: 'Status Error: 500'})
     return
      }
      res.json({success: true})
   })
})

app.use('/petro', itemRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
} );