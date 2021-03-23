import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    email: String,
    title: String,
    description: String,
    dueDate: Date,
    status: String,
    priority: Number,
  },
  { collection: "ticket" }
);

const model = mongoose.model("Ticket", ticketSchema);

export default model;
