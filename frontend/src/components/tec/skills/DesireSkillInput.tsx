import {useSelector, useDispatch} from "react-redux";
import {isBaseSkillValid} from "./BaseSkillInput";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {useRef, useState} from "react";
import React from "react";
import {RootStateType} from "../../../store";
import {CombatSkills, MagicSkills, SkillCategories, StealthSkills} from "../../../inventory/tec/defaultSkillsForRace";
import {getStateSkill} from "../../../store/tecSkills/tecSkills-slice";

const BaseSkillInput: React.FC<{
  category: keyof SkillCategories,
  skillName: keyof MagicSkills | keyof CombatSkills | keyof StealthSkills,
  defaultSkillLevel: string,
  className: string,
}> = (props) => {

  const desireSkillLevel = useSelector((state: RootStateType) => {
    const skill = getStateSkill(state.tecSkills.skills, props.category, props.skillName);
    return skill.desiredSkillLevel
  });
  const baseSkillLevel = useSelector((state: RootStateType) => {
    const skill = getStateSkill(state.tecSkills.skills, props.category, props.skillName);
    return skill.defaultSkillLevel;
  });
  const validBaseSkill = isBaseSkillValid(baseSkillLevel, props.defaultSkillLevel)
    ? baseSkillLevel
    : props.defaultSkillLevel;
  const dispatch = useDispatch();
  const tooltipRef = useRef(null);
  const [isValid, setIsValid] = useState(true);


  const desireValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tecSkillsActions.setSkillDesiredValue({
      category: props.category,
      skillName: props.skillName,
      value: event.target.value,
    }));
    setIsValid(isDesiredSkillValid(event.target.value, validBaseSkill));
  };

  const lostFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setIsValid(isDesiredSkillValid(event.target.value, validBaseSkill));
    } else {
      setIsValid(true);
    }
  };

  const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
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

export function isDesiredSkillValid(desiredSkillLevel: string, baseSkillLevel: string) {
  return Number(desiredSkillLevel) >= Number(baseSkillLevel) && Number(desiredSkillLevel) <= 100;
}

export default BaseSkillInput;