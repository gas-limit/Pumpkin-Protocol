const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import "../styles/globals.css";
import "../styles/Home.module.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Script from "next/script";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { fantom, fantomTestnet } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";

import { publicProvider } from "wagmi/providers/public";
import { MoralisProvider } from "react-moralis";

const { chains, provider } = configureChains(
  [fantom, fantomTestnet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Crypt3",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {}, []);
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.2.6/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />
      <Script type="module" src="/scripts/page-script.js" defer></Script>
      <Script src="/scripts/cursor-script.js" defer></Script>

      <Head>
        <title>Home</title>
        <meta property="og:title" content="Home" key="title" />
        <link
          rel="stylesheet"
          href="https://assets.codepen.io/7773162/swiper-bundle.min.css"
        />
      </Head>
      <div className="cursor"></div>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <MoralisProvider initializeOnMount={false}>
            <Navbar></Navbar>
            <Component {...pageProps} />
          </MoralisProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
