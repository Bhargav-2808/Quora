import React from "react";
import Feed from "./Feed";
import {QuoraHeader} from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import "./css/Quora.css";
import { Col, Container, Row } from "react-bootstrap";

function Quora() {
  return (
    <div className="">
      <QuoraHeader />
      <Container fluid>
        <Row>
          <div className="quora__contents">
            <div className="quora__content">
              <Col xl={8} className="d-flex justify-content-center">
                <Feed />
              </Col>
              <Col xl={4} className="d-flex justify-content-center">
                <Widget />
              </Col>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Quora;
