import { FEED_LIST, PAPER_LIST } from "../actionTypes";

const intitalstate = {
  feedData: [],
  feedLoader: true,
  paperData: [],
  paperLoader: true,
  search: "",
};

// export const searchReducer = (state=intitalstate,action)=>{

// }
export const feedReducer = (state = intitalstate, action) => {
  switch (action.type) {
    case FEED_LIST: {
      return {
        ...state,
        feedData: action.payload,
        feedLoader: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const paperReducer = (state = intitalstate, action) => {
  switch (action?.type) {
    case PAPER_LIST: {
      return {
        ...state,
        paperData: action.payload,
        paperLoader: false,
      };
    }
    default: {
      return state;
    }
  }
};
