import { FEED_LIST } from "../actionTypes"

const intitalstate ={
    feed:[],
    feeLoader:true,
}


export const feedReducer =(state=intitalstate,action)=>{
    switch(action.type){
        case FEED_LIST:{
            return {
                ...state,
                feedData:action.payload,
                feeLoader:false,
            };
        }
        default : {
          return state;
        }
    }
}