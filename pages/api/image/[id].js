import prisma from "../../../lib/prisma";

const putHandler = async ({ query, body }, res) => {
  const { id } = query;

  await prisma.image.update({
    where: {
      id: parseInt(id),
    },
    data: body,
  });

  res.statusCode = 200;
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;

  const image = await prisma.image.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  await prisma.image.delete({
    where: {
      id: parseInt(id),
    },
  });

  // TODO Delete file too!
  res.statusCode = 200;
};

const methodHandlers = {
  DELETE: deleteHandler,
  PUT: putHandler,
};

export default async (req, res) => {
  const { method } = req;

  if (methodHandlers[method]) {
    await methodHandlers[method](req, res);
  } else {
    console.warn("Handler not found for method", method);
    res.statusCode = 404;
  }

  return res.end();
};
