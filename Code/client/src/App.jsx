import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Home, Layout, Login, Register, Habit, DashBoard } from "./pages";
import { Heatmap } from "./components";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <div className="app">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/heatmap/:id" element={<Heatmap />} />
            <Route path="/habit" element={<Habit />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
