import nc from "next-connect";
import multer from "multer";

import prisma from "../../../../lib/prisma";

var storage = multer.diskStorage({
  destination: "public/uploads/images",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

const uploadMiddleware = upload.array("images");

const handler = nc();

handler.use(uploadMiddleware);

handler.put(async (req, res) => {
  const { id } = req.query;
  await prisma.product.update({
    where: { id: Number(id) },
    data: {
      images: {
        create: req.files.map(({ originalname, filename, path }) => ({
          originalName: originalname,
          fileName: filename,
          path,
        })),
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
