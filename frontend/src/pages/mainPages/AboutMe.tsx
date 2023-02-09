import classes from "./AboutMe.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

const AboutMe = () => {
  return (
    <>
      <Row className={"my-5"}>
        <Col className={"my-5 col-12 col-md-8 mx-auto"}>
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
          <ul className={classes.list}>
            <li><Button className={classes.button}
                        href={"https://www.linkedin.com/in/Zglobicki-Pawel"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                >
                  LinkedIn</Button></li>
            <li><Button className={classes.button}
                        href={"https://github.com/ForisTale"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                >
                  GitHub</Button></li>
            <li><Button className={classes.button}
                        href={"https://facebook.com/pawel.zglobicki.52"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                >Facebook</Button></li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default AboutMe;