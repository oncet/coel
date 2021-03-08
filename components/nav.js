import Link from "next/link";
import { FormattedMessage } from "react-intl";

import CogIcon from "./icons/cog";

export default function Nav({ asPath }) {
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
