import express from "express";
require("dotenv").config();
import "./mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { route } from "./utils/route-handler";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  deleteTicket,
  updateTicketById,
} from "./controllers/ticket.controller";
import { validateNewTask } from "./utils/validation.middleware";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  "/ticket",
  [validateNewTask],
  route((req, res) => createTicket(req, res))
);

app.get(
  "/tickets",
  route((req, res) => getAllTickets(req, res))
);

app.get(
  "/ticket/:id",
  route((req, res) => getTicketById(req, res))
);

app.patch(
  "/ticket/:id",
  route((req, res) => updateTicketById(req, res))
);

app.delete(
  "/ticket/:id",
  route((req, res) => deleteTicket(req, res))
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
