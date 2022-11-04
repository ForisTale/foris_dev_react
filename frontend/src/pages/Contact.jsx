import classes from "./Contact.module.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <>
      <Row className={"my-5"}/>
      <Row className={"my-5"}>
        <Col className={"col-12 col-sm-4"}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Text>
                To contact me you can use this form or connect with one of my social accounts:
              </Card.Text>
              <div className={classes.cardButtons}>
                <Button className={classes.button}
                        href={"https://www.linkedin.com/in/Zglobicki-Pawel"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                >
                  LinkedIn</Button>
                <Button className={classes.button}
                        href={"https://facebook.com/pawel.zglobicki.52"}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                >Facebook</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className={classes.phoneScreenMargin}>
          <ContactForm/>
        </Col>
      </Row>
    </>
  );
};

export default Contact;