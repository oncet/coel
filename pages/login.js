import Head from "next/head";
import { FormattedMessage } from "react-intl";

export default function Login({ products }) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1>
        <FormattedMessage defaultMessage="Login" description="login header" />
      </h1>
    </>
  );
}
