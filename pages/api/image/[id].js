import { getSession } from "next-auth/client";
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

const deleteHandler = async ({ query }, res) => {
  const { id } = query;

  await prisma.image.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.statusCode = 200;

  // TODO Delete file too!
};

const methodHandlers = {
  DELETE: deleteHandler,
  PUT: putHandler,
};

export default async (req, res) => {
  const session = await getSession({ req });

  console.log("session", session);

  const { method } = req;

  if (!session) {
    res.statusCode = 403;
  } else if (methodHandlers[method]) {
    await methodHandlers[method](req, res);
  } else {
    console.warn("Handler not found for method", method);
    res.statusCode = 404;
  }

  return res.end();
};
