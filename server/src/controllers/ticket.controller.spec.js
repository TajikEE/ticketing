const { MongoClient } = require("mongodb");

describe("test mocking mongodb with correct input parameters", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const tickets = db.collection("ticket");

    const ticket = {
      description: "asd",
      dueDate: "2021-03-29T21:00:00.000Z",
      email: "asd@gmail.com",
      priority: 2,
      status: "OPEN",
      title: "asd",
      _id: "6059c01bbb714916913df4qw",
    };

    await tickets.insertOne(ticket);

    const insertedTicket = await tickets.findOne({
      _id: "6059c01bbb714916913df4qw",
    });

    expect(insertedTicket).toEqual(ticket);
  });
});
