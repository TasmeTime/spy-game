import { NextPage } from "next";
import Head from "next/head";
import HomePage from "../src/components/pages/home/Home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="spy game, to be enjoyed with friends 😉"
        />
        <title>SPY GAME</title>
      </Head>
      <HomePage />;
    </>
  );
};

export default Home;
