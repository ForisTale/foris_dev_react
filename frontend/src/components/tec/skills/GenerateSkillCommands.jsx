import Button from "react-bootstrap/Button";
import classes from "./GenerateSkillsCommands.module.css";
import {useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";

const GenerateSkillCommands = () => {
  const dispatch = useDispatch();


  const clickHandler = () => {
    dispatch(tecSkillsActions.generateCommands());
  };

  return (
    <Button
      id={"generate_commands"}
      className={classes.button}
      onClick={clickHandler}
      >Generate Commands</Button>
  );
};

export default GenerateSkillCommands;