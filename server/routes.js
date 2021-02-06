//routes.js
//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to billing API'
    });
});

//Import transactions Controller
var transactionsController = require('./controllers/transactionsController');
// transactions routes
router.route('/transaction')
    .get(transactionsController.index)
    .post(transactionsController.add);
router.route('/transaction/:_id')
    .get(transactionsController.view)
    .patch(transactionsController.update)
    .put(transactionsController.update)
    .delete(transactionsController.delete);

//Import customer Controller
var customersController = require('./controllers/customersController');
// customer routes
router.route('/customer')
    .get(customersController.index)
    .post(customersController.add);
router.route('/customer/:_id')
    .get(customersController.view)
    .patch(customersController.update)
    .put(customersController.update)
    .delete(customersController.delete);

//Export API routes
module.exports = router;