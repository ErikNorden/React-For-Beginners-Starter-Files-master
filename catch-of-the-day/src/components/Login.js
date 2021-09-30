import React from "react";
import PropTypes from "prop-types";

const Login = (props) => (
  <nav className="login">
    <h2>inventory login</h2>
    <p>sign in to manage your stores inventory.</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      {" "}
      Login with Github
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      {" "}
      Login with Github
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      {" "}
      Login with Github
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
