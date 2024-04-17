import "./App.css";
import React, { useState, useEffect } from "react";
import data from "../sample.json";

function App() {
  const [arrdata, setarrData] = useState([]);

  useEffect(() => {
    setarrData(data);
    console.log(data);
  }, []);

  return (
    <div className="App">
      <TimelineChart arrdata={arrdata} />
    </div>
  );
}

function TimelineChart({ arrdata }) {
  return (
    <div className="main-div">
      <div class="filter">
        <div>1 hr</div>
        <div>8 hr</div>
        <div>24 hr</div>
        <div>
          <img
            className="menu"
            src="https://cdn.iconscout.com/icon/free/png-512/free-hamburger-menu-462145.png?f=webp&w=256"
          />
        </div>
      </div>
      <div className="status">
        <h5>Cycle Status</h5>
      </div>
      <div className="chart">
        {arrdata.map((item, index) => (
          <Event
            key={index}
            machineStatus={item.machine_status}
            ts={item.ts}
            arrdata={arrdata}
          />
        ))}
      </div>
      <div className="time-stamp">
        <div>15:00:00</div>
        <div>16:00:00</div>
        <div>17:00:00</div>
      </div>
    </div>
  );
}

function Event({ machineStatus, ts }) {
  const startDate = new Date(ts);
  const index = data.findIndex((item) => item.ts == ts);
  let endDate;
  if (index !== -1 && index + 1 < data.length) {
    endDate = new Date(data[index + 1].ts);
  } else {
    endDate = new Date(startDate);
  }

  endDate.setSeconds(endDate.getSeconds());

  let color = "";
  if (machineStatus === 0) {
    color = "yellow";
  } else if (machineStatus === 1) {
    color = "green";
  } else {
    color = "red";
  }

  const duration = endDate.getTime() - startDate.getTime();
  const width = `${(duration / 1000) * 10}px`;

  return <div className={`event ${color}`} style={{ width }}></div>;
}

export default App;
