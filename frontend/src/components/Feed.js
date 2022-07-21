import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
}, []);
  const getData = async ()=>{
    const res = await  axios.get("http://localhost:8000/api");
    setPosts(res.data);
  }

  return (
    <div className="feed">
      <QuoraBox />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
}

export default Feed;
