"use client";
import React, { useEffect } from "react";
import Link from "next/link";
//import { createNewUser } from "../../actions/actions"
import { AuthenticateUser } from "../../actions/actions";
import { login } from "../../lib";
import { useFormState } from "react-dom";
//import { Link, Redirect, withRouter } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
//import logoImg from "../../../assets/images/logoPlaceholder.jpg";
//import Image from "next/image";
import redX from "../images/redXmark.jpg";
import greenCheck from "../images/greenCheck.png";
//import tinyMan from "../images/tinyManLogo.png";
//import lock from "../images/lockIcon.png";
import "../css/login.css";
import {
  Card,
  Logo,
  Form,
  Button,
  ErrorMsg,
  XorCheckIcon,
  LoginWrapper,
  InputIcon,
  LogoWrapper,
  H2,
  Label,
  ErrorWrapper,
} from "./AuthForm";

const initialState = {
  message: "",
};

///////////////////////////////////  LOG_IN_PAGE //////////////////////////////
export default function Login(props, { error, reset }) {
  //console.log("==============Login===============");
  //console.log("==============Login Props===============", props);

  const [data, formAction] = useFormState(login, initialState);

  const [state2, setState2] = React.useState({
    email: "",
    emailFieldActive: true,
    password: "",
    passwordFieldActive: true,
    rememberMe: false,
    status: "",
    errors: {},
  });

  // useEffect(() => {
  //   // Optionally log the error to an error reporting service
  //   console.error("errorr");
  //   // console.log("ERRORR", error);
  // }, [error]);

  const [onHover, setOnHover] = React.useState(false);

  var linkStyle;

  //const navigate = useNavigate();

  function toggleHoverEnter() {
    setOnHover(true);
  }
  function toggleHoverLeave() {
    setOnHover(false);
  }

  // to activate the input field while typing
  function activateField(e) {
    setState2({
      ...state2,
      [e.target.name + "FieldActive"]: true,
    });
  }

  // to deactivate input only if it's empty
  function disableField(e) {
    if (e.target.value === "") {
      setState2({
        ...state2,
        [e.target.name + "FieldActive"]: false,
      });
    }
  }

  function closeLoginWindow() {
    props.setOpenLoginMenu(!props.openLoginMenu);
    // props.set_login_clicked("false");
    // setState2({
    //   ...state2,
    //   status: "",
    //   errors: {},
    // });
  }

  ///////////////////////////////////  HANDLE_SUBMIT ///////////////////////////
  function handleSubmit(event) {
    ////send info into backend to Log IN/////
    event.preventDefault();
    //const mode = process.env.NODE_ENV =="development" ? "http://127.0.0.1:3000" : "https://floridablaze.io"
    // // // axios
    // // //   .post(
    // // //     "/sessions",
    // // //     {
    // // //       user: {
    // // //         email: state.email,
    // // //         password: state.password,
    // // //         rememberMe: state.rememberMe,
    // // //       },
    // // //     },
    // // //     { withCredentials: true }
    // // //   )
    // // //   .then((response) => {
    // // //     console.log("Log in submit Response", response);

    // // //     if (response.data.status == "green") {
    // // //       setState({
    // // //         ...state,
    // // //         status: response.data.status,
    // // //         errors: response.data.error,
    // // //       });

    // // //       setTimeout(function () {
    // // //         props.set_login_clicked("false");
    // // //       }, 3000);

    // // //       props.handleSuccessfulAuth(response.data);

    // // //       //props.history.push("/")
    // // //     } else {
    // // //       setState({
    // // //         ...state,
    // // //         status: response.data.status,
    // // //         errors: response.data.error,
    // // //       });
    // // //     }
    // // //   })
    // // //   .catch((error) => {
    // // //     console.log("LoginErrors", error);

    // // //     setState({
    // // //       ...state,
    // // //       status: "pink",
    // // //       errors: { auth: [error] },
    // // //     });
    // // //   });
  }

  function goToResend() {
    //navigate("/resend");
  }

  ///////////////////////////////////  HANDLE_CHANGE /////////////////////////////
  function handleChange(event) {
    const value = event.target.value;
    console.log("#################");
    console.log("name", event.target.name);

    console.log("value", value);
    console.log("#################");

    if (event.target.name == "remember") {
      setState2((prevState) => ({
        ...prevState,
        rememberMe: !prevState.rememberMe,
      }));
    } else {
      setState2({
        ...state2,
        [event.target.name]: value,
      });
    }
    //activateField(event);
  }

  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  // // //let errorMessages = [];

  // // //   if (state.errors) {
  // // //     if (state.errors.success) {
  // // //       errorMessages.push(<ErrorMsg> {state.errors.success[0]} </ErrorMsg>);
  // // //     }

  // // //     if (state.errors.auth) {
  // // //       // errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>);

  // // //       if (state.status == "orange") {
  // // //         errorMessages.push(
  // // //           <>
  // // //             <ErrorMsg> {state.errors.auth[0]} </ErrorMsg>
  // // //             <span
  // // //               style={{
  // // //                 color: "blue",
  // // //                 cursor: "pointer",
  // // //                 textDecoration: "underline",
  // // //                 fontSize: "12px",
  // // //                 padding: "5px 0px 9px 3px",
  // // //               }}
  // // //               onClick={goToResend}
  // // //             >
  // // //               resend link
  // // //             </span>
  // // //           </>
  // // //         );
  // // //       } else {
  // // //         errorMessages.push(<ErrorMsg> {state.errors.auth[0]} </ErrorMsg>);
  // // //       }
  // // //     }

  // // //     if (state.errors.password) {
  // // //       errorMessages.push(
  // // //         <ErrorMsg> {"Password " + state.errors.password[0]} </ErrorMsg>
  // // //       );
  // // //     }

  // // //     if (state.errors.password_confirmation) {
  // // //       errorMessages.push(
  // // //         <ErrorMsg>
  // // //           {" "}
  // // //           {"Confirmation " + state.errors.password_confirmation[0]}{" "}
  // // //         </ErrorMsg>
  // // //       );
  // // //     }

  // // //     if (state.errors.green) {
  // // //       errorMessages.push(<ErrorMsg> {state.errors.green} </ErrorMsg>);
  // // //     }
  // // //   }

  if (onHover) {
    linkStyle = {
      border: "1px solid #fcacac",
      //borderRadius: "20px",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  } else {
    linkStyle = {
      border: "1px solid white",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  }

  /////////////////////////////////// JSX /////////////////////////////////////////
  var linkStyle;
  if (onHover) {
    linkStyle = {
      border: "1px solid #fcacac",
      //borderRadius: "20px",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  } else {
    linkStyle = {
      border: "1px solid white",
      transition: "all .4s ease-out",
      fontSize: ".9em",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
      textDecoration: "none",
      padding: "6px",
    };
  }

  return (
    <div
      className={`LoginWrapperNew ${
        props.openLoginMenu ? " top-0" : "-top-[555px]"
      }`}
    >
      <div className="CardNew">
        <div className="LogoWrapperNew">
          <div
            onClick={closeLoginWindow}
            style={linkStyle}
            onMouseEnter={toggleHoverEnter}
            onMouseLeave={toggleHoverLeave}
            //to="#"
          >
            &#10060;
          </div>
        </div>

        <Form
          //   action={async (formData) => {
          //     await formAction(formData);
          //   }}
          action={(formData) => formAction(formData)}
        >
          <div className="FormItem">
            <Label className={state2.emailFieldActive ? "field-active" : ""}>
              email
            </Label>
            <InputIcon
              style={{ backgroundImage: `url('/tinyManLogo.png')` }}
            ></InputIcon>

            <input
              className="Input"
              name="email"
              type="email"
              value={state2.email}
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              required
            />
          </div>

          <div className="FormItem">
            <Label className={state2.passwordFieldActive ? "field-active" : ""}>
              password
            </Label>
            <InputIcon
              style={{ backgroundImage: `url('/lockIcon.png')` }}
            ></InputIcon>

            <input
              className="Input"
              name="password"
              type="password"
              value={state2.password}
              onChange={handleChange}
              onFocus={activateField}
              onBlur={disableField}
              required
            />
          </div>

          <div className="FormItem">
            <input
              name="remember"
              //value={state.rememberMe}
              type="checkbox"
              onChange={handleChange}
            />

            <label
              style={{
                marginLeft: "10px",
                fontSize: ".8em",
              }}
            >
              remember me:
            </label>
          </div>

          {/* <%= check_box_tag :remember_me, 1, params[:remember_me] %>
          <%= label_tag :remember_me %> */}

          <Button type="submit">Log In</Button>
        </Form>

        <ErrorWrapper>
          <XorCheckIcon
            //status={state.status}
            style={{ display: data?.success != undefined ? "initial" : "none" }}
            src={data?.success ? greenCheck.src : redX.src}
            alt=""
          />
          {/* <h1 style={{ display: "none" }}>ss={state2.status}</h1> */}
          {data?.message}
        </ErrorWrapper>
      </div>

      {/* <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/signup">Dont have an account? </a><br/>
      <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/forgot">Forgot password?? </a><br/>*/}
      {/* <a style={{fontSize: ".5em", textDecoration: "underline"}} href="/resend">Resend Confirmation Email </a><br/>  */}
      <Link style={{ textDecoration: "none", fontSize: "12px" }} href="/forgot">
        Forgot Password
      </Link>
    </div>
  );
}
