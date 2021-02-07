import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import prisma from "../../../lib/prisma";

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

  return (
    <>
      <Head>
        <title>Edit product</title>
      </Head>
      <h1>Edit</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ name, slug, description, price }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          slug: Yup.string().required(),
          price: Yup.number().required(),
        })}
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
            <label className="block" htmlFor="name">
              Name
            </label>
            <Field
              className="border w-full px-2 py-1"
              id="name"
              name="name"
              required
            />
            {!!(errors.name && touched.name) && <div>{errors.name}</div>}
            <label className="block mt-2" htmlFor="slug">
              Slug
            </label>
            <Field
              className="border w-full px-2 py-1"
              id="slug"
              name="slug"
              required
            />
            {!!(errors.slug && touched.slug) && <div>{errors.slug}</div>}
            <label className="block mt-2" htmlFor="price">
              Price
            </label>
            <Field
              className="border w-full px-2 py-1"
              id="price"
              name="price"
              required
              type="number"
            />
            {!!(errors.price && touched.price) && <div>{errors.price}</div>}
            <label className="block mt-2" htmlFor="description">
              Description
            </label>
            <Field
              as="textarea"
              className="border w-full px-2 py-1"
              id="description"
              name="description"
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
