import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ThemeWrapper, useTheme } from "../context/theme";
import { toggleDarkClass } from "../lib/toggleDarkClass";

function MyApp({ Component, pageProps, router }) {
  const { setDarkMode } = useTheme();

  useEffect(() => {
    const storedDarkMode = !!Number(localStorage.getItem("darkMode"));
    toggleDarkClass(storedDarkMode);
    setDarkMode(storedDarkMode);
  }, []);

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
          <li>
            <Link href="/settings">
              <a>Settings</a>
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

const Wrapped = (props) => (
  <ThemeWrapper>
    <MyApp {...props} />
  </ThemeWrapper>
);

export default Wrapped;
