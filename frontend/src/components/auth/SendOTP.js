import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sendotp } from '../../service/common.service';

const SendOTP = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    const res =await sendotp(data);
    console.log(res);
    if(res)
    {
      localStorage.setItem("token",JSON.stringify(res));
      
      const tokenInfo = JSON.parse(localStorage.getItem("token"));
      navigate(`/verifyotp/${tokenInfo?.resetToken}`);
    }
  }

  return (
    <Container className="my-3 mainContainer">
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
              <h5 className="mb-2">Registerd Email*</h5>
              <Form.Control
                required
                className="fcontrol mb-4"
                type="email"
                placeholder="abc@gmail.com"
                name="email"
                {...register("email", { required:true  })}
              />
            </Col>
          </Row>  

          <Button variant="dark" className="mb-4" type="submit">
            Send OTP
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  )
}

export default SendOTP