import RaceButton from "../../components/tec/RaceButton";
import SkillsTables from "../../components/tec/SkillsTables";
import Multiplier from "../../components/tec/Multiplier";
import {useSelector} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseLevel from "../../components/tec/BaseLevel";
import DesiredLevel from "../../components/tec/DesiredLevel";
import GenerateSkillCommands from "../../components/tec/GenerateSkillCommands";


const Skills = () => {
  const selectedRace = useSelector(state => state.tecSkills.race);

  return (
    <>
      <Row>
        <RaceButton/>
        <p id={"selected_race"}>Selected race: {selectedRace}</p>
      </Row>
      <Row>
        <SkillsTables/>
      </Row>
      <Row>
        <Col className={"col-12 col-lg-4"}>
          <Multiplier/>
        </Col>
        <Col className={"col-12 col-lg-4"}>
          <BaseLevel/>
        </Col>
        <Col className={"col-12 col-lg-4"}>
          <DesiredLevel/>
        </Col>
      </Row>
      <Row>
        <Col className={"col-12 col-md-5"}></Col>
        <Col className={"col-12 col-md-2"}>
          <GenerateSkillCommands/>
        </Col>
        <Col className={"col-12 col-md-5"}></Col>
      </Row>
    </>
  );
};

export default Skills;