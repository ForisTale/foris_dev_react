import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";

const BaseSkillInput = (props) => {
  const skill = useSelector(state => state.tecSkills.skills[props.category][props.skillName].desiredSkillLevel);
  const dispatch = useDispatch();


  const desireValueHandler = (event) => {
    dispatch(tecSkillsActions.setSkillDesiredValue({
      category: props.category,
      skillName: props.skillName,
      value: event.target.value,
    }))
  };

  return (
    <input
      id={`${props.skillName}_desired`}
      value={skill}
      onChange={desireValueHandler}
      className={props.className}
    />
  );

};

export default BaseSkillInput;