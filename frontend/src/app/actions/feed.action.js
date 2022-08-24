import { FEED_LIST, PAPER_LIST } from "../actionTypes";

export const setfeedList = (data) => ({
  type: FEED_LIST,
  payload: data,
});


export const setPaperList = (data) =>({
  type:PAPER_LIST,
  payload:data
})