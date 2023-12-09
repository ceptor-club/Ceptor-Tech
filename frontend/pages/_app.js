import "../styles/globals.css";
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
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

const chains = [
  sepolia,
  goerli,
  polygonMumbai,
  polygonZkEvmTestnet,
  avalancheFuji,
];

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
          <Web3Modal
            // w3m-network-button={true}
            // w3m-account-button={true}
            // w3m-connect-button={true}
            projectId={projectId}
            ethereumClient={ethereumClient}
          />
        </SocketProvider>
      </CharacterProvider>
    </>
  );
}

export default MyApp;