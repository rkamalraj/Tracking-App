GS6FCmhKzU73m.3

health-tracker

======

before serving 



npm run build

=============

it is used to host react 



npm install -g serve

serve -s build

============

used to run two at same time



version: "2"

authtoken: 32smWHVgnc3lPv7mGXDSbL4EUa5\_2zdxyHPVuSXjoHff9PPAo



tunnels:

&nbsp; react:

&nbsp;   addr: 3000

&nbsp;   proto: http



&nbsp; springboot:

&nbsp;   addr: 8080

&nbsp;   proto: http

------

used to run both at a time



ngrok start --all --config "C:\\Users\\jeeva\\AppData\\Local\\Packages\\ngrok.ngrok\_1g87z0zv29zzc\\LocalCache\\Roaming\\ngrok\\ngrok.yml"

========================



\*wrking fetch code\*

===

import React, { useState, useEffect } from "react";

import {

&nbsp; BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer

} from "recharts";



const WeightDashboard = () => {

&nbsp; const \[filter, setFilter] = useState("year");

&nbsp; const \[data, setData] = useState(\[]);



&nbsp;  // Fetch data from Spring Boot

&nbsp; useEffect(() => {

&nbsp;//fetch("http://localhost:8080/api/weights")

&nbsp;fetch("https://9a11fefd1863.ngrok-free.app/api/weights", {

&nbsp; headers: {

&nbsp;   "ngrok-skip-browser-warning": "true"

&nbsp; }

})



&nbsp; .then((res) => {

&nbsp;   if (!res.ok) {

&nbsp;     throw new Error(`HTTP error! Status: ${res.status}`);

&nbsp;   }

&nbsp;   return res.json();

&nbsp; })

&nbsp; .then((data) => {

&nbsp;   console.log("Fetched Data:", data);

&nbsp;   setData(data);

&nbsp; })

&nbsp; .catch((err) => console.error("Fetch Error:", err));

}, \[]);

&nbsp;



&nbsp; return (

&nbsp;   <div style={{ padding: "20px" }}>

&nbsp;     <h2>Weight Progress Dashboard</h2>



&nbsp;     <div style={{ marginBottom: "20px" }}>

&nbsp;       <button onClick={() => setFilter("week")}>Week</button>

&nbsp;       <button onClick={() => setFilter("month")}>Month</button>

&nbsp;       <button onClick={() => setFilter("3month")}>3-Month</button>

&nbsp;       <button onClick={() => setFilter("year")}>Year</button>

&nbsp;       <button onClick={() => setFilter("allYears")}>All Years</button>

&nbsp;     </div>



&nbsp;     <ResponsiveContainer width="100%" height={400}>

&nbsp;       <BarChart data={data}>

&nbsp;         <CartesianGrid strokeDasharray="3 3" />

&nbsp;         <XAxis dataKey="label" />

&nbsp;         <YAxis />

&nbsp;         <Tooltip />

&nbsp;         <Bar dataKey="weight" fill="#8884d8" />

&nbsp;       </BarChart>

&nbsp;     </ResponsiveContainer>

&nbsp;   </div>

&nbsp; );

};



export default WeightDashboard;













=======================================================================================================================================================================

**// Final code Integrated with backend properly functionality also Done**



import React, { useState, useEffect } from "react";

import {

&nbsp; BarChart,

&nbsp; Bar,

&nbsp; XAxis,

&nbsp; YAxis,

&nbsp; Tooltip,

&nbsp; CartesianGrid,

&nbsp; ResponsiveContainer,

} from "recharts";



