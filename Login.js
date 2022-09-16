import React, { useEffect, useState, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT-BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT-BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "INPUT-BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });
  const ctx = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("http request");
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid);
    }, 500);
    return () => {
      console.log("cleaned");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER-INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     enteredCollege.trim().length > 2
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER-INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     enteredCollege.trim().length > 2
    // );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER-INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     event.target.value.trim().length > 2
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT-BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT-BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT-BLUR" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="college"
          label="college"
          type="college"
          isValid={collegeIsValid}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
