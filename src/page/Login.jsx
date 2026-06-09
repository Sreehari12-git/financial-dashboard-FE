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

  const [loading, setLoading] = useState(false);
  const login = async () => {
    try {
      setLoading(true);
        // const { token, refreshToken } = await loginUser(email, password);
        // // Store tokens in cookies (client‑side)
        // const tokenExpires = new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString();
        // document.cookie = `token=${token}; expires=${tokenExpires}; path=/; SameSite=Strict`;
        // if (refreshToken) {
        //   const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
        //   document.cookie = `refreshToken=${refreshToken}; expires=${refreshExpires}; path=/; SameSite=Strict`;
        // }
      navigate("/family-tree");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

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
