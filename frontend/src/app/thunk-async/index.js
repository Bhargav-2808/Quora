import axios from "axios"
import { setfeedList } from "../actions/feed.action"

export const fetchFeedList=  ()=>{
    return function  (dispatch){
        return  axios.get("http://localhost:8000/api").then((data)=>{
            dispatch(setfeedList(data || []));
        })
        .catch((err)=>{
            console.log(err);
        })

    }
}