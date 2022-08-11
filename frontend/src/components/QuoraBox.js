import { Avatar } from "@material-ui/core";
import { Container } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import "./css/QuoraBox.css";

function QuoraBox() {
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
