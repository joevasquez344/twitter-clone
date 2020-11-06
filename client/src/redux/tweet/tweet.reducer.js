import { GET_TWEETS } from "./tweet.types";

const initialState = {
  tweets: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TWEETS:
      return {
        ...state,
        tweets: payload,
      };
    default:
      return state;
  }
};
