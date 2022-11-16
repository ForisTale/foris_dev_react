import calculateDefaultLevel from "./calculateDefaultLevel";
import calculateDesiredLevel from "./calculateDesiredLevel";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const EstimatedLevels = () => {
  const race = useSelector(state => state.tecSkills.race);
  const skills = useSelector(state => state.tecSkills.skills);
  const [baseLevel, setBaseLevel] = useState(1);
  const [desiredLevel, setDesiredLevel] = useState(1);

  useEffect(() => {
    setBaseLevel(calculateDefaultLevel(race, skills));
    setDesiredLevel(calculateDesiredLevel(race, skills));
  }, [race, skills]);


  return (
    <>
      <h6 id={"base_level"}>Base level: {baseLevel}</h6>
      <h6 id={"estimated_desired_level"}>Estimated desired level: {desiredLevel}</h6>
    </>
  );
};

export default EstimatedLevels;