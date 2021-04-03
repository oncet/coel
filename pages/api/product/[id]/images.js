import nc from "next-connect";
import multer from "multer";

// import prisma from "../../../../lib/prisma";

var storage = multer.diskStorage({
  destination: "public/uploads",
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
  // TODO Update records on db
  // console.log("req", req.files);
  const { id } = req.query;
  // await prisma.product.update({
  //   where: { id: Number(id) },
  //   data: req.body,
  // });
  res.end();
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
