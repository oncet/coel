const putHandler = (req, res) => {
  const { id } = req.query;
  console.log(req.body);
  res.statusCode = 200;
  res.json({ name: "John Doe!!!", id });
};

const methodHandlers = {
  PUT: putHandler,
};

export default (req, res) => {
  if (methodHandlers.hasOwnProperty(req.method)) {
    methodHandlers[req.method](req, res);
  }

  res.statusCode = 404;
  res.end();
};
