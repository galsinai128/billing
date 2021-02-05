Transactions = require('../models/transactionsModel');

//For index
exports.index = function (req, res) {
    Transactions.get(function (err, transactions) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got transactions Successfully!",
            data: transactions       
        });
    });
};

//For creating new transaction
exports.add = function (req, res) {
    var transaction = new Transactions();
    transaction.customer_id =  req.body.customer_id;
    transaction.first_name = req.body.first_name;
    transaction.last_name = req.body.last_name;
    transaction.email = req.body.email;
    transaction.gender = req.body.gender;
    transaction.country = req.body.country;
    transaction.city = req.body.city;
    transaction.street = req.body.street;
    transaction.phone = req.body.phone;
    transaction.total_price = req.body.total_price;
    transaction.currency = req.body.currency;
    transaction.cerdit_card_type = req.body.cerdit_card_type;
    transaction.cerdit_card_number = req.body.cerdit_card_number;

//Save and check error
transaction.save(function (err) {
        if (err) res.json(err);
        res.json({
            message: "New transaction Added!",
            data: transaction
        });
    });
};

// View transaction
exports.view = function (req, res) {
    Transactions.findById(req.params.customer_id, function (err, transaction) {
        if (err) res.send(err);
        res.json({
            message: 'transaction Details',
            data: transaction
        });
    });
};

// Update transaction
exports.update = function (req, res) {
    Transactions.findById(req.params.customer_id, function (err, transaction) {
        if (err) res.send(err);
        transaction.customer_id = req.body.customer_id;
        transaction.first_name = req.body.first_name;
        transaction.last_name = req.body.last_name;
        transaction.email = req.body.email;
        transaction.gender = req.body.gender;
        transaction.country = req.body.country;
        transaction.city = req.body.city;
        transaction.street = req.body.street;
        transaction.phone = req.body.phone;
        transaction.total_price = req.body.total_price;
        transaction.cerdit_card_type = req.body.cerdit_card_type;
        transaction.cerdit_card_number = req.body.cerdit_card_number;

//save and check errors
transaction.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "transaction Updated Successfully",
                data: transaction
            });
        });
    });
};

// Delete transaction
exports.delete = function (req, res) {
    Transactions.deleteOne({
        _id: req.params.customer_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'transaction Deleted'
        })
    })
}