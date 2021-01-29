import "../styles/globals.css";

import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto">
      <p className="border-b p-1">
        <Link href="/">
          <a className="text-blue-600">Home</a>
        </Link>
      </p>
      <div className="pt-1 pl-2">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
