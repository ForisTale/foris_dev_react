import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {useRef, useState} from "react";
import React from "react";
import {RootStateType} from "../../../store";

const BaseSkillInput: React.FC<{
  category: string,
  skillName: string,
  defaultSkillLevel: string,
  className: string,
}> = (props) => {

  const baseSkillLevel = useSelector((state: RootStateType) =>
    state.tecSkills.skills[props.category][props.skillName].defaultSkillLevel);
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

  const lostFocusHandler = () => {
    setIsValid(true);
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
        onBlur={lostFocusHandler}
        onFocus={onFocusHandler}
      />
    </>
  );

};

export function isBaseSkillValid(baseSkillLevel: string, defaultSkillLevel: string) {
  return Number(baseSkillLevel) >= Number(defaultSkillLevel) && Number(baseSkillLevel) <= 100;
}

export default BaseSkillInput;