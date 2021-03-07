import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import DaktarContext from "../components/Context/Context";
import DoctorProfile from "../components/DoctorProfile/DoctorProfile";
import PatientProfile from "../components/PatientProfile/PatientProfile";
import Custom404 from "../pages/404";
import { useRouter } from "next/router";

const profile = () => {
  const { loggedInUser } = useContext(DaktarContext);
  const router = useRouter();

  if (loggedInUser.success === "no") {
    router.push("/Login");
    return (
      <section className="profile">
        <div className="d-flex justify-content-center align-items-center h-50">
          <Spinner animation="border" />
        </div>
      </section>
    );
  } else {
    return (
      <section className="profile">
        {loggedInUser.user_type === "DOCTOR" ? (
          <DoctorProfile />
        ) : loggedInUser.user_type === "USER" ? (
          <PatientProfile />
        ) : (
          <div className="d-flex justify-content-center align-items-center h-50">
            <Spinner animation="border" />
          </div>
        )}
      </section>
    );
  }
};

export default profile;
