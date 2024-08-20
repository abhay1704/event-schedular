// src/components/Signin.js
import React, { useContext, useState } from "react";
// import { auth } from "../firebase"; // Assuming you have Firebase set up
// import { signInWithEmailAndPassword } from "firebase/auth";
import "./SigninSignup.css";
import { signInByEmailPwd } from "../../database/authenticate";
import AuthContext from "../../context/loginStatus";
import { useNavigate } from "react-router-dom";
import { Notification } from "../Shared";

const Signin = () => {
  const [email, setEmail] = useState("abhay@xmail.com");
  const [password, setPassword] = useState("testing");
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState();

  const handleSignin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const result = await signInByEmailPwd(email, password);
      if (!result.success) {
        setNotification({
          message: result.errorMessage,
          type: "error",
        });
        return;
      }
      login(result);
      navigate("/");
    } catch (error) {
      console.error(error);
      setNotification({
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper light">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={handleSignin}>
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
            <button type="submit">Sign In</button>
          </form>
          <button className="google-btn">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google icon"
            />
            Continue with Google
          </button>
          <a href="/signup">Don't have an account? Sign Up</a>
        </div>
      )}

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

export default Signin;
