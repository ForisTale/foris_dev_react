import SkillsTable from "./SkillsTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";


const SkillsTables = () => {

  return (
    <Row>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable category={"Magic"}/>
      </Col>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable category={"Combat"}/>
      </Col>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable category={"Stealth"}/>
      </Col>
    </Row>
  );
};

export default SkillsTables;