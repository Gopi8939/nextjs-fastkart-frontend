import SimpleInputField from "@/Components/Common/InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { Col, Input, Label } from "reactstrap";
import SettingContext from "@/Helper/SettingContext";
import axios from "axios";
import Cookies from "js-cookie";
import InputField from "@/Components/Common/InputFields/InputField";
import AccountContext from "@/Helper/AccountContext";
import CompareContext from "@/Helper/CompareContext";
import FormBtn from "@/Components/Common/FormBtn";

export default function Login() {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { settingData } = useContext(SettingContext);
  const reCaptchaRef = useRef();

  const { refetch } = useContext(AccountContext);
  const { refetch: compareRefetch } = useContext(CompareContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");


    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (email && password) {



    try {

      
      const { data } = await axios.post(
        "https://testapis.aenow.online/api/login",
        { email, password }
      );

      if (data.success === true) {
        Cookies.set("uat", data?.access_token, {
          path: "/",
          expires: new Date(Date.now() + 24 * 60 * 6000),
        });
        const ISSERVER = typeof window === "undefined";
        if (typeof window !== "undefined") {
          Cookies.set("account", JSON.stringify(data));
          localStorage.setItem("account", JSON.stringify(data));
        }
        refetch();
        compareRefetch();

        window.location.replace(`/${i18Lang}/account/dashboard`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

  }
  };

  return (
    <div>
     
      <form className="row " onSubmit={handleSubmit}>
      <div  style={{  margin:'16px 0px' }}>
     <div style={{ position: "relative" }}>
          <Input
            type="text"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            style={{ border: "1px solid #ccc", padding: "18px 10px" ,marginTop:'12px'}}
          />
          <Label
            style={{
              position: "absolute",
              top: emailFocused || email ? "4px" : "18px",
              left: "10px",
              fontSize: emailFocused || email ? "12px" : " 16px",
              transition: "all 0.3s ease",
              pointerEvents: "none",
            }}

          
            for="email"
          >
            {t("Email")}
          </Label>
        </div>
  {emailError && <div style={{ color: "red",margin:'4px' }}>{emailError}</div>}

        </div>
      
      
        <div  style={{  margin:'16px 0px' }}>
    <div style={{ position: "relative" }}>
          <Input
            type="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}

            style={{ border: "1px solid #ccc", padding: "18px 10px" ,marginTop:'12px'}}

          />
          <Label
            style={{
              position: "absolute",
              top: passwordFocused || password  ? "4px" : "18px",
              left: "10px",
              fontSize: passwordFocused || password  ? "12px" : "16px  ",
              transition: "all 0.3s ease",
              pointerEvents: "none",
            }}

            
            for="password"
          >
            {t("Password")}
          </Label>
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}


        </div>
    
        <FormBtn
          title={t("LogIn")}
          classes={{ btnClass: "btn btn-animation w-100" }}
        />
      </form>
    </div>
  );
}
