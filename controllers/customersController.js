Customers = require('../models/customersModel');

//For index
exports.index = function (req, res) {
    Customers.get(function (err, customers) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Customers Successfully!",
            data: customers       
        });
    });
};

//For creating new Customer
exports.add = function (req, res) {
    var customer = new Customers();
    customer.customer_id = req.body.customer_id ? req.body.customer_id : customer.customer_id;
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.gender = req.body.gender;
    customer.country = req.body.country;
    customer.city = req.body.city;
    customer.street = req.body.street;
    customer.phone = req.body.phone;
    customer.total_price = req.body.total_price;
    customer.currency = req.body.currency;
    customer.cerdit_card_type = req.body.cerdit_card_type;
    customer.cerdit_card_number = req.body.cerdit_card_number;

//Save and check error
customer.save(function (err) {
        if (err) res.json(err);
        res.json({
            message: "New customer Added!",
            data: customer
        });
    });
};

// View customer
exports.view = function (req, res) {
    Customers.findById(req.params._id, function (err, customer) {
        if (err) res.send(err);
        res.json({
            message: 'customer Details',
            data: customer
        });
    });
};

// Update customer
exports.update = function (req, res) {
    Customers.findById(req.params._id, function (err, customer) {
        if (err) res.send(err);
        customer.customer_id = req.body.customer_id;
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.email = req.body.email;
        customer.gender = req.body.gender;
        customer.country = req.body.country;
        customer.city = req.body.city;
        customer.street = req.body.street;
        customer.phone = req.body.phone;
        customer.total_price = req.body.total_price;
        customer.cerdit_card_type = req.body.cerdit_card_type;
        customer.cerdit_card_number = req.body.cerdit_card_number;

//save and check errors
customer.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "customer Updated Successfully",
                data: customer
            });
        });
    });
};

// Delete customer
exports.delete = function (req, res) {
    Customers.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'customer Deleted'
        })
    })
}