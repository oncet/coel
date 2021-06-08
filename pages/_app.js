import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { IntlProvider } from "react-intl";
import { Provider } from "next-auth/client";
import Nav from "../components/nav";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import en from "../compiled-lang/en.json";
import es from "../compiled-lang/es.json";

const messages = {
  en,
  es,
};

const contextClass = {
  success: "bg-green-600 dark:bg-green-800",
  error: "bg-red-600 dark:bg-red-800",
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
        <Provider session={pageProps.session}>
          <Nav asPath={asPath} />
          <div className="container mx-auto pt-8 pb-12 break-words">
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
              toastClassName={({ type }) => `${contextClass[type]} p-1 mt-px`}
            />
          </div>
        </Provider>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default MyApp;
