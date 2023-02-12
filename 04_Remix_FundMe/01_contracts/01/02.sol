// Get funds from users
// withdraw funds
// set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public number;

    function fund() public payable {
        // want to be able to set min fund amt in Rs.
        // How do we send ETH to this contract?
        // 1 ETH = 1e18 wei

        require(msg.value >= 1e18, "Didn't send enough funds");
    }

    function getPrice() public {
        // ABI and Address
    }

    // ABI from import statement
    // ETH/USD Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    // https://docs.chain.link/docs/ethereum-addresses/
    function getVersion() public view returns (uint256) {
        return
            AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e)
                .version();
    }

    // function withdraw(){}
}
