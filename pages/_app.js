import "../styles/globals.css";

import Link from "next/link";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
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
      <motion.div
        className="pt-1 pl-2"
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </div>
  );
}

export default MyApp;
