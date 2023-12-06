export async function getServerSideProperties() {
  const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
  const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
  const ALCHEMY_POLYGON_ZKEVM_API_KEY =
    process.env.ALCHEMY_POLYGON_ZKEVM_API_KEY;

  return {
    props: {
      ALCHEMY_GOERLI_API_KEY,
      ALCHEMY_SEPOLIA_API_KEY,
      ALCHEMY_POLYGON_ZKEVM_API_KEY,
    },
  };
}
