import classes from "./DownloadButton.module.css";
import getCSRFToken from "../../../inventory/getCSRFToken";
import Button from "react-bootstrap/Button";
import React from "react";

const DownloadButton: React.FC<{commands: string[]}> = (props) => {
  const commands = JSON.stringify(props.commands);

  const commandsDownloadURL = window.apiURLs.commandsDownload;

  return (
    <form method={"post"} action={commandsDownloadURL}>
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