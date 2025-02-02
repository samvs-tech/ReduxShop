const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const Order = require('../models/Order.js');
const db = require('./connection.js');

const models = {
  User,
  Product,
  Category,
  Order
};

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}