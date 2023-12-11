# Constellation of Smart Contracts

> Eman Herawy, Tippi Fifestarr, and Danjo the 0x all helped out with this
> Jason A made the VRF D20 NFT
> Spencer made the LootSender and LootBox NFT.

## Overview

This is a constellation of smart contracts that work together to create a decentralized application. The contracts are written in Solidity and tested using the Framework of Hackathon Testing (FOHT).

### Contracts

**CeptorClubID.sol**
Below is an overview of its functionality:

- User Registration: Users can register a username with the registerUsername function, which requires a payment unless the sender is the contract owner.
- Stats Management: The contract allows updating user stats through the updateBigStats function, which is restricted to the owner.
- Loot Handling: It includes functionality to store and manage loot associated with users. Loot can be added to a user's account via the _ccipReceive function, which is designed to handle cross-chain messages.
- Chain Interaction: The contract can check the blockchain it's deployed on with checkDeployedChain and handle cross-chain messages with _ccipReceive.
- Access Control: There's a mechanism to approve or disapprove senders for cross-chain interaction using setApprovedSender.

- [ ] Implement security checks to ensure that Loot and Stats are received from the correct contracts.
- [ ] Consider adding a function to allow users to leave the system and retrieve a portion of their funds.
- [ ] Review and possibly refactor the getRegistrationCost function as it's marked as "crap".
- [ ] Address the question about whether CCIP libraries work with proxy contracts.
- [ ] Determine the XP multiplier logic based on user levels.

**Explanation of LootGetter.sol**

LootGetter.sol is a contract that demonstrates how to receive string data across chains using Chainlink's Cross-Chain Interoperability Protocol (CCIP). It includes:

- An event MessageReceived that logs the details of the received message.
- A function _ccipReceive that handles the incoming CCIP message, decodes it, and stores the details in a LootMessage struct.
- A function getLastReceivedMessageDetails that allows retrieval of the last received message's details.

The contract is marked as an example and should not be used in production as it uses hardcoded values and un-audited code.


## Foundry

# CeptorClubID: A DAOist Poem

In the realm of **CeptorClubID**, where DAOs hold sway,
Blockchain whispers echo, in a decentralized ballet.
Smart contracts dance, with **Foundry** as the stage,
Solving problems, in the DAOist age.

In the silence of nodes, under the blockchain's light,
**CeptorClubID** works tirelessly, into the digital night.
With each transaction, a new story unfurls,
In this DAOist world, where imagination whirls.

From the chaos of data, order takes form,
In the heart of the network, **CeptorClubID** is warm.
Creating, solving, in the digital sea,
In the world of **CeptorClubID**, we are truly free.

So here's to **CeptorClubID**, where dreams come alive,
In the world of blockchain, we thrive.
**CeptorClubID**, we're the new sensation,
Welcome to the future of decentralization.

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
forge verify-contract 0xEc2df342d40D46fae8407F24f078138ec6d77FbA  PromptCollection  --constructor-args $(cast abi-encode "constructor(address ,address,bytes32,uint64,uint32 callbackGasLimit)" 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625 0x45DB01904b51857F6279FE9006De25bf6dE8d136 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c 7650 2500000 ) --watch   --chain-id  11155111


forge verify-contract 0xDA38118B32394748f7b720E5CBad719EfD02da0B  Ceptors  --constructor-args $(cast abi-encode "constructor(address)" 0x45DB01904b51857F6279FE9006De25bf6dE8d136 ) --watch   --chain-id  11155111
