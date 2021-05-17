import React, { Component } from "react";
import VoteContract from "./contracts/Vote.json";
import getWeb3 from "./getWeb3";

import { Container, Row } from 'react-bootstrap';

import Candidate from "./candidate";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { candidatesResult: null, web3: null, accounts: null, contract: null};
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VoteContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VoteContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.updateCandidatesResult);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateCandidatesResult = async () => {
    const { contract } = this.state;

    // get candidates current result from contract 
    const candidatesResult = await contract.methods.get().call();

    // update state
    this.setState({candidatesResult: candidatesResult});
  };

  voteFor = async (id) => {
    const { contract, accounts } = this.state;

    // vote for id
    await contract.methods.vote_for(id).send({ from: accounts[0] });
    this.updateCandidatesResult();
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else {
      return (
        <div className="App">
          <h1>Voting Candidate</h1>
          <Container fluid="md" className="card-group">
            <Row>
              {(this.state.candidatesResult) &&
                this.state.candidatesResult.map((value, index) => {
                  return (
                    <Candidate
                      candidateId={index}
                      voteNumber={value}
                      buttonClick={this.voteFor.bind(this)}
                    ></Candidate>
                  )
                }
              )}
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default App;
