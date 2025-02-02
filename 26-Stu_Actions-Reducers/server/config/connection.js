const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/mernshopping', {
});

module.exports = mongoose.connection;
