import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      const FBidToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBidToken", `Bearer ${res.data.token}`);
      axios.defaults.headers.common["Authorization"] = FBidToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};
