import classes from "./Contact.module.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <>
      <Row className={"my-5"}>
        <Col>
          <p>To contact me you can use this form or connect with one of my social accounts:
            <a className={classes.link} href={"https://www.linkedin.com/in/Zglobicki-Pawel"}> LinkedIn </a>
            or
            <a className={classes.link} href={"facebook.com/pawel.zglobicki.52"}> Facebook</a>.
          </p>
        </Col>
      </Row>
      <Row className={"my-5"}>
        <Col>
          <ContactForm />
        </Col>
      </Row>
    </>
  );
};

export default Contact;