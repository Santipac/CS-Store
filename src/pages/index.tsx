import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { AuthNavbar, Navbar } from "@/components";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-white">
        {sessionData ? <AuthNavbar sessionData={sessionData} /> : <Navbar />}
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 px-4">
      <p className="text-center text-2xl text-gray-500 ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
    </div>
  );
};
