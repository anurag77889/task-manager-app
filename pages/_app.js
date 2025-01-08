import "../styles/globals.css";
import Head from "next/head";
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="A simple task manager built with Next.js and React."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />)
    </>
  );
}

export default App;
