import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {useRef, useState} from "react";
import React from "react";
import {RootStateType} from "../../../store";
import {
  SkillCategories,
  MagicSkills,
  CombatSkills,
  StealthSkills,
  Skill
} from "../../../inventory/tec/defaultSkillsForRace";

const BaseSkillInput: React.FC<{
  category: keyof SkillCategories,
  skillName: keyof MagicSkills | keyof CombatSkills | keyof StealthSkills,
  defaultSkillLevel: string,
  className: string,
}> = (props) => {

  const baseSkillLevel = useSelector((state: RootStateType) => {
    const categoryOfSkills = state.tecSkills.skills[props.category];
    return (categoryOfSkills[props.skillName as keyof typeof categoryOfSkills] as Skill).defaultSkillLevel;
  });
  const dispatch = useDispatch();
  const tooltipRef = useRef(null);
  const [isValid, setIsValid] = useState(true);


  const baseValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tecSkillsActions.setSkillDefaultValue({
      category: props.category,
      skillName: props.skillName,
      value: event.target.value,
    }));
    setIsValid(isBaseSkillValid(event.target.value, props.defaultSkillLevel));
  };

  const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsValid(isBaseSkillValid(event.target.value, props.defaultSkillLevel));
  };

  return (
    <>
      <Overlay
        target={tooltipRef}
        placement={"left"}
        show={!isValid}
      >
        <Tooltip id={`${props.skillName}_baseTooltip`}>
          {props.defaultSkillLevel}-100
        </Tooltip>
      </Overlay>
      <input
        ref={tooltipRef}
        id={`${props.skillName}_base`}
        value={baseSkillLevel}
        onChange={baseValueHandler}
        className={props.className}
        onFocus={onFocusHandler}
      />
    </>
  );

};

export function isBaseSkillValid(baseSkillLevel: string, defaultSkillLevel: string) {
  return Number(baseSkillLevel) >= Number(defaultSkillLevel) && Number(baseSkillLevel) <= 100;
}

export default BaseSkillInput;