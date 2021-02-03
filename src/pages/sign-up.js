import SignUpAs from "../components/SignUpForm/SignUpAs";
import HomepageAdd from "../components/HomepageAdd/HomepageAdd";
import FindAsGuest from "../components/FindAsGuest/FindAsGuest";
import DoctorForm from "../components/DoctorForm/DoctorForm";

function SignUp() {
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="row position-relative">
            <div className="col-md-8 loginPageLeft d-flex flex-column justify-content-center align-items-center">
              <div className="LoginPageLeftSection position-relative">
                <h1 className="loginPageTitle">
                  Important Text or Catch Phrase
                </h1>
                <p className="loginPageText">
                  Some Subtitle Text.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elitess
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <DoctorForm />
            </div>
          </div>
        </div>
      </section>
      <HomepageAdd />
      <FindAsGuest />
    </>
  );
}

export default SignUp;
