import classes from "./SkillsTable.module.css"
import Table from "react-bootstrap/Table";
import BaseSkillInput from "./BaseSkillInput";
import DesireSkillInput from "./DesireSkillInput";
import MultiplierCheckbox from "./MultiplierCheckbox";
import {useSelector} from "react-redux";
import defaultSkillsForRace from "../../../inventory/tec/defaultSkillsForRace";


const SkillsTable = (props) => {
  const skills = useSelector(state => state.tecSkills.skills[props.category]);
  const race = useSelector(state => state.tecSkills.race);
  const defaultSkills = defaultSkillsForRace(race);
  const tableBody = [];

  for (const skillName in skills) {
    const tableRow = (
      <tr className={classes.rowBorder} key={skillName}>
        <td><MultiplierCheckbox
          category={props.category}
          skillName={skillName}
          className={classes.multiplier}
        /></td>
        <td className={classes.skillName}>{skills[skillName].name}</td>
        <td><BaseSkillInput
          defaultSkillLevel={defaultSkills[props.category][skillName].defaultSkillLevel}
          className={classes.input}
          category={props.category}
          skillName={skillName}
        /></td>
        <td><DesireSkillInput
          defaultSkillLevel={defaultSkills[props.category][skillName].defaultSkillLevel}
          className={classes.input}
          category={props.category}
          skillName={skillName}
        /></td>
      </tr>
    );
    tableBody.push(tableRow);
  }

  return (
    <Table className={classes.table} borderless>
      <thead>
      <tr>
        <th>Multiply</th>
        <th>{props.category}</th>
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