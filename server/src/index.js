import express from "express";
require("dotenv").config();
import "./mongoose";
import Ticket from "./ticket-model";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
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

  res.json({ newTicket });
});

app.get("/tickets", async (req, res) => {
  const tickets = await Ticket.find({});

  res.json({ tickets });
});

app.get("/ticket/:id", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  res.json({ ticket });
});

app.patch("/ticket/:id", async (req, res) => {
  const { email, title, description, dueDate, priority, status } = req.body;

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
});

app.delete("/ticket/:id", async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  await ticket.delete();

  res.status(200).send();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
