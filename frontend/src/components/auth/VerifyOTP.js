import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { sendotp, verifyotp } from "../../service/common.service";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const tokenInfo = JSON.parse(localStorage.getItem("token"));
  const {token}=useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await verifyotp(data,token);
    if (res) {
      navigate("/login");
      localStorage.clear();
    }
  };

  

  const Link_ = () => {
    return (
      <>
        <span>
          Click on the <a href={tokenInfo?.Message} target="blank_"> Link </a> to get otp
        </span>
      </>
    );
  };

  return (
    <Container className="my-3 mainContainer " style={{flexDirection:"column"}}>
      <Row className="m-3">
        <Col>
          <Link_ />
        </Col>
      </Row>
      <Card className="card">
        <img
          src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
          alt="logo"
        />
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <hr />
            <Row>
              <Col>
                <h5 className="mb-2">OTP</h5>
                <Form.Control
                  required
                  className="fcontrol mb-4"
                  type="number"
                  placeholder="OTP"
                  name="otp"
                  {...register("otp", { pattern: /^[0-9]{1,6}$/ })}
                />
                {errors.otp && (
                  <span style={{ color: "red", marginBottom: "5px" }}>
                    Max 6 digit
                  </span>
                )}
                <h5 className="mb-2">New Password</h5>
                <Form.Control
                  required
                  className="fcontrol mb-4"
                  type="password"
                  placeholder="9998979495"
                  name="password"
                  {...register("password")}
                />
              </Col>
            </Row>

            <Button variant="dark" className="mb-4" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerifyOTP;
