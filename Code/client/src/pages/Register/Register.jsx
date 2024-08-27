import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import { api } from "../../config/api";
import "./Register.scss";
import { useSnackbar } from "notistack";

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

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { habits } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/register", {
        username: username,
        password: password,
        heatmap: defaultHabits,
      });
      if (result.status === 200) {
        enqueueSnackbar(`User Register Successfully`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/login");
      }
    } catch (err) {
      enqueueSnackbar(`Error`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <div className="app__register">
      <div className="app__register-container">
        <h1>Register</h1>
        <form className="app__register-form" onSubmit={handleSubmit}>
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
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
