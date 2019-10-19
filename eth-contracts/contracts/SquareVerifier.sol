pragma solidity >=0.4.21 <0.6.0;

import "./Verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
    function verify
                    (
                        uint[2] calldata a,
                        uint[2][2] calldata b,
                        uint[2] calldata c,
                        uint[2] calldata input
                    )
                    external
                    returns (bool)
    {
        return super.verifyTx(a, b, c, input);
    }
}
