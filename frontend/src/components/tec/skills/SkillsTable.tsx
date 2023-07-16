import classes from "./SkillsTable.module.css"
import Table from "react-bootstrap/Table";
import BaseSkillInput from "./BaseSkillInput";
import DesireSkillInput from "./DesireSkillInput";
import MultiplierCheckbox from "./MultiplierCheckbox";
import {useSelector} from "react-redux";
import defaultSkillsForRace, {
  SkillCategories,
  stealthSkillsKeys,
  combatSkillsKeys,
  magicSkillsKeys,
} from "../../../inventory/tec/defaultSkillsForRace";
import React from "react";
import {RootStateType} from "../../../store";
import {getStateSkill} from "../../../store/tecSkills/tecSkills-slice";


const SkillsTable: React.FC<{ category: keyof SkillCategories }> = (props) => {
  const race = useSelector((state: RootStateType) => state.tecSkills.race);
  const defaultSkills = defaultSkillsForRace(race);
  const tableBody:  JSX.Element[] = [];
  const skillsKeys = {
    "Magic": magicSkillsKeys,
    "Combat": combatSkillsKeys,
    "Stealth": stealthSkillsKeys,
  };
  let tableRow

  skillsKeys[props.category].map(skillName => {
    const skill = getStateSkill(defaultSkills, props.category, skillName);
    tableRow = (
      <tr className={classes.rowBorder} key={skillName}>
        <td><MultiplierCheckbox
          category={props.category}
          skillName={skillName}
          className={classes.multiplier}
        /></td>
        <td className={classes.skillName}>{skill.name}</td>
        <td><BaseSkillInput
          defaultSkillLevel={skill.defaultSkillLevel}
          className={classes.input}
          category={props.category}
          skillName={skillName}
        /></td>
        <td><DesireSkillInput
          defaultSkillLevel={skill.defaultSkillLevel}
          className={classes.input}
          category={props.category}
          skillName={skillName}
        /></td>
      </tr>
    );
    tableBody.push(tableRow);
  })

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