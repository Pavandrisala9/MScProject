import { createContext, useState, useEffect } from "react";
import { api } from "./../config/api";
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [habits, setHabits] = useState([
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
  ]);
  const getUser = async () => {
    try {
      const result = await api("/login");
      const users = result.data.result;

      const currentUser = users.find((users) => users._id == userInfo.id);

      return currentUser;
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userInfo);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, habits, setHabits, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
