import "../styles/globals.css";

import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto">
      <nav className="border-b p-1">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/product">
              <a>Products</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pt-1 pl-2">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
