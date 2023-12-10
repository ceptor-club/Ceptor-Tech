export async function getServerSideProperties() {
  const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
  const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
  const ALCHEMY_POLYGON_ZKEVM_API_KEY =
    process.env.ALCHEMY_POLYGON_ZKEVM_API_KEY;
  const PUBLIC_IMAGE_URL = process.env.PUBLIC_IMAGE_URL;

  return {
    props: {
      ALCHEMY_GOERLI_API_KEY,
      ALCHEMY_SEPOLIA_API_KEY,
      ALCHEMY_POLYGON_ZKEVM_API_KEY,
      PUBLIC_IMAGE_URL,
    },
  };
}
