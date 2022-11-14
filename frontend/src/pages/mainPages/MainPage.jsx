import classes from "./MainPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../../inventory/mainPageURLs";

const MainPage = () => {
  return (
    <>
      <Row className={"my-5"}>
        <Col className={"my-5"}>
          <h2>Purpose of this website:</h2>
          <p>This site was created to demonstrate some of my django projects.<br/>
            If you want to know more about my projects visit "About Me" page, where you can find link to my accounts.
          </p>
        </Col>
      </Row>

      <Row className={"my-5"}>
        <Col className={""}>
          <Link className={classes.link} to={MainPageURLs.tec}><h2>The Elder Commands</h2></Link>
          <p>This site was created to demonstrate some of my django projects.<br/>
            If you want to know more about my projects visit "About Me" page, where you can find link to my accounts.
          </p>
        </Col>
      </Row>

      <Row className={"my-5"}>
        <Col className={"my-5"}>
          <p>My projects are deployed using Ansible and tested with Selenium.</p>
        </Col>
      </Row>
    </>
);
};

export default MainPage;