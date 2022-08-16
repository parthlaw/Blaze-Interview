import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [times, setTimes] = useState([]);
  const [hours, setHours] = useState(0);
  const onFreeTimeClick = async () => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    const res = await fetch("http://localhost:8000/calander/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, refresh }),
    });
    const response = await res.json();
    console.log(response);
    setTimes(response.data);
  };
  const onHourTimeClick = async () => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    const res = await fetch(`http://localhost:8000/calander/list?hours=${hours}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, refresh }),
    });
    const response = await res.json();
    console.log(response);
    setTimes(response.data);
  };
  return (
    <div>
      <button onClick={onFreeTimeClick}>Get All Free Time</button>
      <input
        type="number"
        name="hours"
        onChange={(e) => {
          setHours(e.target.value);
        }}
        placeholder="Insert Hours"
      />
      <button onClick={onHourTimeClick}>Get Time By Hours</button>
      {times && times.length ? (
        times.map((time, i) => (
            <div key={i}>
              Start Time:{time.start}
              End Time: {time.end}
              <br/>
            </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
