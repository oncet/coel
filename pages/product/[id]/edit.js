import { Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import prisma from "../../../lib/prisma";
import Field from "../../../components/field";

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

  const { id, name, slug, description, price } = product;

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
        initialValues={{ name, slug, description, price }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Name"
              name="name"
              errors={errors.name}
              touched={touched.name}
              required
            />
            <Field
              label="Slug"
              name="slug"
              errors={errors.slug}
              touched={touched.slug}
              required
            />
            <Field
              label="Price"
              name="price"
              errors={errors.price}
              touched={touched.price}
              type="number"
              required
            />
            <Field
              label="Description"
              name="description"
              errors={errors.description}
              touched={touched.description}
              as="textarea"
            />
            <button
              className="btn mt-2 w-full disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Edit;
