import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const WeightDashboard = () => {
  const [filter, setFilter] = useState("week");

  // Sample data (replace with your real data later)
  const dataSets = {
    week: [
      { label: "Mon", weight: 70 },
      { label: "Tue", weight: 71 },
      { label: "Wed", weight: 70.5 },
      { label: "Thu", weight: 72 },
      { label: "Fri", weight: 71.8 },
      { label: "Sat", weight: 72.2 },
      { label: "Sun", weight: 71 },
    ],
    month: [
      { label: "Week 1", weight: 70 },
      { label: "Week 2", weight: 71 },
      { label: "Week 3", weight: 72 },
      { label: "Week 4", weight: 73 },
    ],
    "3month": [
      { label: "Jan", weight: 70 },
      { label: "Feb", weight: 72 },
      { label: "Mar", weight: 74 },
    ],
    year: [
      { label: "Jan", weight: 70 },
      { label: "Feb", weight: 71 },
      { label: "Mar", weight: 72 },
      { label: "Apr", weight: 73 },
      { label: "May", weight: 72.5 },
      { label: "Jun", weight: 74 },
      { label: "Jul", weight: 75 },
      { label: "Aug", weight: 74.5 },
      { label: "Sep", weight: 76 },
      { label: "Oct", weight: 75.5 },
      { label: "Nov", weight: 76.2 },
      { label: "Dec", weight: 77 },
    ],
    allYears: [
      { label: "2012", weight: 65 },
      { label: "2013", weight: 67 },
      { label: "2014", weight: 69 },
      { label: "2015", weight: 72 },
      { label: "2016", weight: 74 },
      { label: "2017", weight: 76 },
      { label: "2018", weight: 77 },
      { label: "2019", weight: 78 },
      { label: "2020", weight: 79 },
      { label: "2021", weight: 80 },
      { label: "2022", weight: 81 },
      { label: "2023", weight: 83 },
      { label: "2024", weight: 84 },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Weight Progress Dashboard</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("week")}>Week</button>
        <button onClick={() => setFilter("month")}>Month</button>
        <button onClick={() => setFilter("3month")}>3-Month</button>
        <button onClick={() => setFilter("year")}>Year</button>
        <button onClick={() => setFilter("allYears")}>All Years</button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dataSets[filter]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="weight" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightDashboard;
