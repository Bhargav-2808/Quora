import React from "react";
import "./NLogin.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const SignUp = () => {
  return (
    <>
        <Container className="my-3 mainContainer">
            <Card className="card">
                <Card.Body>
                    <Form>
                        <h2>Sign Up</h2>
                        <hr />
                        <h5 className="mb-2">Name*</h5>
                        <Form.Control className="fcontrol mb-4" type="text" placeholder="Name" required />
                        <h5 className="mb-2">Email*</h5>
                        <Form.Control className="fcontrol mb-4" type="email" placeholder="hello@xyz.com" required />
                        <h5 className="mb-2">Phone*</h5>
                        <Form.Control className="fcontrol mb-4" type="tel" placeholder="1234567890" required />
                        <h5 className="mb-2">College*</h5>
                        <Form.Control className="fcontrol mb-4" type="text" placeholder="LDRP-ITR" required />
                        <h5 className="mb-2">Password*</h5>
                        <Form.Control className="fcontrol mb-4" type="password" placeholder="Min. 5 Char" required />
                        <Button variant="dark" className="mb-4">Sign Up To Continue</Button>
                        <h6 className="text-secondary">Already have an account? <Link to="/login" className="text-dark">Sign In.</Link></h6>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default SignUp