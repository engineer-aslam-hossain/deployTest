import { Card } from "react-bootstrap";
import Link from "next/link";
function SignUpAs({ nextStep, nextStepForPatient }) {
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
      <h3 className="text-center font-weight-bold mb-5">Sign Up as? </h3>
      <div className="signUpPerson d-flex flex-wrap justify-content-between">
        <div className="doctorPerson col-md-5" onClick={nextStep}>
          <img src="/images/femaledoc.svg" alt="#" className="img-fluid" />
          <h3 className="personName">Doctor</h3>
        </div>
        <div className="doctorPerson col-md-5" onClick={nextStepForPatient}>
          <img src="/images/maledoc.svg" alt="#" className="img-fluid" />
          <h3 className="personName">Patient</h3>
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
        <p className="text-center m-0 text-decoration-none">
          Already have an account ?
        </p>
        <p className="text-center">
          <Link href="/Login">
            <a>Login Instead</a>
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default SignUpAs;
