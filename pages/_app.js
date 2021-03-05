import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { IntlProvider } from "react-intl";
import Nav from "../components/nav";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import en from "../compiled-lang/en.json";
import es from "../compiled-lang/es.json";

const messages = {
  en,
  es,
};

function MyApp({ Component, pageProps, router }) {
  const { locale, route, asPath } = router;

  return (
    <ThemeProvider attribute="class">
      <IntlProvider
        defaultLocale="en"
        locale={locale}
        messages={messages[locale]}
      >
        <Nav asPath={asPath} />
        <div className="container mx-auto">
          <motion.div
            className="py-1 px-2"
            key={`${route}-${locale}`}
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
      </IntlProvider>
    </ThemeProvider>
  );
}

export default MyApp;
