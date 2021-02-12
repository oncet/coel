import Link from "next/link";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <div className="container mx-auto">
      <nav className="border-b border-gray-300 dark:border-gray-700 p-1">
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
        className="py-1 px-2"
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
      <ToastContainer
        position="bottom-center"
        newestOnTop
        hideProgressBar
        closeButton={false}
        limit="3"
        autoClose="3500"
      />
    </div>
  );
}

export default MyApp;
