import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [actions, setActions] = useState([]);
  const [miles, setMiles] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [transportMode, setTransportMode] = useState("car");
  const [showMessage, setShowMessage] = useState(false);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState([]);

  // Eco actions suggestions
  const ecoActionsSuggestions = [
    "Switch to LED lights",
    "Use public transportation",
    "Recycle more",
    "Unplug devices when not in use",
    "Plant trees"
  ];

  // Carbon footprint calculation based on transport mode
  const calculateCarbon = () => {
    if (miles.trim() === "") {
      alert("Please enter miles driven.");
      return;
    }

    let footprint = 0;

    if (transportMode === "car") {
      footprint = miles * 0.404; // Example for car
    } else if (transportMode === "bus") {
      footprint = miles * 0.12; // Example for bus
    } else if (transportMode === "bike") {
      footprint = miles * 0.02; // Example for bike (much lower)
    }

    setCarbonFootprint(${footprint.toFixed(2)} kg CO2 per week);
  };

  const addEcoAction = () => {
    const actionInput = document.getElementById("actionInput").value.trim();
    if (actionInput) {
      setActions([...actions, actionInput]);
      setEcoPoints(ecoPoints + 10);
      document.getElementById("actionInput").value = "";
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 sec
    } else {
      alert("Please enter a valid eco-friendly action.");
    }
  };

  const completeChallenge = () => {
    setEcoPoints(ecoPoints + 50);
    setChallengesCompleted(challengesCompleted + 1);
    alert("Challenge Completed! +50 Eco Points!");
  };

  const resetTracker = () => {
    setEcoPoints(0);
    setActions([]);
    setMiles("");
    setCarbonFootprint(null);
    setChallengesCompleted(0);
    setLeaderboard([]);
  };

  const updateLeaderboard = () => {
    const newLeaderboard = [...leaderboard, { name: "User", points: ecoPoints }];
    newLeaderboard.sort((a, b) => b.points - a.points);
    setLeaderboard(newLeaderboard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>🌱 Eco-Friendly Lifestyle Tracker 🌍</h1>
        <p>Track your eco-friendly actions & reduce your carbon footprint!</p>
      </header>

      <div className="content">
        <div className="card points-card">
          <h2>Your Eco Points: {ecoPoints}</h2>
          {showMessage && <p className="success-message">🎉 +10 Points Added!</p>}
        </div>

        <div className="card">
          <h3>✅ Actions Taken</h3>
          {actions.length === 0 ? (
            <p>No actions recorded yet. Start making a change!</p>
          ) : (
            <ul>
              {actions.map((action, index) => (
                <li key={index} className="fade-in">
                  {action} ✅
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3>➕ Add a New Action</h3>
          <input type="text" id="actionInput" placeholder="Enter eco-friendly action" />
          <button onClick={addEcoAction} className="animated-button">Add Action</button>
        </div>

        <div className="card">
          <h3>🌎 Carbon Footprint Calculator</h3>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="Miles Driven Weekly"
          />
          <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bike</option>
          </select>
          <button onClick={calculateCarbon} className="animated-button">Calculate</button>
          {carbonFootprint && <p className="fade-in">{carbonFootprint}</p>}
        </div>

        <div className="card">
          <h3>🏆 Challenges</h3>
          <button onClick={completeChallenge} className="animated-button">Complete Eco Challenge</button>
          <p>Challenges Completed: {challengesCompleted}</p>
        </div>

        <div className="card">
          <h3>🌱 Eco Actions Suggestions</h3>
          <ul>
            {ecoActionsSuggestions.map((action, index) => (
              <li key={index} className="fade-in">{action}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>📈 Leaderboard</h3>
          <button onClick={updateLeaderboard} className="animated-button">Update Leaderboard</button>
          <ul>
            {leaderboard.length === 0 ? (
              <li>No leaderboard data yet.</li>
            ) : (
              leaderboard.map((entry, index) => (
                <li key={index}>
                  {entry.name}: {entry.points} points
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="card">
          <button onClick={resetTracker} className="reset-button">Reset Tracker</button>
        </div>
      </div>
    </div>
  );
}

export default App;