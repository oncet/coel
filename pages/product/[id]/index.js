import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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
      <div>
        <Link href={`/product/${product.id}/edit`}>
          <a className="btn">Edit</a>
        </Link>
      </div>
      <p>{product.description}</p>
    </>
  );
};

export default Product;
