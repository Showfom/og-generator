import { AppProps } from "next/app";
import React from "react";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import { useFathom } from "../hooks/useFathom";
import { GlobalStyles } from "../styles/GlobalStyles";
import { TwinGlobalStyles } from "../styles/TwinGlobalStyles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useFathom();

  return (
    <>
      <GlobalStyles />
      <SEO />
      <TwinGlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
