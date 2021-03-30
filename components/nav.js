import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import CogIcon from "./icons/cog";
import TranslateIcon from "./icons/translate";

const languages = [
  {
    locale: "en",
    label: "English",
  },
  {
    locale: "es",
    label: "Español",
  },
];

export default function Nav({ asPath }) {
  const { locale: currentLocale } = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const listener = () => {
      setDropdownVisible(false);
    };

    if (dropdownVisible) {
      window.addEventListener("click", listener);
    }

    return () => {
      window.removeEventListener("click", listener);
    };
  }, [dropdownVisible]);

  return (
    <nav className="flex justify-between border-b border-gray-300 dark:border-gray-700 py-1">
      <ul className="flex">
        <li>
          <Link href="/">
            <a>
              <FormattedMessage
                defaultMessage="Home"
                description="homepage link"
              />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/product">
            <a>
              <FormattedMessage
                defaultMessage="Products"
                description="products link"
              />
            </a>
          </Link>
        </li>
      </ul>
      <ul className="flex items-center">
        <li className="relative flex">
          <button onClick={() => setDropdownVisible(true)}>
            <TranslateIcon />
          </button>
          <AnimatePresence>
            {dropdownVisible && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className={clsx(
                  "z-50 flex flex-col space-y-2 rounded shadow bg-gray-100 dark:bg-gray-700 top-5 right-0 p-2 absolute"
                )}
              >
                {languages.map(({ locale, label }) => (
                  <li
                    key={locale}
                    className={clsx(
                      currentLocale === locale &&
                        "bg-gray-200 dark:bg-gray-500",
                      "text-center rounded py-1 px-4"
                    )}
                  >
                    <Link href={asPath} locale={locale}>
                      <a>{label}</a>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
        <li>
          <Link href="/settings">
            <a>
              <CogIcon />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
