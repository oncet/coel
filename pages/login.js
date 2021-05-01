import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { FormattedMessage } from "react-intl";

export default function Login({ products }) {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1>
        <FormattedMessage defaultMessage="Login" description="login header" />
      </h1>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
