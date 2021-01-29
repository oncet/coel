import Head from "next/head";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";

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

const Product = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </>
  );
};

export default Product;
