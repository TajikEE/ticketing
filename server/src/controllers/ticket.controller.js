import Ticket from "../models/ticket-model";

export async function createTicket(req, res) {
  const { email, title, description, dueDate, priority, status } = req.body;

  const newTicket = new Ticket({
    email,
    title,
    description,
    dueDate,
    priority,
    status,
  });

  await newTicket.save();

  return newTicket;
}

export async function getAllTickets(req, res) {
  const tickets = await Ticket.find({});

  return tickets;
}

export async function getTicketById(req, res) {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  return ticket;
}

export async function updateTicketById(req, res) {
  const { email, title, description, dueDate, priority, status } = req.body;

  //validate for empty fields
  const updateEmail = email === "" || { email };
  const updateTitle = title === "" || { title };
  const updateDescription = description === "" || { description };
  const updateDueDate = dueDate === "" || { dueDate };
  const updatePriority = priority === null || { priority };
  const updateStatus = status === null || { status };

  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...updateEmail,
        ...updateTitle,
        ...updateDescription,
        ...updateDueDate,
        ...updatePriority,
        ...updateStatus,
      },
    },
    { new: true }
  ).exec();

  res.json({ updatedTicket });
}

export async function deleteTicket(req, res) {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  await ticket.delete();

  res.status(200).send();
}
