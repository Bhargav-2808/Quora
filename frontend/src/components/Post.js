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
import { postAnswers } from "../service/answer.service";

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
  const feedlist = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();
  const Close = <CloseIcon />;

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    dispatch(fetchFeedList());
  }, []);

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const body = {
        answer: answer,
        questionId: post?._id,
      };
      await postAnswers(body)
        .then((res) => {
          dispatch(fetchFeedList());
          setIsModalOpen(false);
        })
        .catch((e) => {
          console.log(e);
        });
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
              <Col>
                <p>{post?.questionName}</p>
              </Col>
            </Row>
            <Row>
              <Col>
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
            </Modal>
          </div>
          {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />}
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
                    </span>
                  </div>
                </div>
                <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Post;
