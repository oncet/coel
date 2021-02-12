import Head from "next/head";
import Link from "next/link";
import PlusIcon from "../../components/icons/plus";
import prisma from "../../lib/prisma";

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return {
    props: { products },
  };
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <h1>Products</h1>
      <Link href="/product/add">
        <a className="flex mb-3">
          <PlusIcon />
          New product
        </a>
      </Link>
      <ul className="list-inside list-disc ml-1 mt-1">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id.toString()}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
