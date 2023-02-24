const express = require('express');
const router = express.Router();
const customerController = require("../controllers/customerController")

router.get('/', customerController.getAllCustomers);
router.get('/:customerId', customerController.findCustomer)
router.get('/pharmacys/:customerId', customerController.getAllAppartmentsByCustomer)
router.post('/', customerController.createCustomer);
router.put('/update/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);
router.put('/status/:customerId', customerController.updateCustomerStatus);
router.post('/user/reset', customerController.updatePassword);

module.exports = router;