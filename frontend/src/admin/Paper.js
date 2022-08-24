import { Delete } from "@material-ui/icons";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchPaperList } from "../app/thunk-async";
import { deletePaper, uploadPaper } from "../service/admin.service";

const Paper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pName, setPName] = useState("");
  const [paper, setPaper] = useState(null);
  const paperlist = useSelector((state) => state.paper.paperData);
  let formdata = new FormData();

  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    formdata.append("paperName", pName);
    formdata.append("paperPdf", paper);
    const res = await uploadPaper(formdata)
      .then(() => {
        dispatch(fetchPaperList());
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(res);
  };

  const deletePaperFunction = async (id) => {
    await deletePaper(id)
      .then(() => {
        dispatch(fetchPaperList());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(fetchPaperList());
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-1 d-flex justify-content-center">
          <Button variant="dark" onClick={handleLogout}>
            Log Out
          </Button>
        </Col>
        <Col className="mt-1 d-flex justify-content-center">
          <Link to={"/admin"}>
            <Button variant="dark">Go Back</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="card mt-4">
            <Card.Body>
              <img
                src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
                alt="logo"
                width={50}
                height={50}
              />

              <Form encType="multipart/form-data">
                <Row className="d-flex justify-content-center">
                  <Col xl={8} lg={8}>
                    <h5 className="mb-2">Paper Name</h5>
                    <Form.Control
                      className="fcontrol mb-4"
                      type="text"
                      placeholder="sem7 Web Data Management"
                      name="paperName"
                      onChange={(e) => {
                        setPName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xl={8} lg={8}>
                    <h5 className="mb-2">Upload Paper</h5>
                    <input
                      type="file"
                      name="paperPdf"
                      onChange={(e) => {
                        setPaper(e.target.files[0]);
                      }}
                    />
                  </Col>
                  <Col xl={8} lg={8}>
                    <Button
                      variant="dark"
                      className="mb-4 mt-4"
                      type="submit"
                      onClick={handelSubmit}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center mt-2">
          <h3>Paper List</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>PaperName</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paperlist?.data?.map((post, index) => (
                <>
                  <tr key={index + post?.questionName}>
                    <td>{index + 1}</td>
                    <td>{post?.paperName}</td>
                    <td>
                      <Delete
                        onClick={() => {
                          deletePaperFunction(post?._id);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Paper;
