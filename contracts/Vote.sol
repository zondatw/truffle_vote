// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Vote {
  mapping(address => bool) votedAccounts;
  uint[8] public candidates;

  modifier validCandidateId(uint id) {
    require(0 <= id && id < 8, "Candidate id must be in the range of 0 ~ 7");
    _;
  }

  modifier voteOnlyOnce() {
    require(votedAccounts[msg.sender] == false, "Can only vote once");
    _;
    votedAccounts[msg.sender] = true;
  }

  function vote_for(uint id) validCandidateId(id) voteOnlyOnce() public {
    candidates[id] += 1;
  }

  function get() public view returns (uint[8] memory) {
    return candidates;
  }
}
