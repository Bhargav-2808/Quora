import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedList } from "../app/thunk-async";

function Feed() {
  const [posts, setPosts] = useState([]);
  const feedlist = useSelector((state) => state.feed.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedList());
  }, []);

  // const getData = async ()=>{
  //   const res = await  axios.get("http://localhost:8000/api");
  //   setPosts(res.data);
  // }

  return (
    <div className="feed">
      <QuoraBox />
      {feedlist?.data?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

export default Feed;
