import React, { useState, useEffect } from "react";
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
  const [filter, setFilter] = useState("year");
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from Spring Boot (via ngrok tunnel)
  useEffect(() => {
   fetch("https://23d36645dd40.ngrok-free.app/api/weights", {
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
})

      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setRawData(data);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // Apply filter whenever rawData or filter changes
  useEffect(() => {
    let grouped = [];

    if (filter === "week") {
      // Example: Just show first 7 records as week demo
      grouped = rawData.slice(0, 7);
    } else if (filter === "month") {
      // Group by month name within the latest year
      const latestYear = Math.max(...rawData.map((d) => d.year));
      grouped = rawData.filter((d) => d.year === latestYear);
    } else if (filter === "3month") {
      // Last 3 months from latest year
      const latestYear = Math.max(...rawData.map((d) => d.year));
      grouped = rawData
        .filter((d) => d.year === latestYear)
        .slice(0, 3);
    } else if (filter === "year") {
      // Show full months for latest year
      const latestYear = Math.max(...rawData.map((d) => d.year));
      grouped = rawData.filter((d) => d.year === latestYear);
    } else if (filter === "allYears") {
      // Aggregate yearly averages
      const yearMap = {};
      rawData.forEach((d) => {
        if (!yearMap[d.year]) yearMap[d.year] = [];
        yearMap[d.year].push(d.weight);
      });
      grouped = Object.keys(yearMap).map((year) => ({
        label: year,
        weight:
          yearMap[year].reduce((a, b) => a + b, 0) / yearMap[year].length,
      }));
    }

    setFilteredData(grouped);
  }, [filter, rawData]);

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
        <BarChart data={filteredData}>
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
