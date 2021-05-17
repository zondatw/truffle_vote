pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {

  function testVoteForId1() public {
    Vote vote = Vote(DeployedAddresses.Vote());

    vote.vote_for(1);

    Assert.equal(vote.get()[1], 1, "It should vote for id 1");
  }
}
