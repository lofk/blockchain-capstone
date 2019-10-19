// migrating the appropriate contracts
var CustomERC721Token = artifacts.require("./CustomERC721Token.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(CustomERC721Token);
  deployer.deploy(Verifier);
  deployer.deploy(SquareVerifier).then(()=> {
    deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  });
};
