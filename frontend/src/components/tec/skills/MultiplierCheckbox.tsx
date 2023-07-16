import Form from "react-bootstrap/Form";
import {useSelector, useDispatch} from "react-redux";
import {getStateSkill, tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import React from "react";
import {RootStateType} from "../../../store";
import {CombatSkills, MagicSkills, SkillCategories, StealthSkills} from "../../../inventory/tec/defaultSkillsForRace";

const MultiplierCheckbox: React.FC<{
  category: keyof SkillCategories,
  skillName: keyof MagicSkills | keyof CombatSkills | keyof StealthSkills,
  className: string,
}> = (props) => {

  const multiplierChecked = useSelector((state: RootStateType) => {
    const skill = getStateSkill(state.tecSkills.skills, props.category, props.skillName);
    return skill.multiplier;
  });
  const dispatch = useDispatch();

  const multiplierHandler = () => {
    dispatch(tecSkillsActions.setIsMultiplierActive({
      category: props.category,
      skillName: props.skillName,
    }));
  };

  return (
    <Form.Check
      id={`${props.skillName}_multiplier`}
      type={"checkbox"}
      checked={multiplierChecked}
      className={props.className}
      onChange={multiplierHandler}
    />
  );
};

export default MultiplierCheckbox;