import Head from "next/head";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

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
      <h1>
        <FormattedMessage
          defaultMessage="Products"
          description="products header"
        />
      </h1>
      <Link href="/product/add">
        <a className="flex mb-3">
          <PlusIcon />
          <FormattedMessage
            defaultMessage="New product"
            description="new product link"
          />
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
