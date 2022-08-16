import React, { useEffect, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  // Close,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./css/QuoraHeader.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFeedList } from "../app/thunk-async";
import { postQuestions } from "../service/question.service";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SearchQ from "./Search";
import Category from "../app/Category";

function QuoraHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    await postQuestions(data)
      .then((res) => {
        dispatch(fetchFeedList());
        setIsModalOpen(false);
      })
      .catch((e) => {});
  };

  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
          <Category />
        </div>
        <SearchQ />
        <div className="qHeader__Rem">
          <Button onClick={handleLogout}>Log Out</Button>

          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Question
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <select
                  name="category"
                  id="cars"
                  {...register("category", { required: true })}
                >
                  <option selected value="General">General</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Web Dev">Web Dev</option>
                </select>

                <Input
                  style={{ width: "100%", marginTop: "3rem" }}
                  type=" text"
                  placeholder="Start your question with 'What', 'How', 'Why', etc. "
                  name="question"
                  {...register("question", { required: true })}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
                <Button color="success" variant="outlined" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export { QuoraHeader };
