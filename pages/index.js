import Head from "next/head";
import { FormattedMessage } from "react-intl";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Welcome to the shop</title>
      </Head>
      <h1>
        <FormattedMessage
          defaultMessage="Welcome!"
          description="homepage header"
        />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="Welcome to the homepage?"
          description="homepage welcome"
        />
      </p>
    </>
  );
}
