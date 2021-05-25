import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

const postHandler = async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });

  res.json(product);
};

const methodHandlers = {
  POST: postHandler,
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
