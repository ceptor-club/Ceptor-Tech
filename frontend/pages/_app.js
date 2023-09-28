// This is the root component that wraps all other components
import "../styles/globals.css";
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, goerli } from "wagmi/chains";
import Layout from "../components/Layout";
import { CharacterProvider } from '../components//CharacterModule/CharacterContext';
import SocketProvider from "../utils/socketContext";

const chains = [sepolia, goerli];

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains,
    version: 1,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CharacterProvider>
      <SocketProvider>
        <WagmiConfig config={wagmiConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </SocketProvider>
          </CharacterProvider>
    </>
  );
}

export default MyApp;
