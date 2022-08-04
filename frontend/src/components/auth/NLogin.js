import "./NLogin.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const NLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await axios
      .post("http://localhost:8000/api/login", data)
      .then()
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      navigate("/");
    }
  };
  return (
    <>
      <Container className="my-3 mainContainer">
        <Card className="card">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h2>Login</h2>
              <hr />
              <Row>
                <Col>
                  <h5 className="mb-2">Email*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="email"
                    placeholder="hello@xyz.com"
                    name="email"
                    {...register("email", { required: true })}
                  />
                </Col>
                <Col>
                  <h5 className="mb-2">Password*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="password"
                    placeholder="Min. 5 Char"
                    name="password"
                    {...register("password", { required: true})}
                  />
                </Col>
              </Row>

              <Button variant="dark" className="mb-4" type="submit">
                Login To Continue
              </Button>
              <h6 className="text-secondary">
                  Not registered yet?{" "}
                <Link to="/signup" className="text-dark">
                  Create an Account.{" "}
                </Link>
              </h6>
              <h6 className="text-secondary">
                Forgote Password &nbsp;
                <Link to="/sendotp" className="text-dark">
                  : Forgote Password{" "}
                </Link>
              </h6>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NLogin;
