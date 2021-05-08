import { getSession } from "next-auth/client";
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
  const session = await getSession({ req });

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
