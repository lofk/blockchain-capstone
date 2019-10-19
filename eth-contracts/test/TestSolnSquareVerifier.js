// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var Verifier = artifacts.require('Verifier');
var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const { proof, inputs } = {
        "proof": {
            "a": ["0x017a6435eb58818971a68ba911c6a3e9b6e6d7668178ae4faad5dc5440a156e1", "0x0c1502f424b34b284ab7390aca0af9f3ca7aa0e0b912657a97789871ee3d3431"],
            "b": [["0x19ccd846a4e94793a6fa25e635ca90ea3ffdd35422ab3caae915eaec29f10692", "0x0eb75af125871f2d43600b1d0759e16ae8725ad5aad4a49af1075fc2376277b8"], ["0x2ce8e0f63a17cf41aa1f8b946ceae03fb580402c2862bb4e5f0dfcebb11e2000", "0x03d4c25fc0535d06817f614c81ba94e152e4b2c2ac697ccfcdb0ba781c840af5"]],
            "c": ["0x2ed6de69cd3b09fb4f4602efe0c6a9db6175476132d67e9681e8d4c3db6ad462", "0x16895e078ce16b3d784981c00a63d61c366acfc9fd75ae69c41bfdbf4c02c485"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    };

    describe('SolnSquareVerifier test', function () {
        beforeEach(async function () {
            contractVerifier = await Verifier.new({from: account_one});
            contractSquareVerifier = await SquareVerifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(contractSquareVerifier.address, {from: account_one});
        })

        it('should add a new solution', async function () {
            const result = await this.contract.addSolution(proof.a, proof.b, proof.c, inputs);
            assert.equal('SolutionAdded', result.logs[0].event);
            assert.equal('0x746e04EA8466A40c842994611d6aA3B9dD9fc8be', result.logs[0].args['0']);
        })

        it('should mint an ERC721 token', async function () {
            const result = await this.contract.mint.call(proof.a, proof.b, proof.c, inputs, account_one, 1);
            assert.equal(true, result);
        })
    });
})