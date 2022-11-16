import {useSelector} from "react-redux";
import SkillsTable from "./SkillsTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const SkillsTables = (props) => {
  const allSkills = useSelector(state => state.tecSkills.skills);

  return (
    <Row>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable skillCategory={"Magic"} skills={allSkills.Magic}/>
      </Col>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable skillCategory={"Combat"} skills={allSkills.Combat}/>
      </Col>
      <Col className={"col-12 col-sm-4"}>
        <SkillsTable skillCategory={"Stealth"} skills={allSkills.Stealth}/>
      </Col>
    </Row>
  );
};

export default SkillsTables;