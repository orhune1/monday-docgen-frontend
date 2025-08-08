import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setToken("");

function App() {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    monday.listen("context", async (res) => {
      const { itemId } = res.data;
      const response = await monday.api(`query {
        items(ids: ${itemId}) {
          name
          column_values {
            id
            text
          }
        }
      }`);
      setItemData(response.data.items[0]);
    });
  }, []);

  const handleGenerate = async () => {
    const response = await fetch("https://orhunsandbox.erdemorhun4.replit.app/generate-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columnValues: itemData.column_values })
    });

    const result = await response.json();
    alert(result.preview);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>DocGen for Monday</h1>
      {itemData ? (
        <>
          <h2>Item: {itemData.name}</h2>
          <ul>
            {itemData.column_values.map((col) => (
              <li key={col.id}>
                <strong>{col.id}:</strong> {col.text}
              </li>
            ))}
          </ul>
          <button onClick={handleGenerate}>📄 Generate Document</button>
        </>
      ) : (
        <p>Loading item data...</p>
      )}
    </div>
  );
}

export default App;
