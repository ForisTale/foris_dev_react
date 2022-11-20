import classes from "./Commands.module.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../store/tecSkills/tecSkills-slice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DownloadButton from "../../components/tec/commands/DownloadButton";

const Commands = () => {
  const dispatch = useDispatch();
  const commands = useSelector(state => state.tecSkills.commands);
  const tableBody = commands.map((command, index) => <tr key={index}>
    <td>{command}</td>
  </tr>);
  if (tableBody.length === 0) tableBody.push(<tr key={"noCommandds"}>
    <td>There are no commands to display!</td>
  </tr>);

  const resetCommandsHandler = () => {
    dispatch(tecSkillsActions.resetSkills());
  };

  return (
    <>
      <Row className={classes.row}>
        <Col className={"col-12 col-md-2"}></Col>
        <Col className={`col-12 col-md-3 ${classes.center}`}>
          <Button
            className={classes.button}
            onClick={resetCommandsHandler}
          >Reset All Commands</Button>
        </Col>
        <Col className={"col-12 col-md-2"}></Col>
        <Col className={`col-12 col-md-3 ${classes.center}`}>
          <DownloadButton commands={commands}/>
        </Col>
        <Col className={"col-12 col-md-2"}></Col>
      </Row>
      <Row className={classes.row}>
        <Col className={"col-12 col-md-3"}></Col>
        <Col className={"col-12 col-md-6"}>
          <Table className={classes.table}>
            <thead>
            <tr>
              <th>Commands:</th>
            </tr>
            </thead>
            <tbody>
            {tableBody}
            </tbody>
          </Table>
        </Col>
        <Col className={"col-12 col-md-3"}></Col>
      </Row>
    </>
  );
};

export default Commands;