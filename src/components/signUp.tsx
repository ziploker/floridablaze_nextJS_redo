"use client";
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Image from "next/image";
import thebullet from "../images/thebullet.png";
import floridaMaskBig from "../images/floridaMaskBig1.png";
import "../css/signup.css";
import { createNewUser } from "../../actions/actions";
import { useFormState } from "react-dom";
import wleaf from "../images/wleafRed.jpg";

import {
  Card,
  Logo,
  Form,
  InputForSignup,
  ButtonForSignup,
  ErrorMsg,
  XorCheckIcon,
  LoginWrapper,
  InputIcon,
  LogoWrapper,
  H2,
  FormItem,
  FormItemSqueeze,
  Label,
  EmailLabel,
  ErrorWrapper,
} from "./AuthForm";

const formData = new FormData();

const initialState = {
  message: "",
};
///////////////////////////////////  SIGN_UP_PAGE //////////////////////////////

export default function Signup(props: any, ref: any) {
  console.log("==============Signup Section===============");
  console.log("============= Signup Section Props===============", props);

  const [data, formAction] = useFormState(createNewUser, initialState);

  const { section2ScrollToRef } = ref;

  const [mobile, setMobile] = useState(false);

  const [state, setState] = React.useState({
    full_name: "",
    full_nameFieldActive: false,

    email: "",
    emailFieldActive: false,

    password: "",
    passwordFieldActive: false,

    opt_in: false,

    status: "",

    ///showErrorBackground: "false",

    errors: {},
    color: "#45B5644",
    isBtnDisabled: false,
    showStatusSpinner: "false",
    waitMessage: "",
  });

  const validForm = () => {
    if (state.full_name) {
      return true;
    } else {
      return true;
    }
  };

  const handleChange = (e: any) => {
    const target = e.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log("TARGET_CHECKED " + target.checked.toString());
    console.log("target_name " + target.name.toString());
    console.log("value " + value.toString());
    //const value = target.type === 'checkbox' ? !event.target.checked : event.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  ////////////////////// Handlev Submit V2 //////////////////////////

  ///////////////////////////////////  SETUP ERRORMESSAGES //////////////////////
  let errorMessages = [];

  // to activate the input field while typing
  function activateField(e: any) {
    setState({
      ...state,
      [e.target.name + "FieldActive"]: true,
    });
  }

  // to deactivate input only if it's empty
  function disableField(e: any) {
    if (e.target.value === "") {
      setState({
        ...state,
        [e.target.name + "FieldActive"]: false,
      });
    }
  }

  const componentClicked = () => {
    console.log("clickedd");
  };

  ////const { height, width } = useWindowDimensions();

  return (
    <div
      className="SignupWrapper"
      ref={section2ScrollToRef}
      //////show_offer={props.show_offer}
      style={{
        backgroundImage: `url(${wleaf.src})`,
      }}
    >
      <div className="SignupMaskWrapper">
        <div className="SignupMaskImageContainer">
          <img
            className="SignupMaskImage"
            src={floridaMaskBig.src}
            //width={698}
            //height={644}
            alt=""
          />
        </div>

        <div className="BottomFiLL" />
      </div>

      <div className="LeftFiller" />
      <div className="RightFiller" />

      <div className="LeftSection">
        <h2>Sign Up!</h2>

        <div className="LoginCardWrapper">
          <div className="formWrapper LoginCard">
            <Form action={(formData) => formAction(formData)}>
              <FormItemSqueeze className="formItemSqueeze">
                <Label
                  className={state.full_nameFieldActive ? "field-active" : ""}
                >
                  {" "}
                  full name{" "}
                </Label>

                <InputForSignup
                  name="full_name"
                  type="text"
                  value={state.full_name}
                  onChange={handleChange}
                  onFocus={activateField}
                  onBlur={disableField}
                  required
                />
              </FormItemSqueeze>

              <FormItemSqueeze className="formItemSqueeze">
                <EmailLabel
                  className={state.emailFieldActive ? "field-active" : ""}
                >
                  email
                </EmailLabel>

                <InputForSignup
                  name="email"
                  type="email"
                  value={state.email}
                  onChange={handleChange}
                  onFocus={activateField}
                  onBlur={disableField}
                  required
                />
              </FormItemSqueeze>

              <FormItemSqueeze className="formItemSqueeze">
                <Label
                  className={state.passwordFieldActive ? "field-active" : ""}
                >
                  password
                </Label>

                <InputForSignup
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={state.password}
                  onChange={handleChange}
                  onFocus={activateField}
                  onBlur={disableField}
                  required
                />
              </FormItemSqueeze>

              {/* <div  style={{display: "flex", justifyContent: "center"}}>
	
	
<input
  name="opt_in" 
  type="checkbox" 
  id="opt_in"
  checked={state.opt_in}
	
  onChange={handleChange} 
	
/>
	

<h3 style={{marginLeft: "5px", fontSize: ".6em", color: "gray"}} htmlFor="opt_in" >Opt In to receive e-mails from FloridaBlaze </h3>

</div> */}

              <ButtonForSignup
                //className="formItemSqueeze"
                type="submit"
                disabled={state.isBtnDisabled}
              >
                GO!
              </ButtonForSignup>

              <div className="SocialMedia">
                <h3
                  style={{
                    color: "gray",
                    alignSelf: "center",
                    //////justifySelf: "center",
                  }}
                  ////////htmlFor="opt_in"
                >
                  {/* --- or ---{" "} */}
                </h3>

                {/* <GoogleLogin
						  render={(renderProps) => (
							  <button
								  className="loginBtn loginBtn--google"
								  onClick={renderProps.onClick}
								  disabled={renderProps.disabled}
							  >
								  Google
							  </button>
						  )}
						  buttonText="Login"
						  onSuccess={responseGoogle}
						  onFailure={responseGoogle}
						  cookiePolicy={"single_host_origin"}
					  /> */}

                {/* <FacebookLogin
	  appId="293426502140339"
	  autoLoad={false}
	  fields="name,email,picture"
	  onClick={componentClicked}
	  callback={responseFacebook}
	  cssClass="loginBtn loginBtn--facebook"
	  textButton="Facebook"
	/> */}
              </div>
            </Form>

            {/* <ErrorWrapper show_error_background={state.showErrorBackground}> */}
            <ErrorWrapper>
              {/* <Span wait_message={state.waitMessage}> {state.waitMessage}</Span> */}
              <h4 className="Span" style={{ whiteSpace: "pre" }}>
                {data?.message}
              </h4>
              <XorCheckIcon
                ////////status={state.status}
                style={{ display: state.status == "" ? "none" : "initial" }}
                ////////src={state.status === "green" ? greenCheck : redX}
                alt=""
              />
              <h1 style={{ display: "none" }}>ss={state.status}</h1>
              {/* {errorMessages} */}

              {/* <StatusSpinner show_status_spinner={state.showStatusSpinner}> */}
              <div className="StatusSpinner">
                {/* <Spinner name="wave" color="#56c5cc" /> */}
              </div>
            </ErrorWrapper>
          </div>
        </div>
      </div>
      <div className="LoginCardFillLeft" />
      <div className="LoginCardFillRight" />

      <div className="RightSection">
        <Image
          className="WeedBullet1"
          src={thebullet}
          width={21}
          height={25}
          alt=""
        />
        <h2 className="WeedBulletText1">Make Florida green.</h2>
        <Image
          className="WeedBullet2"
          src={thebullet}
          width={21}
          height={25}
          alt=""
        />
        <h2 className="WeedBulletText2"> Contact your state Reps. </h2>
        <Image
          className="WeedBullet3"
          src={thebullet}
          width={21}
          height={25}
          alt=""
        />
        <h2 className="WeedBulletText3">Marijuana local news.</h2>
        <Image
          className="WeedBullet4"
          src={thebullet}
          width={21}
          height={25}
          alt=""
        />
        <h2 className="WeedBulletText4">
          Stay up to date on latest State laws.
        </h2>
      </div>

      {/* <Spacer>
Contact Your State Representatives

</Spacer> */}
    </div>
  );
}
