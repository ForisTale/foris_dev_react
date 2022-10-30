import Form from "react-bootstrap/Form";
import classes from "../pages/Contact.module.css";
import Button from "react-bootstrap/Button";
import {useState} from "react";


function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const subjectHandler = (event) => {
    setSubject(event.target.value);
  };
  const messageHandler = (event) => {
    setMessage(event.target.value);
  };
  const submitHandler = () => {

  };

  return <Form className={classes.input}>
    <Form.Group className={classes.formMaxWidth} controlId={"formSubject"}>
      <Form.Label>Subject:</Form.Label>
      <Form.Control className={classes.input} value={subject} onChange={subjectHandler}/>
    </Form.Group>
    <Form.Group className={classes.formMaxWidth} controlId={"formEmail"}>
      <Form.Label>Email address:</Form.Label>
      <Form.Control
        type={"email"}
        placeholder={"Optional"}
        className={classes.input}
        value={email}
        onChange={emailHandler}
      />
      <Form.Text className={"text-muted"}>
        We'll never share your e-mail with anyone else.
      </Form.Text>
    </Form.Group>
    <Form.Group controlId={"formMessage"}>
      <Form.Label>Message:</Form.Label>
      <Form.Control
        as={"textarea"}
        className={classes.input}
        value={message}
        onChange={messageHandler}
      />
    </Form.Group>
    <Form.Group className={classes.formButton}>
      <Button className={classes.button} onClick={submitHandler}>Submit</Button>
    </Form.Group>
  </Form>;
}

export default ContactForm;