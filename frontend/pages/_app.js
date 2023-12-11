import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  sepolia,
  goerli,
  polygonMumbai,
  polygonZkEvmTestnet,
  avalancheFuji,
} from "wagmi/chains";
import Layout from "../components/Layout";
import { CharacterProvider } from "../components/CharacterContext";
import SocketProvider from "../utils/socketContext";

const { chains, publicClient } = configureChains(
  [sepolia, goerli, polygonMumbai, polygonZkEvmTestnet, avalancheFuji],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { connectors } = getDefaultWallets({
  appName: "Ceptor Tech",
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CharacterProvider>
        <SocketProvider>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </SocketProvider>
      </CharacterProvider>
    </>
  );
}

export default MyApp;