import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { FaFire } from "react-icons/fa";
import "./Heatmap.scss";
import { api } from "../../config/api";

const Heatmap = () => {
  const { id } = useParams();
  const { habits, setHabits, userInfo } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  const handleClick = async () => {
    setChecked(true);
    const newDate = new Date();

    // const completeTask = {
    //   date: `${newDate.getFullYear()}-${
    //     newDate.getMonth() + 1
    //   }-${newDate.getDate()}`,
    //   count: 1,
    // };

    const completeTask = {
      date: newDate.toISOString().split("T")[0],
      count: 1,
    };
    const oldData = habits.filter((habit) => habit.id != id);
    const currentHabit = habits.find((habit) => habit.id == id);
    currentHabit.value = [...currentHabit.value, completeTask];

    const newData = [...oldData, currentHabit].sort((a, b) => a.id - b.id);

    setHabits(newData);

    await api.post(
      "/habits/" + userInfo.id,
      {
        habits: newData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(habits);
  };

  console.log(habits);

  return (
    <div className="app__heatmap">
      <div className="app__heatmap-text">
        <h1>{habits[id - 1].title}</h1>

        <p>
          <input type="checkbox" onChange={handleClick} checked={checked} />{" "}
          Completed todays Task
        </p>

        <div className="app__totalPoints">
          Habit Point <FaFire /> {habits[id - 1].value.length}
        </div>
      </div>
      <div className="app__heatmap-container">
        <CalendarHeatmap
          startDate={new Date("2024-04-01")}
          endDate={new Date("2024-04-14")}
          values={habits[id - 1].value}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
      </div>
    </div>
  );
};

export default Heatmap;

//
