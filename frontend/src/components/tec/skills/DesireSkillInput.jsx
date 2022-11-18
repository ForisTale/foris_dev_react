import {useSelector, useDispatch} from "react-redux";
import {isBaseSkillValid} from "./BaseSkillInput";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {useRef, useState} from "react";

const BaseSkillInput = (props) => {
  const desireSkillLevel = useSelector(state =>
    state.tecSkills.skills[props.category][props.skillName].desiredSkillLevel);
  const baseSkillLevel = useSelector(state =>
    state.tecSkills.skills[props.category][props.skillName].defaultSkillLevel);
  const validBaseSkill = isBaseSkillValid(baseSkillLevel, props.defaultSkillLevel)
    ? baseSkillLevel
    : props.defaultSkillLevel;
  const dispatch = useDispatch();
  const tooltipRef = useRef();
  const [isValid, setIsValid] = useState(true);


  const desireValueHandler = (event) => {
    dispatch(tecSkillsActions.setSkillDesiredValue({
      category: props.category,
      skillName: props.skillName,
      value: event.target.value,
    }));
    setIsValid(isDesiredSkillValid(event.target.value, validBaseSkill));
  };

  const lostFocusHandler = () => {
    setIsValid(true);
  };

  const onFocusHandler = (event) => {
    setIsValid(isDesiredSkillValid(event.target.value, validBaseSkill));
  };

  return (
    <>
      <Overlay
        target={tooltipRef}
        placement={"right"}
        show={!isValid}
        >
        <Tooltip id={`${props.skillName}_desiredTooltip`}>
          {validBaseSkill}-100
        </Tooltip>
      </Overlay>
      <input
        ref={tooltipRef}
        id={`${props.skillName}_desired`}
        value={desireSkillLevel}
        onChange={desireValueHandler}
        className={props.className}
        onBlur={lostFocusHandler}
        onFocus={onFocusHandler}
      />
    </>
  );

};

export function isDesiredSkillValid(desiredSkillLevel, baseSkillLevel) {
  return parseInt(desiredSkillLevel) >= parseInt(baseSkillLevel) && parseInt(desiredSkillLevel) <= 100;
}

export default BaseSkillInput;