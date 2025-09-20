import React from "react";
import WeightDashboard from "./components/WeightDashboard";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
       <Navbar
        logoUrl="/KitPush LOGO .svg"
        title="KitPush"
        streak={7}
        username="Testing-User"
        avatarUrl="/KitPush LOGO .svg"
      />
      <WeightDashboard />
    </div>
  );
}

export default App;
