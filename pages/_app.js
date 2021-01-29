import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
