import React, { useContext, useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedList } from "../app/thunk-async";
import searchContext from "../app/context/searchContext";
// import { Search } from "@material-ui/icons";


function Feed() {
  const feedlist = useSelector((state) => state.feed.feedData);
  const [filterFeedList,setFilterFeedList] = useState([]);

  const {search} = useContext(searchContext);


  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchFeedList());
    setFilterFeedList(feedlist?.data)
  }, [feedlist]);

  useEffect(() => {
    if (search) {
      let filterfeed = feedlist?.data?.filter(
        (item) =>
          item?.questionName &&
          item?.questionName
            ?.toLowerCase()
            ?.includes(search.toLowerCase()),
      );
      setFilterFeedList(filterfeed);
    } else {
      setFilterFeedList(feedlist?.data);
    }
  }, [search]);
  console.log(filterFeedList);
  return (
    <div className="feed">
      {/* <div className="qHeader__input">
        <Search />
        <input
          type="text"
          value={search}
          placeholder="Search questions"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}
      <QuoraBox />
      {filterFeedList?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

export default Feed;
