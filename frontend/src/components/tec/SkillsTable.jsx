import classes from "./SkillsTable.module.css"
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {tecSkillsActions} from "../../store/tecSkills-slice";


const SkillsTable = (props) => {
  const dispatch = useDispatch();
  const tableBody = [];

  const multiplierHandler = (skillCategory, skillName, event) => {
    dispatch(tecSkillsActions.setIsMultiplierActive({
      category: skillCategory,
      name: skillName,
    }));
  };

  const defaultValueHandler = (skillCategory, skillName, event) => {
    dispatch(tecSkillsActions.setSkillDefaultValue({
      category: skillCategory,
      name: skillName,
      value: event.target.value,
    }));
  };

  const desiredValueHandler = (skillCategory, skillName, event) => {
    dispatch(tecSkillsActions.setSkillDesiredValue({
      category: skillCategory,
      name: skillName,
      value: event.target.value,
    }));
  };

  for (const skillName in props.skills) {
    const tableRow = (
      <tr className={classes.rowBorder} key={skillName}>
        <td><Form.Check
          id={`${skillName}_multiplier`}
          type={"checkbox"}
          checked={props.skills[skillName].multiplier}
          onChange={multiplierHandler.bind(null, props.skillCategory, skillName)}
          className={classes.multiplier}
        /></td>
        <td className={classes.skillName}>{props.skills[skillName].name}</td>
        <td><input
          id={`${skillName}_base`}
          value={props.skills[skillName].default_value}
          onChange={defaultValueHandler.bind(null, props.skillCategory, skillName)}
          className={classes.input}
        /></td>
        <td><input
          id={`${skillName}_desired`}
          value={props.skills[skillName].desired_value}
          onChange={desiredValueHandler.bind(null, props.skillCategory, skillName)}
          className={classes.input}
        /></td>
      </tr>
    );
    tableBody.push(tableRow);
  }

  return (
    <Table className={classes.table} borderless>
      <thead>
      <tr>
        <th>Multiplier</th>
        <th>{props.skillCategory}</th>
        <th>Base Skills</th>
        <th>Desired Skills</th>
      </tr>
      </thead>
      <tbody>
      {tableBody}
      </tbody>
    </Table>
  );
};

export default SkillsTable;