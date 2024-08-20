import React, { useContext, useState } from "react";
import { signUPByEmailPwd } from "../../database/authenticate";
import "./SigninSignup.css";
import AuthContext from "../../context/loginStatus";
import { useNavigate } from "react-router-dom";
import { Notification } from "../Shared";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotification({
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    console.log(email, password);
    const result = await signUPByEmailPwd(email, password);
    if (!result.success) {
      setNotification({
        message: result.errorMessage,
        type: "error",
      });
      return;
    }

    login(result);
    setIsLoading(false);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="wrapper light">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="wrapper light">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <button className="google-btn">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google icon"
          />
          Continue with Google
        </button>
        <a href="/signin">Already have an account? Sign In</a>
      </div>
      {notification && <Notification {...notification} />}
    </div>
  );
};

export default Signup;
