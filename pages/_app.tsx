import Layout from "@/components/Layout";
import { AuthDataProvider } from "@/store/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthDataProvider>
      <Layout>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Layout>
    </AuthDataProvider>
  );
}
