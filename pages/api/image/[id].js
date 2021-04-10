import prisma from "../../../lib/prisma";

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  await prisma.image.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.statusCode = 200;
};

const methodHandlers = {
  DELETE: deleteHandler,
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
