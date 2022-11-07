import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {importantMessagesActions} from "../store/importantMessages-slice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./ShowImportantMessages.module.css";

const ShowImportantMessages = () => {
  const [showMessages, setShowMessages] = useState(false);
  const messages = useSelector(state => state.importantMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages.length) {
      setShowMessages(true);
    }
  }, [messages]);

  const handleClose = () => {
    setShowMessages(false);
    dispatch(importantMessagesActions.clear());
  };

  const modalBody = messages.map(message => <p>{message}</p>)

  return (
    <Modal
      show={showMessages}
      onHide={handleClose}
      contentClassName={classes.modal}
    >
      <Modal.Header>
        <Modal.Title>Important message:</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button className={classes.button} onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowImportantMessages;
