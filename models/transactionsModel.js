var mongoose = require('mongoose');
//schema
var transactionsSchema = mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total_price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    cerdit_card_type: {
        type: String,
        required: true
    },
    cerdit_card_number: {
        type: String,
        required: true
    },
});

// Export transactions Model
var Transactions = module.exports = mongoose.model('transactions', transactionsSchema);
module.exports.get = function (callback, limit) {
    Transactions.find(callback).limit(limit); 
}