import { Avatar } from "@material-ui/core";
import { Container } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/QuoraBox.css";

function QuoraBox() {
  // const user = useSelector(selectUser);
  return (
    <Container>
      <div className="quoraBox">
        <div className="quoraBox__info">
          {/* <Avatar src={user?.photo} /> */}
          <h5>What is your question or link?</h5>
        </div>
      </div>
    </Container>
  );
}

export default QuoraBox;
