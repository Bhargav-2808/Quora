import React from "react";
import "./NLogin.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import {Row,Col} from 'react-bootstrap'
import axios from 'axios';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:8000/api/register",data).then(
      (result)=>{
        //console.log(result)
      }
    ).catch((err)=>{
      console.log(err);
    });
    
  };
  return (
    <>
      <Container className="my-3 mainContainer">
        <Card className="card">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h2>Sign Up</h2>
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
                  <h5 className="mb-2">Phone*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="tel"
                    placeholder="1234567890"
                    name="mobile"
                    {...register("mobile", { required: true })}
                  />
                  <h5 className="mb-2">College*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="text"
                    placeholder="LDRP-ITR"
                    name="college"
                    {...register("college", { required: true })}
                  />
                </Col>
                <Col>
                  <h5 className="mb-2">Name*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="text"
                    placeholder="Name"
                    name="name"
                    {...register("name", { required: true })}
                  />

                  <h5 className="mb-2">Password*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="password"
                    placeholder="Min. 5 Char"
                    name="password"
                    {...register("password", { required: true })}
                  />
                  <h5 className="mb-2">Confirm Password*</h5>
                  <Form.Control
                    className="fcontrol mb-4"
                    type="password"
                    placeholder="Min. 5 Char"
                    name="cpassword"
                    {...register("cpassword", { required: true })}
                  />
                </Col>
              </Row>

              <Button variant="dark" className="mb-4" type="submit">
                Sign Up To Continue
              </Button>
              <h6 className="text-secondary">
                Already have an account?{" "}
                <Link to="/login" className="text-dark">
                  Sign In.
                </Link>
              </h6>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;
