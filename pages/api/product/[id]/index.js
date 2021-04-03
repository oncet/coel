import prisma from "../../../../lib/prisma";

const putHandler = async (req, res) => {
  const { id } = req.query;
  await prisma.product.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.statusCode = 200;
};

const methodHandlers = {
  PUT: putHandler,
};

export default async (req, res) => {
  if (methodHandlers.hasOwnProperty(req.method)) {
    await methodHandlers[req.method](req, res);
  } else {
    console.log("Not found!");
    res.statusCode = 404;
  }
  return res.end();
};
