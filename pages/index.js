import Link from "next/link";
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
      <h1>Welcome!</h1>
      <p>Welcome to the homepage.</p>
    </>
  );
}
