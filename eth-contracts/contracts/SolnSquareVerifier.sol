pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class


// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  

contract SolnSquareVerifier is CustomERC721Token {
    using Counters for Counters.Counter;

    struct Solution {
        address addr;
        Counters.Counter index;
    }
    mapping (bytes32 => Solution) private solutions;

    // event SolutionAdded(address sender, uint256 index);
    event SolutionAdded(address sender);

    SquareVerifier verifier;

    constructor(address verifierAddress) public
    {
        verifier = SquareVerifier(verifierAddress);
    }

    function addSolution
                        (
                            uint[2] memory a,
                            uint[2][2] memory b,
                            uint[2] memory c,
                            uint[2] memory input
                        )
                        public
                        returns (bytes32 key)
    {
        key = keccak256(abi.encodePacked(a, b, c, input));
        Solution storage solution = solutions[key];
        solution.addr = msg.sender;
        solution.index.increment();

        solutions[key] = solution;

        emit SolutionAdded(msg.sender);
    }

    function mint
                    (
                        uint[2] memory a,
                        uint[2][2] memory b,
                        uint[2] memory c,
                        uint[2] memory input,
                        address to,
                        uint256 tokenId
                    )
                    public
                    returns (bool)
    {
        require(verifier.verify(a, b, c, input), "Solution is not verified");
        addSolution(a, b, c, input);

        return super.mint(to, tokenId);
    }
}


contract SquareVerifier {
    function verify
                    (
                        uint[2] calldata a,
                        uint[2][2] calldata b,
                        uint[2] calldata c,
                        uint[2] calldata input
                    )
                    external
                    returns (bool);
}
