import { useState } from "react";
import PatientRequiredForm from "../PatientForm/RequiredForm";
import PatientSkipForm from "../PatientForm/SkipForm";
import SignUpAs from "../SignUpForm/SignUpAs";
import RequiredForm from "./RequiredForm";
import SkipForm from "./SkipForm";

const DoctorForm = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    // fullname: "",
    // email: "",
    // phone_number: "",
    // mobile_bank: "NAGAD",
    // // mobile_bank_no: "",
    // bmdc_reg: "",
    // password: "",
    // confirm_password: "",
    // gender: "",
    // nid_no: "",
    // birth_date: "",
    // address: "",
    // step: 1,
  });
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const nextStepForPatient = () => {
    setStep(step + 3);
  };

  const inputChange = (e) => {
    e.preventDefault();
    let isInputValid;

    if (e.target.name === "bmdc_reg") {
      isInputValid = true;
    }
    if (e.target.name === "nid") {
      isInputValid = true;
    }
    if (e.target.name === "date_of_birth") {
      isInputValid = true;
    }
    if (e.target.name === "number") {
      const number = e.target.value.length > 10 ? e.target.value : "";
      !number &&
        document.querySelector(".number").style.setProperty("display", "block");
      const value = e.target.value;
      setDoctorInfo({
        ...doctorInfo,
        mobile_banking_info: {
          ...doctorInfo.mobile_banking_info,
          number: value,
        },
      });
    }

    if (e.target.name === "fullname") {
      const nameValidation = /^([a-zA-Z]{3,30}\s*)+/;
      isInputValid = nameValidation.test(e.target.value);

      !isInputValid &&
        document.querySelector(".name").style.setProperty("display", "block");
    }
    if (e.target.name === "phone_number") {
      isInputValid = e.target.value.length > 10 ? e.target.value : "";
      !isInputValid &&
        document
          .querySelector(".phone_number")
          .style.setProperty("display", "block");
    }
    if (e.target.name === "mobile_banking_number") {
      isInputValid = e.target.value.length > 10 ? e.target.value : "";
      !isInputValid &&
        document
          .querySelector(".mobile_banking_number")
          .style.setProperty("display", "block");
    }
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
      const newUser = { ...doctorInfo };
      newUser[e.target.name] = e.target.value;
      setDoctorInfo(newUser);
    }
  };
  console.log(doctorInfo);

  switch (step) {
    case 1:
      return (
        <SignUpAs
          nextStep={nextStep}
          nextStepForPatient={nextStepForPatient}
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
    case 2:
      return (
        <RequiredForm
          nextStep={nextStep}
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
    case 3:
      return (
        <SkipForm
          nextStep={nextStep}
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
    case 4:
      return (
        <PatientRequiredForm
          nextStep={nextStep}
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
    case 5:
      return (
        <PatientSkipForm
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
  }
};

export default DoctorForm;
