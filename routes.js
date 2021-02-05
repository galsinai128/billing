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
var customersController = require('./controllers/customersController');
// transactions routes
router.route('/customers')
    .get(customersController.index)
    .post(customersController.add);
router.route('/customers/:_id')
    .get(customersController.view)
    .patch(customersController.update)
    .put(customersController.update)
    .delete(customersController.delete);

//Export API routes
module.exports = router;