import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import { toast } from "react-toastify";
import ky from "ky";
import prisma from "../../../lib/prisma";
import BlockField from "../../../components/block-field";
import Button from "../../../components/button";

export async function getServerSideProps({ params }) {
  const image = await prisma.image.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      product: true,
    },
  });

  return {
    props: {
      image,
    },
  };
}

const Edit = ({ image }) => {
  const { id, originalName, fileName, alt, product } = image;

  const handleFormSubmit = async (json, { setSubmitting }) => {
    try {
      await ky.put(`http://localhost:3000/api/image/${id}`, {
        json,
      });

      toast.success("Image updated!");
    } catch (error) {
      toast.error(`Image update failed: ${error.message}`);
    }

    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Edit image</title>
      </Head>
      <h1>Edit image</h1>
      <nav className="mb-3">
        <ul>
          <li>
            <Link href={`/product/${product.id}/edit`}>
              <a>Edit product</a>
            </Link>
          </li>
        </ul>
      </nav>
      <p className="break-all">{originalName}</p>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          alt: alt,
        }}
      >
        {({ handleSubmit, isSubmitting, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <img
                src={`/uploads/images/${fileName}`}
                className="my-2 block mx-auto"
                alt={values.alt}
              />
            </div>
            <BlockField
              label="Alternative text"
              name="alt"
              as="textarea"
              required
              errors={errors.alt}
              touched={touched.alt}
            />
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Edit;
