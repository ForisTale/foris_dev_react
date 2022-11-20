import classes from "./DownloadButton.module.css";
import getCSRFToken from "../../../inventory/getCSRFToken";
import Button from "react-bootstrap/Button";

const DownloadButton = (props) => {
  const commands = JSON.stringify(props.commands);

  return (
    <form method={"post"} action={window.apiURLs.commandsDownload}>
      <Button
        disabled={!props.commands.length}
        type={"submit"}
        className={classes.button}
      >Download Commands</Button>
      <input type="hidden" name={"commands"} value={commands}/>
      <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()}/>
    </form>
  );
};

export default DownloadButton;