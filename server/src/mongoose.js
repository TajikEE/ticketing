import mongoose from "mongoose";

const MONGO_DEV_URL = `mongodb+srv://ticketing:ntTN5FXPt8d2nu0Z@cluster0.8qsqr.mongodb.net/test`;

export const CONFIG = {
  MONGO: {
    URL: MONGO_DEV_URL,
  },
};

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useCreateIndex: true,
};

mongoose.connect(CONFIG.MONGO.URL, MONGO_OPTIONS);

mongoose.connection
  .on("error", console.error.bind(console, "Mongo error"))
  .on("open", console.log.bind(console, "Mongo connected"));
