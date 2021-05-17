import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap';

class Candidate extends Component {
  handleClick = () => {
    this.props.buttonClick(this.props.candidateId);
  }

  render() {
    return (
      <Card className="Candidate" style={{ width: '13rem' }}>
        <Card.Body>
          <Card.Title>Candidate {this.props.candidateId}</Card.Title>
          <Card.Text>
            Voted number: {this.props.voteNumber}
          </Card.Text>
          <Button onClick={this.handleClick} variant="success">Vote</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Candidate;