import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../css/getstarted.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dna from '../img/dna.png';
import Stepper from '../Stepper';

function GetStarted() {

  const [started, setStarted] = useState(false);

  const onClick = () => {
    setStarted(true);
  };

  const notStarted = (
    <div>
      <br /><br /><br />
      <div className="button_cont" align="center">
        <a className="example_d" onClick={onClick}>
          <strong>GET STARTED</strong>
        </a>
      </div>
      <br /><br /><br />
      <Container>
        <Row>
          <Col sm={8}>
          23andMe is a privately held personal genomics and biotechnology company based in Sunnyvale, California. It is best known for providing a direct-to-consumer genetic testing service in which customers provide a saliva sample that is laboratory analysed, using single nucleotide polymorphism genotyping,[1] to generate reports relating to the customer's ancestry and genetic predispositions to health-related topics. The company's name is derived from the fact that there are 23 pairs of chromosomes in a normal human cell.[2]
          </Col>
          <Col sm={4}><img src={dna} style={{width: "50%"}} /></Col>
        </Row>
        <br /><br /><br />
        <Row>
        <Col sm={4}><img src={dna} style={{width: "50%"}} /></Col>
          <Col sm={8}>
          23andMe is a privately held personal genomics and biotechnology company based in Sunnyvale, California. It is best known for providing a direct-to-consumer genetic testing service in which customers provide a saliva sample that is laboratory analysed, using single nucleotide polymorphism genotyping,[1] to generate reports relating to the customer's ancestry and genetic predispositions to health-related topics. The company's name is derived from the fact that there are 23 pairs of chromosomes in a normal human cell.[2]
          </Col>
        </Row>
      </Container>
      <br /><br /><br />
    </div>
  );

  const content = started ? <Stepper /> : notStarted;

  return (
    <>
      {content}
    </>
  );
}

export default GetStarted;
