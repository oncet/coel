import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PencilIcon from "../../../components/icons/pencil";
import prisma from "../../../lib/prisma";

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
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
      <Link href={`/product/${product.id}/edit`}>
        <a className="flex mb-3">
          <PencilIcon className="mr-2" />
          Edit
        </a>
      </Link>
      <p>{product.description}</p>
      <ul>
        {product.images.map(({ id, alt, path, width, height }) => (
          <li key={id}>
            <Image src={path} alt={alt} width={width} height={height} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Product;
