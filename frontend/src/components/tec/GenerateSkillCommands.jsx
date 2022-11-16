import Button from "react-bootstrap/Button";
import classes from "./GenerateSkillsCommands.module.css";

const GenerateSkillCommands = () => {
  return (
    <Button
      id={"generate_commands"}
      className={classes.button}
      >Generate Commands</Button>
  );
};

export default GenerateSkillCommands;