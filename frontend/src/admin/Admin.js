import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Table,
  useAccordionButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedList } from "../app/thunk-async";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Delete } from "@material-ui/icons";
import ReactHtmlParser from "html-react-parser";
import { deleteAnswers, deleteQuestions } from "../service/admin.service";
import { useNavigate } from "react-router-dom";

function CustomToggle({ eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <ExpandMoreIcon onClick={decoratedOnClick} />;
}

const Admin = () => {
  const feedlist = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  const deleteQuestionFunction = async (id) => {
    await deleteQuestions(id).then(() => {
      dispatch(fetchFeedList());
    });
  };

  const deleteAnswerFunction = async (id) => {
    await deleteAnswers(id).then(() => {
      dispatch(fetchFeedList());
    });
  };

  useEffect(() => {
    dispatch(fetchFeedList());
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} className="mt-1">
            <Button variant="dark" onClick={handleLogout}>
              Log Out
            </Button>
          </Col>
          <Col xl={12} lg={12} className="mt-2 mb-2">
            <Table striped variant="dark">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Questions</th>
                  <th>Delete</th>
                  <th>Answers</th>
                </tr>
              </thead>
              <tbody>
                {feedlist?.data?.map((post, index) => (
                  <>
                    <tr key={index + post?.questionName}>
                      <td>{index + 1}</td>
                      <td>{post?.questionName}</td>
                      <td>
                        <Delete
                          onClick={() => {
                            deleteQuestionFunction(post?._id);
                          }}
                        />
                      </td>
                      <td>
                        <Accordion defaultActiveKey="0">
                          <CustomToggle eventKey="0" />

                          <Accordion.Collapse eventKey="0">
                            <div>
                              {post?.allAnswers?.map((ans, index) => (
                                <Row key={index}>
                                  <Col>{ReactHtmlParser(ans?.answer)} </Col>
                                  <Col>
                                    <Delete
                                      onClick={() => {
                                        deleteAnswerFunction(ans?._id);
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ))}
                            </div>
                          </Accordion.Collapse>
                        </Accordion>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
