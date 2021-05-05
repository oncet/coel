import { getProviders, signIn, signOut, useSession } from "next-auth/client";
import Button from "../../components/button";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function SignIn({ providers }) {
  const [session, loading] = useSession();

  return (
    <>
      <h1>Login</h1>
      {!session &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      {session && (
        <>
          <p className="mb-2">Hi, {session.user.name}!</p>
          <Button onClick={signOut}>Sign out</Button>
        </>
      )}
    </>
  );
}