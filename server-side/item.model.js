const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
  item_title: {
    type: String
  },
  item_description: {
    type: String
  },
});

module.exports = mongoose.model('item', Item);