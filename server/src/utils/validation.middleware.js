export const validateNewTask = (req, res, next) => {
  if (
    req.body.email.length > 256 ||
    req.body.email.length < 5 ||
    req.body.title.length === 0 ||
    req.body.description.length === 0 ||
    req.body.dueDate.length === 0 ||
    req.body.status === null ||
    req.body.priority === null
  ) {
    res.status(400).send({
      message: "Please fill all the fields",
    });
    return;
  }

  req.body.email = req.body.email.toLowerCase();

  next();
};
