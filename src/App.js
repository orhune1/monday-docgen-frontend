import React from "react";

function App() {
  const handleClick = () => {
    fetch("https://orhunsandbox--erdemorhun4.repl.co/generate-doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Hello from Vercel!"
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Document generated:", data);
        alert("Document created!");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to generate document.");
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>DocGen for Monday</h1>
      <button onClick={handleClick}>Generate Document</button>
    </div>
  );
}

export default App;
