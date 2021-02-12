import { useContext } from "react";
import DaktarContext from "../components/Context/Context";
import DoctorProfile from "../components/DoctorProfile/DoctorProfile";
import PatientProfile from "../components/PatientProfile/PatientProfile";
import Custom404 from "../pages/404";
const profile = () => {
  const { loggedInUser } = useContext(DaktarContext);
  console.log(loggedInUser);
  return (
    <section className="profile">
      {loggedInUser ? (
        loggedInUser.user_type === "DOCTOR" ? (
          <DoctorProfile />
        ) : (
          <PatientProfile />
        )
      ) : (
        <Spinner animation="border" />
      )}
    </section>
  );
};

export default profile;
