const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // blockchain address
  // http://127.0.0.1:7545

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "c00d78f233b015b7a133bb4bf9b27fba5183b622a591547934ee351b7a6af425",
    provider
  );

  // To deploy our contract along with provider and wallet, we also
  // need abi and binary of the contract
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Deploying, please wait...");
  // const contract = await contractFactory.deploy();

  console.log("Let's deploy with only transaction data!");
  const nonce = await wallet.getTransactionCount(); // need to know more about nonce, here it is only referring to transaction count
  const tx = {
    nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x6080604052606460005534801561001557600080fd5b50610150806100256000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b57806372eab9c214610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220ba7e139f4847ea15969080cb6035946cb4c61ef8d6217d164ec9a863efb4e6ac64736f6c63430008070033",
    chainId: 1337,
  }; // works for 1337, not for network ID

  // const signedTxResponse = await wallet.signTransaction(tx);
  // just signs it but doesn't sends it

  const sendTxResponse = await wallet.sendTransaction(tx);
  await sendTxResponse.wait(1);
  console.log(sendTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
