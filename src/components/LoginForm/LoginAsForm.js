import { Card } from "react-bootstrap";
import Link from "next/link";
function LoginAsForm({ nextStep, nextStepForPatient }) {
  return (
    <Card
      style={{
        borderRadius: "16px",
        maxWidth: "30rem",
        padding: "2rem",
        margin: "0 auto",
        backgroundColor: "#FFF5F5",
      }}
    >
      <h3 className="text-center font-weight-bold mb-5">login as? </h3>
      <div className="col-md-12 flex-wrap px-0 signUpPerson d-flex justify-content-between">
        <div className="doctorPerson col-md-5" onClick={nextStep}>
          <img src="/images/femaledoc.svg" alt="#" className="img-fluid" />
          <h3 className="personName">
            Doctor <br /> /Physician
          </h3>
        </div>
        <div className="doctorPerson col-md-5" onClick={nextStepForPatient}>
          <img src="/images/maledoc.svg" alt="#" className="img-fluid" />
          <h3 className="personName">
            Patient <br />
            /Others
          </h3>
        </div>
      </div>
      <div className="signUpDetailsText p-3">
        <p>
          If you Select “Doctor”, you will need to be verified by the system.
          However if you’re not a Doctor, Select “Patient”.{" "}
          <Link href="/">
            <a>Learn More</a>
          </Link>
        </p>
      </div>

      <div className="mt-5 loginFormFooter">
        <p className="text-center m-0 text-decoration-none">No account ?</p>
        <p className="text-center">
          <Link href="/sign-up">
            <a>Create Account</a>
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default LoginAsForm;
