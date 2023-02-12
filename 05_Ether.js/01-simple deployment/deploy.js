const ethers = require("ethers");
const fs = require("fs-extra");

const rpcURL = "http://127.0.0.1:7545";
const tempAccPrivateKey =
  "7af0a29865370a78554cc495dc42864d964f881da23c73093d76492f47facd8f";

async function main() {
  // blockchain address
  // http://127.0.0.1:7545 // using ganache

  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const wallet = new ethers.Wallet(tempAccPrivateKey, provider);

  // To deploy our contract along with provider and wallet, we also
  // need abi and binary of the contract
  // abi and binary generated using "compile" script in package.json
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  // // STOP here! and wait for contract to deploy
  // console.log(contract);
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Here is the deployment transaction (transaction response): ");
  console.log(contract.deployTransaction);

  console.log("Here is the transaction receipt: ");
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
