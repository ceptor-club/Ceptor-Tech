const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

 
const run = async () => {
    try {
        //address reward, address prompt, address dice, address ccid, address ceptor)
         
        // 0x0a3c75634C8a167eD82D2089F8B2Cba49b7685Ad 0xEc2df342d40D46fae8407F24f078138ec6d77FbA 0x45DB01904b51857F6279FE9006De25bf6dE8d136  0x4Eb23215D4d8802d10BAf06A3e9d3935E9bdf630  0xDA38118B32394748f7b720E5CBad719EfD02da0B
        // reward should be done via hardhat, we have issues in passing the serverless function as args in forge
        // 
   
        let contractAddress = ["0x557d4b0a566613f344E2F5a9bc4FC52F6897B372", "0xB4e5136F4BADDdF23a720A14a6a0D0d60A5ee9ee", "0xf965217a040cc52354d55ed6D41112bb5f9Bf9D2", "0x99F37C9503F9A089dA202a8279F9cC729E86972c"]
        let contractNames = ["PromptCollection", "CeptorDice", "Ceptors",  "CeptorClubID"]
       
       /// sepolia testnet
        let chainId = 80001;
         const  vrfCoordindatorV2 = "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625";

        const keyhash = "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c";
        const _priceFeed ="0x694AA1769357215DE4FAC081bf1f309aDC325306"
        const _router = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0" 
        /* gasLane */
        /***    uint64 constant chainIdEthereumSepolia = 16015286601757825753;
    uint64 constant chainIdOptimismGoerli = 2664363617261496610;
    uint64 constant chainIdAvalancheFuji = 14767482510784806043;
    uint64 constant chainIdArbitrumTestnet = 6101244977088475029;
    uint64 constant chainIdPolygonMumbai = 12532609583862916517; */
        const gameChain = "14767482510784806043";
        const artChain = "12532609583862916517";
        const subscriptionId = 7650;
        const callbackGasLimit = 2500000;
        let constructorArgs = [`"constructor(address ,address,bytes32,uint64,uint32 callbackGasLimit)" ${vrfCoordindatorV2} ${contractAddress[1]} ${keyhash} ${subscriptionId} ${callbackGasLimit}`, "", `"constructor(address)" ${contractAddress[1]}`, `"constructor(address ,address,address,uint64,uint64 )" ${contractAddress[1]} ${_router} ${_priceFeed} ${gameChain} ${artChain} `]

        const getCommand = (contractAddress, contractName, constructorArgs, chainId) => {
            if (constructorArgs == "") {
                return `forge verify-contract ${contractAddress}  ${contractName} --watch  --chain-id ${chainId}`;
            } else {
                return `forge verify-contract ${contractAddress}  ${contractName}  --constructor-args $(cast abi-encode ${constructorArgs} ) --watch   --chain-id  ${chainId}`;
            }
        }
        // $(cast abi-encode "constructor(  address ,address,bytes32,uint64,uint32 callbackGasLimit)" ${vrfCoordindatorV2} ${contractAddress[1]} ${keyhash} ${subscriptionId} ${callbackGasLimit})
        // Define the script command
        // const scriptCommand = `forge verify-contract 0xB4e5136F4BADDdF23a720A14a6a0D0d60A5ee9ee CeptorDice  --constructor-args cc --watch  --chain-id 11155111`;
        // console.log({ scriptCommand });
        const commands = [
            getCommand(contractAddress[0], contractNames[0], constructorArgs[0], chainId),
            getCommand(contractAddress[1], contractNames[1], constructorArgs[1], chainId),
            getCommand(contractAddress[2], contractNames[2], constructorArgs[2], chainId),
            getCommand(contractAddress[3], contractNames[3], constructorArgs[3], chainId)]
        // const scriptCommand = commands[3];
        // console.log({ scriptCommand });
        //  exec(scriptCommand, (error, stdout, stderr) => {
        //     console.log({ error, stdout, stderr });
        //     if (error) {
        //         console.error(`Error: ${error.message}`);
        //     }
        //     if (stderr) {
        //         console.error(`stderr: ${stderr}`);
        //     }
        //     console.log(`Script output:\n${stdout}`);
        // });
        for (let index = 0; index < commands.length; index++) {
    
            const scriptCommand = commands[index];
            console.log({ scriptCommand });
            await exec(scriptCommand, (error, stdout, stderr) => {
                console.log({ error, stdout, stderr });
                if (error) {
                    console.error(`Error: ${error.message}`);
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
                console.log(`Script output:\n${stdout}`);
            });
        }
      
    } catch (error) {
        console.error('Error reading or writing source file:', error);
    }
};

run().then(() => console.log('done')).catch(console.error);
 