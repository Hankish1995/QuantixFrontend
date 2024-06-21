import { useDispatch } from "react-redux";
import { SignupActions } from "../../Store/AuthSlice/AuthSlice";
import { loginActions } from "../../Store/AuthSlice/LoginSlice";

export const UseSignUp = () => {
  const dispatch = useDispatch();

  return (username, email, password) => {

    dispatch(SignupActions({ username, email, password }));

  };
};


export const UseLogin = () => {
    const dispatch = useDispatch();
  
    return ( email, password) => {
      
      dispatch(loginActions({ email, password }));
  
    };
  };

