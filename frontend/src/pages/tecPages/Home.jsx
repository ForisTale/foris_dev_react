import classes from "./Home.module.css";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Row>
      <Col className={"col-12 col-lg-4"}/>
      <Col className={`col-12 col-lg-4 ${classes.main}`}>
        <h1 className={classes.title}>The Elder Commands</h1>
        <p>This is a website I created to make it easier to play Skyrim with different skills and mods.<br/>
          You can easily add mods to the database, just follow the instructions on the plugins page.</p>
        <h4>Skills</h4>
        <p>Allows to generate skills commands. Selecting "Fill skills to desired level?" to raise all skills till they
          meet desired level. Additionally selecting multiplier will raise given skill X times more often. </p>
        <h4>Items & Spells & Other</h4>
        <p>Generate commands from selected plugins. To save any changed in tables you need to generate commands.<br/>
          For adding spells, my advice is to use spell books if possible, as spells often have few versions. Editor Id
          may
          help to understand intended usage.</p>
        <h4>Plugins</h4>
        <p>Select plugins you want to use, get load order from you mod manager. If you want to add mod, select "Add
          Plugin" and follow the instructions.</p>
        <h4>Commands</h4>
        <p>Here you can copy or download commands, as well as clear all commands. Easy way to use commands is to
          download
          them and paste to folder with Skyrim.exe. Then in game use command: bat FileName</p>
        <h4>Contact</h4>
        <p>If you have any questions or suggestions please contact me by using this page: <Link
          to={MainPageURLs.contact}
          className={classes.link}
        >Contact</Link></p>
      </Col>
      <Col className={"col-12 col-lg-4"}/>
    </Row>
  );
};

export default Home;