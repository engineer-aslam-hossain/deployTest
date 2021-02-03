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
    const newUser = { ...doctorInfo };
    newUser[e.target.name] = e.target.value;
    setDoctorInfo(newUser);
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
          nextStep={nextStep}
          inputChange={inputChange}
          values={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      );
  }
};

export default DoctorForm;
