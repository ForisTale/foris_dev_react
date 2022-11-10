import Form from "react-bootstrap/Form";
import classes from "./ContactForm.module.css";
import Button from "react-bootstrap/Button";
import {useState, useReducer, useEffect} from "react";
import getCSRFToken from "../inventory/getCSRFToken";
import {importantMessagesActions} from "../store/importantMessages-slice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {MainPageURLs} from "../inventory/mainPageURLs";

const initialInputState = {
  text: "",
  isValid: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "input":
      return {text: action.text, isValid: action.text !== ""};
    default :
      throw new Error();
  }
};

function ContactForm() {
  const [email, emailDispatch] = useReducer(inputReducer, initialInputState);
  const [subject, subjectDispatch] = useReducer(inputReducer, initialInputState);
  const [message, messageDispatch] = useReducer(inputReducer, initialInputState);
  const [agreement, setAgreement] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const formValidation = () => {
      return [subject.isValid, message.isValid, agreement].every(valid => valid);
    };
    setFormIsValid(formValidation());

  }, [subject.isValid, message.isValid, agreement]);

  const emailHandler = (event) => {
    emailDispatch({type: "input", text: event.target.value});
  };

  const subjectHandler = (event) => {
    subjectDispatch({type: "input", text: event.target.value});
  };

  const messageHandler = (event) => {
    messageDispatch({type: "input", text: event.target.value});
  };

  const checkboxHandler = () => {
    setAgreement(prevState => !prevState);
  };

  const submitHandler = () => {
    fetch(window.apiURLs.contact, {
      method: "POST",
      body: {
        "subject": subject,
        "email": email,
        "message": message,
      },
      headers: {
        "X-CSRFToken": getCSRFToken(),
      },
    }).then(response => response.json()).then(data => {
      dispatch(importantMessagesActions.append(data.message));
    }).catch(error => {
      dispatch(importantMessagesActions.append([
        "Service is unavailable at the moment. ",
        "Please try a different method of contact."
      ]));
    });
  };

  return (
    <Form className={classes.input}>
      <Form.Group className={classes.formMaxWidth} controlId={"formSubject"}>
        <Form.Label>Subject:</Form.Label>
        <Form.Control
          className={classes.input}
          value={subject.text}
          onChange={subjectHandler}
          required
        />
      </Form.Group>
      <Form.Group className={classes.formMaxWidth} controlId={"formEmail"}>
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type={"email"}
          placeholder={"Optional"}
          className={classes.input}
          value={email.text}
          onChange={emailHandler}
        />
      </Form.Group>
      <Form.Group controlId={"formMessage"}>
        <Form.Label>Message:</Form.Label>
        <Form.Control
          as={"textarea"}
          className={classes.input}
          value={message.text}
          onChange={messageHandler}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          className={classes.checkbox}
          type={"checkbox"}
          label={<p>I have read and agree to <Link to={MainPageURLs.privacyPolicy}>Privacy Policy</Link></p>}
          onChange={checkboxHandler}
        />
      </Form.Group>
      <Form.Group className={classes.formButton}>
        <Button disabled={!formIsValid} className={classes.button} onClick={submitHandler}>Submit</Button>
      </Form.Group>
    </Form>
  );
}

export default ContactForm;