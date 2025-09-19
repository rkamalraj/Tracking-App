import React, { useState } from "react";

function AddWeight() {
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");

  // Replace with your ngrok URL
  const API_URL = "http://localhost:8080/api/weights/add";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!weight) {
      setMessage("Please enter a weight");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight: parseFloat(weight) }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Weight ${data.weight}kg added at ${data.recordedAt}`);
        setWeight("");
      } else {
        setMessage("❌ Failed to add weight");
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Add Weight</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <input
          type="number"
          step="0.1"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Add Weight
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}

export default AddWeight;
