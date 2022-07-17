import "./NLogin.css";
import { Link } from "react-router-dom";
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const NLogin = () => {
  return (
    <>
        <Container className="my-3 mainContainer">
                <Card className="card">
                    <img
                    src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
                    alt="logo"
                    />
                    <Card.Body>
                        <Form>
                            <h2>Login</h2>
                            <hr />
                            <h5 className="mb-2">Email*</h5>
                            <Form.Control className="fcontrol mb-4" type="email" placeholder="hello@xyz.com" required/>
                            <h5 className="mb-2">Password*</h5>
                            <Form.Control className="fcontrol mb-4" type="password" placeholder="Min. 5 Char" required/>
                            <Button variant="dark" className="mb-4">Login To Continue</Button>
                            <h6 className="text-secondary">Not registered yet? <Link to="/signup" className="text-dark">Create an Account. </Link></h6>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    </>
  )
}

export default NLogin