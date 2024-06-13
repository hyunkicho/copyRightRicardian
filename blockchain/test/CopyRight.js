const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const exp = require("constants");
const { sign } = require("crypto");
const { ethers, upgrades } = require("hardhat");
const { join } = require("path");

describe("CopyRight", function () {
  async function deployCopyRightFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const CopyRight = await ethers.getContractFactory("CopyRight");
    const copyRight = await CopyRight.deploy();
    return { copyRight, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract correctly", async function () {
      const { copyRight } = await loadFixture(deployCopyRightFixture);
      console.log(await copyRight.getAddress());
    });
  });

  describe("Register", function () {
    it("Should register a new contract correctly", async function () {
      const { copyRight, owner } = await loadFixture(deployCopyRightFixture);
      const type = 0;
      const author = owner.address;
      const metadata = "data from http://example.com";
      const metadataString = JSON.stringify(metadata);
      const contents = ethers.toUtf8Bytes(metadataString);
      console.log("contrents >>", contents);
      const url = "http://example.com";
      const contentsHash = ethers.solidityPackedKeccak256(["string"],[metadataString]);
      console.log("contentsHash >>", contentsHash);

      const tx = await copyRight.register(type, contents, url, contentsHash);
      const receipt = await tx.wait();
      console.log(receipt.logs)

      const eventLog = receipt.logs.map(log => log.args);
      console.log("eventLog >>", eventLog);
      const [eventRightType, eventContractId, eventAuthor, eventContents, eventUrl, eventContentsHash, eventUpdatedBlocknumber] = eventLog[0];

      expect(eventRightType).to.equal(type);
      expect(eventContractId).to.equal(0);
      expect(eventAuthor).to.equal(owner.address);
      expect(ethers.hexlify(eventContents)).to.equal(ethers.hexlify(contents));
      expect(eventUrl).to.equal(url);
      expect(eventContentsHash).to.equal(contentsHash);
      expect(eventUpdatedBlocknumber).to.equal(receipt.blockNumber);

      const contractInfo = await copyRight.getContractContents(0);
      expect(contractInfo[0]).to.equal(type);
      expect(contractInfo[1]).to.equal(owner.address);
      expect(ethers.hexlify(contractInfo[2])).to.equal(ethers.hexlify(contents));
      expect(contractInfo[3]).to.equal(url);
      expect(contractInfo[4]).to.equal(contentsHash);
      expect(contractInfo[5]).to.equal(receipt.blockNumber);
    });
  });
});
