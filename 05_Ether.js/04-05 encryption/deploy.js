const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // blockchain address
  // http://127.0.0.1:7545

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  // LET since we need to connect wallet to provider
  // and private key password to hm, terminal se daal denge
  wallet = await wallet.connect(provider);

  // To deploy our contract along with provider and wallet, we also
  // need abi and binary of the contract
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

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
