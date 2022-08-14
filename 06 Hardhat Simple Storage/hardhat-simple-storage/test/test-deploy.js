const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("should start with favorite number of 100", async function () {
    const currentValue = await simpleStorage.retrieve();
    // assert
    // expect
    assert.equal(currentValue.toString(), "100");
  });

  it("should update when we call store", async function () {
    const expectedValue = "99";
    const transactionResponse = await simpleStorage.setFavNumber(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
