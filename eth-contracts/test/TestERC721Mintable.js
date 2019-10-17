var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_one, 2);
            await this.contract.mint(account_one, 3);
            await this.contract.mint(account_one, 4);
            await this.contract.mint(account_one, 5);
        })

        it('should return total supply', async function () { 
            const result = await this.contract.totalSupply.call();
            assert.equal(5, result);
        })

        it('should get token balance', async function () { 
            const result = await this.contract.balanceOf.call(account_one);
            assert.equal(5, result);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const result = await this.contract.tokenURI.call(1);
            assert.equal('https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', result);
        })

        it('should approve an account', async function () {
            await this.contract.approve(account_two, 1);
            const operator = await this.contract.getApproved.call(1);
            assert.equal(account_two, operator);
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.approve(account_two, 1);
            await this.contract.transferFrom(account_one, account_two, 1);

            const newOwner = await this.contract.ownerOf.call(1);
            assert.equal(account_two, newOwner);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_one, 1, { from: account_two });
            } catch (e) {
                assert.equal("Returned error: VM Exception while processing transaction: revert Only the owner of the contract can call this function. -- Reason given: Only the owner of the contract can call this function..", e.message);
            }
        })

        it('should return contract owner', async function () { 
            const result = await this.contract.getOwner.call();
            assert.equal(account_one, result);
        })

    });
})