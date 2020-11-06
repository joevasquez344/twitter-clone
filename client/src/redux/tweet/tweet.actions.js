import { GET_TWEETS } from "./tweet.types";
import firebase from "../../firebase/config";

export const getTweets = () => async (dispatch) => {
  const data = await firebase.firestore().collection("tweets").get();

  const tweets = [];

  data.docs.map((doc) => tweets.push(doc.data()));


  dispatch({
    type: GET_TWEETS,
    payload: tweets,
  });
};
