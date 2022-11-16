import classes from "./RaceButton.module.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills-slice";


const RaceButton = () => {
  const races = ["Altmer", "Argonian", "Bosmer", "Breton", "Dunmer",
    "Imperial", "Khajiit", "Nord", "Ork", "Redguard"];
  const dispatch = useDispatch();


  const selectRaceHandler = (eventKey) => {
    dispatch(tecSkillsActions.setRace(eventKey));
  };

  const races_buttons = races.map(race => {
    return (<Dropdown.Item
      key={race}
      as={"button"}
      className={classes.raceButton}
      eventKey={race}
    >{race}</Dropdown.Item>);
  });

  return (
    <>
      <DropdownButton
        id={"reset_race"}
        className={classes.button}
        title={"Reset & Change Race "}
        drop={"end"}
        onSelect={selectRaceHandler}
      >
        {races_buttons}
      </DropdownButton>
    </>
  );
};

export default RaceButton;