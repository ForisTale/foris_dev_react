import classes from "./MainPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";

const MainPage = () => {
  return (
    <>
      <Row className={classes.row}>
        <Col className={`${classes.col} col-12 col-md-8 mx-auto`}>
          <h2>Purpose of this website:</h2>
          <p>This site was created to demonstrate some of my django-react projects.<br/>
            If you want to know more about my projects visit "About Me" page, where you can find link to my GitHub.
          </p>
        </Col>
      </Row>

      <Row className={classes.row}>
        <Col className={`${classes.col} col-12 col-md-8 mx-auto`}>
          <Link className={classes.link} to={MainPageURLs.tec}><h2>The Elder Commands</h2></Link>
          <p>It generates console commands for skills, items, spells, etc. for the base game and mods.
            Lets you add new mods to the database.</p>
          <p>
          It's a complete rewrite of my old project. Now it uses React as frontend and Django as backend.
          </p>
        </Col>
      </Row>

      <Row className={classes.row}>
        <Col className={`${classes.col} col-12 col-md-8 mx-auto`}>
          <p>My projects are deployed using Ansible and tested with Selenium.</p>
        </Col>
      </Row>
    </>
  );
};

export default MainPage;