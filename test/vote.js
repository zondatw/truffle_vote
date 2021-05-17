const Vote = artifacts.require("./Vote.sol");
const truffleAssert = require('truffle-assertions');

contract("Vote", accounts => {
  it("vote id not valid", async () => {
    const VoteInstance = await Vote.deployed();

    // vote for 8
    await truffleAssert.reverts(
      VoteInstance.vote_for(8, { from: accounts[0] }),
      "Candidate id must be in the range of 0 ~ 7"
    )
  });

  it("vote for id: 1 candidate.", async () => {
    const VoteInstance = await Vote.deployed();

    // vote for id 1
    await VoteInstance.vote_for(1, { from: accounts[0] });

    // Get current vote result
    const candidates = await VoteInstance.get.call();
    const excepted = [0, 1, 0, 0, 0, 0, 0, 0]
    excepted.forEach((voteNum, index) => {
      assert.equal(candidates[index], voteNum, "Vote wrong id");
    });
  });

  it("vote only once.", async () => {
    const VoteInstance = await Vote.deployed();

    // vote again
    await truffleAssert.reverts(
      VoteInstance.vote_for(1, { from: accounts[0] }),
      "Can only vote once"
    )
  })
});
