import React from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <section className="h-100 d-flex flex-column justify-content-center">
      <FontAwesomeIcon
        icon="check-circle"
        size="4x"
        className="text-success mx-auto"
      />
      <p className="text-success text-center lead mt-2">
        Successfully created account
      </p>

      <Link to="/login" className="btn btn-primary w-50 mx-auto">
        Go to login
      </Link>
    </section>
  );
};

export default Success;
