const express = require('express');
const router = express.Router({ mergeParams: true });

const {
	getAllTickets,
	getTicket,
	createTicket,
	editTicket,
	deleteTicket,
} = require('../controllers/tickets');

router.route('/').post(createTicket).get(getAllTickets);
router
	.route('/:ticketID')
	.get(getTicket)
	.patch(editTicket)
	.delete(deleteTicket);

module.exports = router;
