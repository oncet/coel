import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
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

  const [name, setName] = useState(product.name);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://api.mocki.io/v1/b043df5a");
    const json = await response.json();
    console.log("json", json);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Edit product</title>
      </Head>
      <h1>Edit</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="block">Name</label>
        <input
          className="border w-full px-2 py-1"
          value={name}
          onChange={handleNameChange}
        />
        <button
          className="btn mt-2 w-full"
          onClick={handleFormSubmit}
          type="submit"
        >
          Save changes
        </button>
      </form>
    </>
  );
};

export default Edit;
