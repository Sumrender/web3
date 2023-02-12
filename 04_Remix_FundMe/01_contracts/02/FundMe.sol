// Get funds from users
// withdraw funds
// set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;
    // This line makes it possible to turn getConversionRate 
    // to a uint256 function. 

    uint256 public minUSD = 0.1 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFundedMap;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {        
        require(msg.value.getConversionRate() >= minUSD, "Didn't send enough funds");
        funders.push(msg.sender);
        addressToAmountFundedMap[msg.sender] = msg.value;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Sender is not the Owner");
        _; // will run the function afterwards
    }

    function withdraw() payable onlyOwner public {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFundedMap[funder] = 0;
        }
        funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
}