import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
	{
        title: String,
        description: String,
        dueDate: Date,
        status: String,
        priority: String
	},
	{ collection: 'ticket' }
)

const model = mongoose.model('Ticket', ticketSchema)
export default model