import Link from "next/link";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import CogIcon from "./icons/cog";
import TranslateIcon from "./icons/translate";

export default function Nav({ asPath }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
          <button onClick={() => setDropdownVisible(!dropdownVisible)}>
            <TranslateIcon />
          </button>
          {dropdownVisible && (
            <ul className="rounded shadow bg-white dark:bg-gray-700 top-5 right-0 py-2 px-4 absolute">
              <li>
                <Link href={asPath} locale="en">
                  <a>English</a>
                </Link>
              </li>
              <li>
                <Link href={asPath} locale="es">
                  <a>Español</a>
                </Link>
              </li>
            </ul>
          )}
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
