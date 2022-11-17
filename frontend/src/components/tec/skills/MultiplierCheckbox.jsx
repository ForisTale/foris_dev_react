import Form from "react-bootstrap/Form";
import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";

const MultiplierCheckbox = (props) => {
  const checked = useSelector(state => state.tecSkills.skills[props.category][props.skillName].multiplier);
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
      checked={checked}
      className={props.className}
      onChange={multiplierHandler}
    />
  );
};

export default MultiplierCheckbox;