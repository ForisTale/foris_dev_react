import RaceButton from "../../components/tec/skills/RaceButton";
import SkillsTables from "../../components/tec/skills/SkillsTables";
import Multiplier from "../../components/tec/skills/Multiplier";
import {useSelector} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EstimatedLevels from "../../components/tec/skills/EstimatedLevels";
import DesiredLevel from "../../components/tec/skills/DesiredLevel";
import GenerateSkillCommands from "../../components/tec/skills/GenerateSkillCommands";


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
          <EstimatedLevels/>
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