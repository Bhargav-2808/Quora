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
  const [filterFeedList, setFilterFeedList] = useState([]);

  const { search,categorySearch } = useContext(searchContext);

  const dispatch = useDispatch();

  useEffect(() => {
    setFilterFeedList(feedlist?.data);
  }, [feedlist]);
  
  useEffect(() => {
    dispatch(fetchFeedList());
  }, []);

  useEffect(() => {
 

    if (search) {
      let filterfeed = feedlist?.data?.filter(
        (item) =>
          item?.questionName &&
          item?.questionName?.toLowerCase()?.includes(search.toLowerCase())
      );
      setFilterFeedList(filterfeed);
    } else {
      setFilterFeedList(feedlist?.data);
    }
  }, [search]);

  useEffect(() => {
    if (categorySearch) {
      let filterfeed = feedlist?.data?.filter(
        (item) =>
          item?.category &&
          item?.category?.toLowerCase()?.includes(categorySearch.toLowerCase())
      );
      setFilterFeedList(filterfeed);
    } else {
      setFilterFeedList(feedlist?.data);
    }
  }, [categorySearch])
  
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
