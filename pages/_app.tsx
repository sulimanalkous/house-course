import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider} from "src/auth/useAuth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Home Sweet Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
