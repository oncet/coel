import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import TranslateIcon from "./icons/translate";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";

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
  const [mounted, setMounted] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleThemeToggle = async (values) => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
                className="z-50 flex flex-col space-y-2 rounded shadow bg-gray-100 dark:bg-gray-700 top-5 right-0 p-2 absolute"
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
        <li className="flex">
          <button onClick={handleThemeToggle}>
            <AnimatePresence exitBeforeEnter>
              {!mounted || theme === "light" ? (
                <SunIcon key="sun" className={mounted ? "" : "animate-pulse"} />
              ) : (
                <MoonIcon key="moon" />
              )}
            </AnimatePresence>
          </button>
        </li>
      </ul>
    </nav>
  );
}
