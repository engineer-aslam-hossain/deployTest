import { useState } from "react";
import DoctorLoginForm from "./DoctorLoginForm";
import LoginAsForm from "./LoginAsForm";
import LoginForm from "./LoginForm";

const LoginRouteForm = () => {
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
    const newUser = { ...loginInfo };
    newUser[e.target.name] = e.target.value;
    setLoginInfo(newUser);
  };
  console.log(loginInfo);

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
        />
      );
    case 3:
      return (
        <LoginForm
          inputChange={inputChange}
          values={loginInfo}
          setLoginInfo={setLoginInfo}
        />
      );
  }
};

export default LoginRouteForm;
