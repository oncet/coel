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
      <h1 className="font-semibold text-2xl tracking-wide">Products</h1>
      <ul className="list-inside list-disc ml-1 mt-1">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id.toString()}`}>
              <a className="text-blue-600">{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
