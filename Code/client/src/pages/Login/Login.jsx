import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UserContext } from "../../context/userContext";
import { api } from "../../config/api";
import "./Login.scss";

const defaultHabits = [
  {
    id: 1,
    title: "Walking down the street",
    checked: true,
    value: [
      { date: "2024-04-01", count: 9 },
      { date: "2024-04-05", count: 4 },
      { date: "2024-04-01", count: 2 },
    ],
  },
  {
    id: 2,
    title: "Creating Quiet Time",
    checked: true,
    value: [
      { date: "2024-04-01", count: 9 },
      { date: "2024-04-05", count: 4 },
      { date: "2024-04-01", count: 2 },
    ],
  },
  {
    id: 3,
    title: "Enjoying Food Mindfully",
    checked: true,
    value: [
      { date: "2024-04-01", count: 9 },
      { date: "2024-04-04", count: 4 },
      { date: "2024-04-01", count: 2 },
    ],
  },
  {
    id: 4,
    title: "The Three-Minute Breathing Space",
    checked: true,
    value: [
      { date: "2024-04-01", count: 9 },
      { date: "2024-04-05", count: 4 },
      { date: "2024-04-01", count: 2 },
    ],
  },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo, setHabits } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post(
        "/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      if (result.status === 200) {
        setUserInfo(result.data);
        setHabits(result.data.heatmap);
        enqueueSnackbar(`Hello ${username}`, {
          variant: "success",
          autoHideDuration: 2000,
        });

        setTimeout(() => {
          navigate("/habit");
        }, 2000);
      }
    } catch (err) {
      if (err.response.status === 401) {
        enqueueSnackbar(`Invalid credential`, {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
    }
  };

  return (
    <div className="app__login">
      <div className="app__login-container">
        <h1>Login</h1>
        <form className="app__login-form">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
