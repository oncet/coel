import { Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import prisma from "../../../lib/prisma";
import BlockField from "../../../components/block-field";
import Field from "../../../components/field";
import Button from "../../../components/button";

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      product,
    },
  };
}

const Edit = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { id, name, slug, description, price, isPublic } = product;

  const handleFormSubmit = async (values, { setSubmiting }) => {
    await ky.put(`http://localhost:3000/api/product/${id}`, {
      json: values,
    });

    toast.success("Product updated!");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().required(),
    price: Yup.number().positive().required(),
  });

  return (
    <>
      <Head>
        <title>Edit product</title>
      </Head>
      <h1>Edit</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ name, slug, description, price, isPublic }}
        validationSchema={validationSchema}
      >
        {({ errors, handleSubmit, isSubmitting, touched }) => (
          <form onSubmit={handleSubmit}>
            <BlockField
              label="Name"
              name="name"
              errors={errors.name}
              touched={touched.name}
              type="text"
              required
            />
            <BlockField
              label="Slug"
              name="slug"
              errors={errors.slug}
              touched={touched.slug}
              type="text"
              required
            />
            <BlockField
              label="Price"
              name="price"
              errors={errors.price}
              touched={touched.price}
              type="number"
              required
            />
            <BlockField
              label="Description"
              name="description"
              errors={errors.description}
              touched={touched.description}
              as="textarea"
            />
            <Field
              label="Public"
              name="isPublic"
              errors={errors.isPublic}
              touched={touched.isPublic}
              type="checkbox"
              className="p-3 rounded"
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
