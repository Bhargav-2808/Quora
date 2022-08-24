import axios from "axios";
import { setfeedList, setPaperList } from "../actions/feed.action";
import {getPapers} from '../../service/paper.service' 

//closure for feedData
export const fetchFeedList = () => {
  return (dispatch) => {
    return axios
      .get("http://localhost:8000/api")
      .then((data) => {
        dispatch(setfeedList(data || []));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//closure for Paper Data
export const fetchPaperList = () => {
  return (dispatch) => {
    return getPapers()
      .then((data) => {
        console.log(data);
        dispatch(setPaperList(data || []));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
