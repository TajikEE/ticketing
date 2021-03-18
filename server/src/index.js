import express from "express";
require("dotenv").config();
import mongoose from "mongoose";
import Ticket from "./model";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  const createTicket = new Ticket({
    title,
    description,
    dueDate,
    status,
    priority,
  });

  await createTicket.save();

  res.json({ status: 200 });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
