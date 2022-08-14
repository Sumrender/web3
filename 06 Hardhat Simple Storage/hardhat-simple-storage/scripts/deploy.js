const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  // 02 VERIFYING CONTRACT

  // what happens when we deploy to our local hardhat network?
  // console.log(netwok.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("waiting for block txes...");
    await simpleStorage.deployTransaction.wait(6);
    // it means wait 6 blocks
    await verify(simpleStorage.address, []);
  }

  // 03 INTERACTING WITH CONTRACT
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // UPDATE
  const transactionResponse = await simpleStorage.setFavNumber(99);
  transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
