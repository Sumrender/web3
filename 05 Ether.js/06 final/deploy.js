const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RINKEBY_RPC_URL
  );
  const wallet = new ethers.Wallet(process.env.REAL_PRIVATE_KEY, provider);

  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  // GET NUMBER from contract, doesn't cost gas
  const currentFavoriteNumber = await contract.retrieve();
  // console.log(currentFavoriteNumber); // gives json object with hex
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  // UPDATE NUMBER
  const transactionResponse = await contract.setFavNumber("1000");
  const transactionReceipt = await transactionResponse.wait(1);

  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
