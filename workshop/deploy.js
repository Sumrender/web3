const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // blockchain address
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet("9cc984088a1ff3b4cea69c0d6e9475597cfc8e07cd8840121984fc40ebb77c24", provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait");

  const contract = await contractFactory.deploy();
  // stop here! wait for contract to deploy
  console.log(contract);

}

main().
  then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1);
  });