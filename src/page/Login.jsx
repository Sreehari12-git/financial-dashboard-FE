import { useNavigate } from "react-router-dom";
import "./Login.css"
import { useState } from "react";
import { loginUser } from "../api/auth";
import Register from "../components/Register";

const Login = () => {

  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const login = async() => {
    try {
      await loginUser(email,password);
      navigate("/family-tree");

    }
     catch(error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" onClick={login}>Login</button>
        <button type="submit" onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Login;