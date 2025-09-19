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
  const [filter, setFilter] = useState("week");
  const [weights, setWeights] = useState([]);

   const API_URL = "http://localhost:8080/api/weights/all";
  // const API_URL = "http://localhost:8080/api/weights/add";
    
  
  //const API_URL = "https://e347c5d1e3e8.ngrok-free.app/api/weights";
  // Get current month and date labels
  const now = new Date();
  const currentMonthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });
  const currentDateLabel = now.toLocaleDateString("en-GB"); // dd/mm/yyyy format

  useEffect(() => {
    fetch(API_URL, {
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
})
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((w) => ({
          date: new Date(w.recordedAt),
          weight: w.weight,
        }));
        setWeights(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const getWeightForDate = (targetDate) => {
    const found = weights.find(
      (w) => w.date.toDateString() === targetDate.toDateString()
    );
    return found ? found.weight : 0;
  };

  const getLastWeightOfMonth = (month, year) => {
    const monthData = weights.filter(
      (w) => w.date.getMonth() === month && w.date.getFullYear() === year
    );
    if (monthData.length === 0) return 0;
    return monthData.reduce((a, b) => (a.date > b.date ? a : b)).weight;
  };

  const getLastWeightOfYear = (year) => {
    const yearData = weights.filter((w) => w.date.getFullYear() === year);
    if (yearData.length === 0) return 0;
    return yearData.reduce((a, b) => (a.date > b.date ? a : b)).weight;
  };

  const getFilteredData = () => {
    const now = new Date();

    switch (filter) {
      case "week": {
        const day = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - ((day + 6) % 7));
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days.map((d, i) => {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i);
          return {
            label: d,
            weight: getWeightForDate(date),
          };
        });
      }

      case "month": {
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month, i + 1);
          return {
            label: (i + 1).toString(),
            weight: getWeightForDate(date),
          };
        });
      }

      case "3month": {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const result = [];
        for (let i = 2; i >= 0; i--) {
          let m = currentMonth - i;
          let y = currentYear;
          if (m < 0) {
            m += 12;
            y -= 1;
          }
          result.push({
            label: new Date(y, m).toLocaleString("en-US", { month: "short" }),
            weight: getLastWeightOfMonth(m, y),
          });
        }
        return result;
      }

      case "year": {
        const y = now.getFullYear();
        return Array.from({ length: 12 }, (_, m) => ({
          label: new Date(y, m).toLocaleString("en-US", { month: "short" }),
          weight: getLastWeightOfMonth(m, y),
        }));
      }

      case "allYears": {
        const years = [...new Set(weights.map((w) => w.date.getFullYear()))];
        if (years.length === 0) return [];
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const result = [];
        for (let y = minYear; y <= maxYear; y++) {
          result.push({
            label: y.toString(),
            weight: getLastWeightOfYear(y),
          });
        }
        return result;
      }

      default:
        return [];
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Weight Progress Dashboard</h2>

      {/* Current Month & Date Labels */}
      <p>
        <strong>Current Month:</strong> {currentMonthLabel} |{" "}
        <strong>Today:</strong> {currentDateLabel}
      </p>

      <p>Showing: <strong>{filter.toUpperCase()}</strong></p>

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
        <BarChart data={getFilteredData()}>
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
