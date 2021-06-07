import nc from "next-connect";
import { getSession } from "next-auth/client";
import asyncBusboy from "async-busboy";
import cloudinary from "cloudinary";

import prisma from "../../../../lib/prisma";

const handler = nc();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

handler.put(async (req, res) => {
  const { files } = await asyncBusboy(req);

  const session = await getSession({ req });

  if (!session) {
    return res.status(403).end();
  }

  if (!files) {
    return res.status(400).end();
  }

  const promises = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((result) => {
          if (result.error) reject(result.error);

          resolve(result);
        });

        file.pipe(stream);
      })
  );

  const results = await Promise.all(promises);

  const { id } = req.query;

  await prisma.product.update({
    where: { id: Number(id) },
    data: {
      images: {
        create: files.map(({ filename }, index) => {
          const { public_id, secure_url } = results[index];

          return {
            originalName: filename,
            fileName: public_id,
            path: secure_url,
            alt: filename,
          };
        }),
      },
    },
  });

  res.end();
});

handler.get(async (req, res) => {
  const { id } = req.query;

  const { images } = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
    },
  });

  res.json(images);
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