const WeightDashboard = () => {

&nbsp; const \[filter, setFilter] = useState("week");

&nbsp; const \[weights, setWeights] = useState(\[]);



&nbsp;// const API\_URL = "http://localhost:8080/api/weights";

&nbsp;   const API\_URL = "https://d04b08a3ee41.ngrok-free.app/api/weights";

&nbsp; // Get current month and date labels

&nbsp; const now = new Date();

&nbsp; const currentMonthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

&nbsp; const currentDateLabel = now.toLocaleDateString("en-GB"); // dd/mm/yyyy format



&nbsp; useEffect(() => {

&nbsp;   fetch(API\_URL, {

&nbsp; headers: {

&nbsp;   "ngrok-skip-browser-warning": "true"

&nbsp; }

})

&nbsp;     .then((res) => res.json())

&nbsp;     .then((data) => {

&nbsp;       const formatted = data.map((w) => ({

&nbsp;         date: new Date(w.recordedAt),

&nbsp;         weight: w.weight,

&nbsp;       }));

&nbsp;       setWeights(formatted);

&nbsp;     })

&nbsp;     .catch((err) => console.error(err));

&nbsp; }, \[]);



&nbsp; const getWeightForDate = (targetDate) => {

&nbsp;   const found = weights.find(

&nbsp;     (w) => w.date.toDateString() === targetDate.toDateString()

&nbsp;   );

&nbsp;   return found ? found.weight : 0;

&nbsp; };



&nbsp; const getLastWeightOfMonth = (month, year) => {

&nbsp;   const monthData = weights.filter(

&nbsp;     (w) => w.date.getMonth() === month \&\& w.date.getFullYear() === year

&nbsp;   );

&nbsp;   if (monthData.length === 0) return 0;

&nbsp;   return monthData.reduce((a, b) => (a.date > b.date ? a : b)).weight;

&nbsp; };



&nbsp; const getLastWeightOfYear = (year) => {

&nbsp;   const yearData = weights.filter((w) => w.date.getFullYear() === year);

&nbsp;   if (yearData.length === 0) return 0;

&nbsp;   return yearData.reduce((a, b) => (a.date > b.date ? a : b)).weight;

&nbsp; };



&nbsp; const getFilteredData = () => {

&nbsp;   const now = new Date();



&nbsp;   switch (filter) {

&nbsp;     case "week": {

&nbsp;       const day = now.getDay();

&nbsp;       const monday = new Date(now);

&nbsp;       monday.setDate(now.getDate() - ((day + 6) % 7));

&nbsp;       const days = \["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

&nbsp;       return days.map((d, i) => {

&nbsp;         const date = new Date(monday);

&nbsp;         date.setDate(monday.getDate() + i);

&nbsp;         return {

&nbsp;           label: d,

&nbsp;           weight: getWeightForDate(date),

&nbsp;         };

&nbsp;       });

&nbsp;     }



&nbsp;     case "month": {

&nbsp;       const year = now.getFullYear();

&nbsp;       const month = now.getMonth();

&nbsp;       const daysInMonth = new Date(year, month + 1, 0).getDate();

&nbsp;       return Array.from({ length: daysInMonth }, (\_, i) => {

&nbsp;         const date = new Date(year, month, i + 1);

&nbsp;         return {

&nbsp;           label: (i + 1).toString(),

&nbsp;           weight: getWeightForDate(date),

&nbsp;         };

&nbsp;       });

&nbsp;     }



&nbsp;     case "3month": {

&nbsp;       const currentMonth = now.getMonth();

&nbsp;       const currentYear = now.getFullYear();

&nbsp;       const result = \[];

&nbsp;       for (let i = 2; i >= 0; i--) {

&nbsp;         let m = currentMonth - i;

&nbsp;         let y = currentYear;

&nbsp;         if (m < 0) {

&nbsp;           m += 12;

&nbsp;           y -= 1;

&nbsp;         }

&nbsp;         result.push({

&nbsp;           label: new Date(y, m).toLocaleString("en-US", { month: "short" }),

&nbsp;           weight: getLastWeightOfMonth(m, y),

&nbsp;         });

&nbsp;       }

&nbsp;       return result;

&nbsp;     }



&nbsp;     case "year": {

&nbsp;       const y = now.getFullYear();

&nbsp;       return Array.from({ length: 12 }, (\_, m) => ({

&nbsp;         label: new Date(y, m).toLocaleString("en-US", { month: "short" }),

&nbsp;         weight: getLastWeightOfMonth(m, y),

&nbsp;       }));

&nbsp;     }



&nbsp;     case "allYears": {

&nbsp;       const years = \[...new Set(weights.map((w) => w.date.getFullYear()))];

&nbsp;       if (years.length === 0) return \[];

&nbsp;       const minYear = Math.min(...years);

&nbsp;       const maxYear = Math.max(...years);

&nbsp;       const result = \[];

&nbsp;       for (let y = minYear; y <= maxYear; y++) {

&nbsp;         result.push({

&nbsp;           label: y.toString(),

&nbsp;           weight: getLastWeightOfYear(y),

&nbsp;         });

&nbsp;       }

&nbsp;       return result;

&nbsp;     }



&nbsp;     default:

&nbsp;       return \[];

&nbsp;   }

&nbsp; };



&nbsp; return (

&nbsp;   <div style={{ padding: "20px" }}>

&nbsp;     <h2>Weight Progress Dashboard</h2>



&nbsp;     {/\* Current Month \& Date Labels \*/}

&nbsp;     <p>

&nbsp;       <strong>Current Month:</strong> {currentMonthLabel} |{" "}

&nbsp;       <strong>Today:</strong> {currentDateLabel}

&nbsp;     </p>



&nbsp;     <p>Showing: <strong>{filter.toUpperCase()}</strong></p>



&nbsp;     {/\* Filter Buttons \*/}

&nbsp;     <div style={{ marginBottom: "20px" }}>

&nbsp;       <button onClick={() => setFilter("week")}>Week</button>

&nbsp;       <button onClick={() => setFilter("month")}>Month</button>

&nbsp;       <button onClick={() => setFilter("3month")}>3-Month</button>

&nbsp;       <button onClick={() => setFilter("year")}>Year</button>

&nbsp;       <button onClick={() => setFilter("allYears")}>All Years</button>

&nbsp;     </div>



&nbsp;     {/\* Chart \*/}

&nbsp;     <ResponsiveContainer width="100%" height={400}>

&nbsp;       <BarChart data={getFilteredData()}>

&nbsp;         <CartesianGrid strokeDasharray="3 3" />

&nbsp;         <XAxis dataKey="label" />

&nbsp;         <YAxis />

&nbsp;         <Tooltip />

&nbsp;         <Bar dataKey="weight" fill="#8884d8" />

&nbsp;       </BarChart>

&nbsp;     </ResponsiveContainer>

&nbsp;   </div>

&nbsp; );

};



export default WeightDashboard;





=======================================================================================================================================================================



=======================================================================================================================================================================



// working code for functionality button "without Backend"





import React, { useState } from "react";

import {

&nbsp; BarChart,

&nbsp; Bar,

&nbsp; XAxis,

&nbsp; YAxis,

&nbsp; Tooltip,

&nbsp; CartesianGrid,

&nbsp; ResponsiveContainer,

} from "recharts";



const WeightDashboard = () => {

&nbsp; const \[filter, setFilter] = useState("week");



&nbsp; // Sample data (replace with your real data later)

&nbsp; const dataSets = {

&nbsp;   week: \[

&nbsp;     { label: "Mon", weight: 70 },

&nbsp;     { label: "Tue", weight: 71 },

&nbsp;     { label: "Wed", weight: 70.5 },

&nbsp;     { label: "Thu", weight: 72 },

&nbsp;     { label: "Fri", weight: 71.8 },

&nbsp;     { label: "Sat", weight: 72.2 },

&nbsp;     { label: "Sun", weight: 71 },

&nbsp;   ],

&nbsp;   month: \[

&nbsp;     { label: "Week 1", weight: 70 },

&nbsp;     { label: "Week 2", weight: 71 },

&nbsp;     { label: "Week 3", weight: 72 },

&nbsp;     { label: "Week 4", weight: 73 },

&nbsp;   ],

&nbsp;   "3month": \[

&nbsp;     { label: "Jan", weight: 70 },

&nbsp;     { label: "Feb", weight: 72 },

&nbsp;     { label: "Mar", weight: 74 },

&nbsp;   ],

&nbsp;   year: \[

&nbsp;     { label: "Jan", weight: 70 },

&nbsp;     { label: "Feb", weight: 71 },

&nbsp;     { label: "Mar", weight: 72 },

&nbsp;     { label: "Apr", weight: 73 },

&nbsp;     { label: "May", weight: 72.5 },

&nbsp;     { label: "Jun", weight: 74 },

&nbsp;     { label: "Jul", weight: 75 },

&nbsp;     { label: "Aug", weight: 74.5 },

&nbsp;     { label: "Sep", weight: 76 },

&nbsp;     { label: "Oct", weight: 75.5 },

&nbsp;     { label: "Nov", weight: 76.2 },

&nbsp;     { label: "Dec", weight: 77 },

&nbsp;   ],

&nbsp;   allYears: \[

&nbsp;     { label: "2012", weight: 65 },

&nbsp;     { label: "2013", weight: 67 },

&nbsp;     { label: "2014", weight: 69 },

&nbsp;     { label: "2015", weight: 72 },

&nbsp;     { label: "2016", weight: 74 },

&nbsp;     { label: "2017", weight: 76 },

&nbsp;     { label: "2018", weight: 77 },

&nbsp;     { label: "2019", weight: 78 },

&nbsp;     { label: "2020", weight: 79 },

&nbsp;     { label: "2021", weight: 80 },

&nbsp;     { label: "2022", weight: 81 },

&nbsp;     { label: "2023", weight: 83 },

&nbsp;     { label: "2024", weight: 84 },

&nbsp;   ],

&nbsp; };



&nbsp; return (

&nbsp;   <div style={{ padding: "20px" }}>

&nbsp;     <h2>Weight Progress Dashboard</h2>



&nbsp;     {/\* Filter Buttons \*/}

&nbsp;     <div style={{ marginBottom: "20px" }}>

&nbsp;       <button onClick={() => setFilter("week")}>Week</button>

&nbsp;       <button onClick={() => setFilter("month")}>Month</button>

&nbsp;       <button onClick={() => setFilter("3month")}>3-Month</button>

&nbsp;       <button onClick={() => setFilter("year")}>Year</button>

&nbsp;       <button onClick={() => setFilter("allYears")}>All Years</button>

&nbsp;     </div>



&nbsp;     {/\* Chart \*/}

&nbsp;     <ResponsiveContainer width="100%" height={400}>

&nbsp;       <BarChart data={dataSets\[filter]}>

&nbsp;         <CartesianGrid strokeDasharray="3 3" />

&nbsp;         <XAxis dataKey="label" />

&nbsp;         <YAxis />

&nbsp;         <Tooltip />

&nbsp;         <Bar dataKey="weight" fill="#8884d8" />

&nbsp;       </BarChart>

&nbsp;     </ResponsiveContainer>

&nbsp;   </div>

&nbsp; );

};



export default WeightDashboard;

=======================================================================================================================================================================

