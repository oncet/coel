import Head from "next/head";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  const products = await prisma.product.findMany();
  return {
    props: { products },
  };
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Welcome to the shop</title>
      </Head>
      <h1>Welcome!</h1>
      <p>Welcome to the homepage.</p>
    </>
  );
}
