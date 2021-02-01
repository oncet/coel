import prisma from "../../../lib/prisma";

const putHandler = async (req, res) => {
  const { id } = req.query;
  await prisma.product.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.statusCode = 200;
  res.end();
};

const methodHandlers = {
  PUT: putHandler,
};

export default async (req, res) => {
  if (methodHandlers.hasOwnProperty(req.method)) {
    methodHandlers[req.method](req, res);
  } else {
    res.statusCode = 404;
    res.end();
  }
};
