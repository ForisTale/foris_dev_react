import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";

const BaseSkillInput = (props) => {
  const skill = useSelector(state => state.tecSkills.skills[props.category][props.skillName].defaultSkillLevel);
  const dispatch = useDispatch();


  const baseValueHandler = (event) => {
    dispatch(tecSkillsActions.setSkillDefaultValue({
      category: props.category,
      skillName: props.skillName,
      value: event.target.value,
    }))
  };

  return (
    <input
      id={`${props.skillName}_base`}
      value={skill}
      onChange={baseValueHandler}
      className={props.className}
    />
  );

};

export default BaseSkillInput;