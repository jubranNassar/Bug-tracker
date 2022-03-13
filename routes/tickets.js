const express = require("express")
const router = express.Router()

const { getAllTickets, getTicket, createTicket, editTicket, deleteTicket } = require("../controllers/tickets")

