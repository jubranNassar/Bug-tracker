const Ticket = require("../models/ticket")
const { StatusCodes } = require("http-status-codes")
const { BadRequestErrors, NotFoundError } = require("../errors")


const getAllTickets = async (req, res) => {
    const tickets = await Ticket.find({})
    res.status(StatusCodes.OK).json({ tickets, count: tickets.length })
}

const getTicket = async (req, res) => {
    const { params: { id: ticketId } } = req
    const ticket = await Ticket.findOne({ _id: ticketId })
    if (!ticket) {
        throw new NotFoundError("does not exist")
    }
    res.status(StatusCodes.OK).json({ ticket })
}

const createTicket = async (req, res) => {
    const tickets = await Ticket.create(req.body)
    res.status(StatusCodes.CREATED).json({ tickets })
}


const editTicket = async (req, res) => {
    const { params: { id: ticketId, body: title } } = req
    if (title == "") {
        throw new BadRequestErrors("Title field cannot be empty")
    }
    const ticket = await ticket.findByIdAndUpdate({ _id: ticketId }, req.body, { new: true, runValidators: true })

    if (!ticket) {
        throw new NotFoundError("does not exist")
    }

    res.status(StatusCodes.OK).json({ ticket })
}

const deleteTicket = async (req, res) => {
    const { id: ticketId } = req.params
    const ticket = await ticket.findOne({ _id: ticketId })

    if (!ticket) {
        throw new NotFoundError(`No ticket with ID ${ticketId}`)

    }
    await ticket.remove()
    res.status(StatusCodes.OK).json({ msg: "Deleted successfully" })

}

module.exports = { getAllTickets, getTicket, createTicket, editTicket, deleteTicket }