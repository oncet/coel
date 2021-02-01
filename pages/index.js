import Head from "next/head";

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
