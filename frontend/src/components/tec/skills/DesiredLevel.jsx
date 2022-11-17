import classes from "./DesiredLevel.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";

const DesiredLevel = () => {
  const desiredLevel = useSelector(state => state.tecSkills.desiredLevel);
  const dispatch = useDispatch();

  const desiredLevelHandler = (event) => {
    dispatch(tecSkillsActions.setDesiredLevel(event.target.value));
  };

  const fillSkillHandler = () => {
    dispatch(tecSkillsActions.fillSkillsToDesiredLevel());
  };

  return (
    <Row>
      <Col className={"col-12 col-md-6"}>
        <label>
          Desired level: <input
          id={"desired_level"}
          className={classes.input}
          value={desiredLevel}
          onChange={desiredLevelHandler}
        />
        </label>
      </Col>
      <Col className={"col-12 col-md-5"}>
        <Button
          id={"fill_skills"}
          className={classes.fillSkills}
          onClick={fillSkillHandler}
        >Fill skills to desired level</Button>
      </Col>

    </Row>

  );
};

export default DesiredLevel;