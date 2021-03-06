import { useContext, useEffect, useRef, useState } from "react";
import DaktarContext from "../Context/Context";
import DoctorLoginForm from "./DoctorLoginForm";
import LoginAsForm from "./LoginAsForm";
import LoginForm from "./LoginForm";

const LoginRouteForm = () => {
  const { loggedInUser } = useContext(DaktarContext);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const nextStepForPatient = () => {
    setStep(step + 2);
  };

  const inputChange = (e) => {
    e.preventDefault();
    let isInputValid;

    if (e.target.name === "email") {
      const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isInputValid = validation.test(e.target.value);
      !isInputValid &&
        document.querySelector(".email").style.setProperty("display", "block");
    }
    if (e.target.name === "password") {
      isInputValid = true;
    }
    if (isInputValid) {
      const newUser = { ...loginInfo };
      newUser[e.target.name] = e.target.value;
      setLoginInfo(newUser);
    }
  };
  // console.log(loginInfo);

  const [show, setShow] = useState(false);
  const target = useRef(null);
  useEffect(() => {
    loggedInUser.success === "no" && setShow(true);
  }, [loggedInUser]);

  switch (step) {
    case 1:
      return (
        <LoginAsForm
          nextStep={nextStep}
          nextStepForPatient={nextStepForPatient}
        />
      );
    case 2:
      return (
        <DoctorLoginForm
          inputChange={inputChange}
          values={loginInfo}
          setLoginInfo={setLoginInfo}
          show={show}
          target={target}
        />
      );
    case 3:
      return (
        <LoginForm
          inputChange={inputChange}
          values={loginInfo}
          setLoginInfo={setLoginInfo}
          show={show}
          target={target}
        />
      );
  }
};

export default LoginRouteForm;
