import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiCirclePlus } from "react-icons/ci";
import "./Habit.scss";
import { UserContext } from "../../context/userContext";
import { api } from "../../config/api";

const Habit = () => {
  const [toogle, setToogle] = useState(false);
  const [input, setInput] = useState("");
  const { habits, setHabits, getUser } = useContext(UserContext);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser();
      setHabits[currentUser.habits];
    };
    fetchData();
  }, []);
  const handleInput = async (e) => {
    e.preventDefault();

    const newHabit = {
      id: habits[habits.length - 1].id ? habits[habits.length - 1].id + 1 : 1,
      title: input,
      checked: true,
      value: [],
    };
    const result = await api.post("/habits", newHabit);

    setHabits([...habits, newHabit]);
    setToogle(false);
    console.log("hello");
  };

  return (
    <div className="app__habits">
      <div className="app__habits-container">
        <h1>Track Your MindFul Habits</h1>
        {habits.map((habit) => (
          <div
            className="app__habit"
            key={habit.id}
            onClick={() => {
              navigation(`/heatmap/${habit.id}`);
            }}
          >
            <p>{habit.title}</p>
          </div>
        ))}
        <div className="app__habit">
          <p>{!toogle && <CiCirclePlus onClick={() => setToogle(true)} />}</p>
          {toogle && (
            <form onSubmit={handleInput}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Habit;
