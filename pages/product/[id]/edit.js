import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik } from "formik";
import ky from "ky";
import prisma from "../../../lib/prisma";

export async function getStaticPaths() {
  const products = await prisma.product.findMany();

  const paths = products.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
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
      >
        {({ values, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="block">Name</label>
            <input
              className="border w-full px-2 py-1"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <button
              className="btn mt-2 w-full disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
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
