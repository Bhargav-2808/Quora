import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import ReactHtmlParser from "html-react-parser";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedList } from "../app/thunk-async";
import { postAnswers, postAnswersImage } from "../service/answer.service";
// import { ToastContainer, toast } from 'react-toastify';

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const feedlist = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();
  let formdata = new FormData();
  const Close = <CloseIcon />;

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    dispatch(fetchFeedList());
  }, []);

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      formdata.append("answer", answer);
      formdata.append("questionId", post?._id);
      formdata.append("answerImage", file);

      const body = {
        answer: answer,
        questionId: post?._id,
      };

      if (file) {
        await postAnswersImage(formdata)
          .then((res) => {
            // toast.success(res?.message);
            console.log(res?.message);
            dispatch(fetchFeedList());
            setIsModalOpen(false);
          })
          .catch((e) => {
            // toast.success(e);
          });
      } else {
        await postAnswers(body)
          .then((res) => {
            // toast.success(res?.message);
            console.log(res?.message);
            dispatch(fetchFeedList());
            setIsModalOpen(false);
          })
          .catch((e) => {
            // toast.success(e);
          });
      }
    }
  };

  return (
    <Container>
      <div className="post">
        <div className="post__info">
          {/* <Avatar src={post?.user?.photo} /> */}
          {/* <h4>{post?.user?.userName}</h4> */}

          <small>
            <LastSeen date={post?.createdAt} />
          </small>
        </div>
        <div className="">
          <div className="">
            <Row>
              <Col className="m-2">
                <p>{post?.questionName}</p>
              </Col>

              <Col className="m-2">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="post__btnAnswer"
                >
                  Answer
                </button>
              </Col>
            </Row>
            <Row>
              <Col className="m-2">
                {post?.imagePath ? (
                  <img
                    width={200}
                    height={150}
                    alt="answerImage"
                    className="postImage"
                    src={
                      require(`./../../src/uploads/images/${post?.imagePath}`)
                        .default
                    }
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Modal
              open={isModalOpen}
              closeIcon={Close}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              {" "}
              <form enctype="multipart/form-data">
                <div className="modal__question">
                  <h1>{post?.questionName}</h1>
                  <p>
                    asked by
                    {/* <span className="name">{post?.user?.userName}</span>{" "} */}
                    on{" "}
                    <span className="name">
                      {new Date(post?.createdAt).toLocaleString()}
                    </span>
                  </p>

                  <input
                    type="file"
                    name="answerImage"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="modal__answer">
                  <ReactQuill
                    value={answer}
                    onChange={handleQuill}
                    placeholder="Enter your answer"
                  />
                </div>
                <div className="modal__button">
                  <button
                    className="cancle"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSubmit} type="submit" className="add">
                    Add Answer
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="post__footer">
          <div className="post__footerAction">
            <ArrowUpwardOutlined />
            <ArrowDownwardOutlined />
          </div>
          <RepeatOneOutlined />
          <ChatBubbleOutlined />
          <div className="post__footerLeft">
            <ShareOutlined />
            <MoreHorizOutlined />
          </div>
        </div>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          {post?.allAnswers.length} Answer(s)
        </p>

        <div
          style={{
            margin: "5px 0px 0px 0px ",
            padding: "5px 0px 0px 20px",
            borderTop: "1px solid lightgray",
          }}
          className="post__answer"
        >
          {post?.allAnswers?.map((_a) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: "10px 5px",
                  borderTop: "1px solid lightgray",
                }}
                className="post-answer-container"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#888",
                  }}
                  className="post-answered"
                >
                  {/* <Avatar src={_a?.user?.photo} /> */}
                  <div
                    style={{
                      margin: "0px 10px",
                    }}
                    className="post-info"
                  >
                    {/* <p>{_a?.user?.userName}</p> */}
                    <span>
                      <LastSeen date={_a?.createdAt} />
                      {_a?.imagePath ? (
                        <img
                          width={200}
                          height={150}
                          alt="answerImage"
                          className="postImage"
                          src={
                            require(`./../../src/uploads/images/${_a?.imagePath}`)
                              .default
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </div>
                <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </Container>
  );
}

export default Post;
