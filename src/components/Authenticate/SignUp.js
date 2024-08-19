import React, { useContext, useState } from "react";
import { signUPByEmailPwd } from "../../database/authenticate";
import "./SigninSignup.css";
import AuthContext from "../../context/loginStatus";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(email, password);
    const result = await signUPByEmailPwd(email, password);
    if (!result.success) {
      alert("Unable to Signup, ", result.errorMessage);
      return;
    }

    login({ uid: result.uid, accessToken: result.accessToken });
    setIsLoading(false);
    navigate("/");
  };

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="wrapper">
      <div className="container light">
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
    </div>
  );
};

export default Signup;
