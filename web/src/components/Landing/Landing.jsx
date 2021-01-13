import React, { useContext, useEffect } from "react";
import contactIllustration from "../../assets/contact-illustration.png";
// Hooks
import { useHistory } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/authContext.jsx";

const Landing = () => {
  const history = useHistory();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/dashboard");
    }
  }, []);

  const handleRegister = () => {
    history.push("/register");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <section className="container-fluid h-100 d-lg-flex justify-content-center">
      <div className="row align-self-lg-center no-gutters">
        <figure className="col-12 col-sm-9 col-md-7 col-lg-6  mt-1 mt-xl-2 mx-auto">
          <img src={contactIllustration} alt="contact" className="img-fluid" />
        </figure>

        <div className="col-12 col-sm-10 col-lg-6 mt-xl-2 mx-auto">
          <h1 className="h3 text-center text-primary mt-xl-1">Contacts</h1>
          <p className="text-center">We help keeping your contacts together</p>

          <div className="row">
            <div className="col-10 col-sm-8 col-md-6 col-lg-7 col-xl-5 mt-3 mt-md-5 mx-auto">
              <button
                onClick={handleRegister}
                className="btn btn-outline-primary btn-block mt-xl-1"
              >
                Register
              </button>
              <p className="text-center mt-3">Or</p>
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-block mt-3"
              >
                Login
              </button>
            </div>
          </div>

          <p className="text-center mt-4 mt-lg-5">
            Don't have an account? Click on <strong>register</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
