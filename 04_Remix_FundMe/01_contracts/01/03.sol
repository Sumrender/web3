// Get funds from users
// withdraw funds
// set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract FundMe {
    uint256 public minUSD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFundedMap;

    function fund() public payable {
        // want to be able to set min fund amt in Rs.
        // How do we send ETH to this contract?
        // 1 ETH = 1e18 wei
        
        require(getConversionRate(msg.value) >= minUSD, "Didn't send enough funds");
        funders.push(msg.sender);
        addressToAmountFundedMap[msg.sender] += msg.value;
    }
    function getPrice() public view returns (uint256){
        // ABI from import statement
        // ETH/USD Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        // https://docs.chain.link/docs/ethereum-addresses/
        
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (,int256 price,,,) = priceFeed.latestRoundData();
        // ETH in terms of USD
        return uint256(price*1e10);
    }

    function getConversionRate(uint256 ethAmount) public view returns (uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = (ethPrice*ethAmount)/1e18;
        return ethAmountInUSD;
    }

    function getVersion() public view returns (uint256){
        return AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e).version();
    }


    // function withdraw(){}
}