
// import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactControllers';
const express = require('express');
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactControllers');
const validateToken = require('../middleware/ValidateTokenHandler');
const router = express.Router();

router.use(validateToken)
router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;