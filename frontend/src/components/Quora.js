import React from "react";
import Feed from "./Feed";
import QuoraHeader from "./QuoraHeader";
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
              <Col xl={3} className="">
                <Sidebar />
              </Col>
              <Col xl={6} className="">
                <Feed />
              </Col>
              <Col xl={3} className="">
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
