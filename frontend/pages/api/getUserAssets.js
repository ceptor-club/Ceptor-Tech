import { CONSTANTS } from '../../utils/CONSTANTS';

//get all assets of the wallet using the wallet address and alchemy api
export default async function handler(req, res) {
  const { account } = req.body;
  console.log('account', account);
  const alchemyKey = process.env.ALCHEMY_API_KEY;
  let url;
  // if (process.env.NETWORK === "sepolia") {
  url = `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}/getNFTs/?owner=${account}`;
  // } else {
  // url = `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}/getNFTs/?owner=${account}`
  // }

  // console.log("alchemy url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    //filter out the assets that are not from the ceptor or dice contract
    const filteredData = data.ownedNfts.filter((asset) => {
      return (
        asset.contract.address === CONSTANTS.diceAddress ||
        asset.contract.address === CONSTANTS.ceptorAddress
      );
    });

    res.status(200).json(filteredData);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'error', message: error.message });
  }
}
