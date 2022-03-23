const express = require("express")
const router = express.Router()

const { getAllTickets, getTicket, createTicket, editTicket, deleteTicket } = require("../controllers/tickets")

router.route("/").post(createTicket).get(getAllTickets)
router.route("/:id").get(getTicket).patch(editTicket).delete(deleteTicket)

module.exports = router;