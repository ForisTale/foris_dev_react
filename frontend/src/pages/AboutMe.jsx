import classes from "./AboutMe.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutMe = () => {
  return (
    <>
      <Row className={"my-5"}>
        <Col className={"my-5"}>
          <h3>About me:</h3>
          <p> I believe that the code should not only be written fast, but also with quality and readability in mind.
            That is why I do my best to follow agile and clean code principles.
            Following TDD rules allows me to write quality code and adds to the value that I bring to the team.
            <br/><br/>
            I think punctuality is very important, so I always do my best to deliver the task on time. Equally,
            good communication is vital. It is important to exchange information with other team member and to keep
            them informed if there are going to be any delays or issues that cannot be immediately resolved.
            It is equally important to resolve any issues arising without having to disturb others too much.</p>
        </Col>
      </Row>

      <Row className={"my-5"}>
        <Col className={"col-4 mx-auto"}>
          <h3>Links to my accounts:</h3>
          <ul>
            <li><a className={classes.link} href="https://www.linkedin.com/in/Zglobicki-Pawel">LinkedIn</a></li>
            <li><a className={classes.link} href="https://github.com/ForisTale">GitHub</a></li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default AboutMe;