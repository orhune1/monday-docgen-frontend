import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setToken(""); // Leave blank for context

function App() {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // Fetch item context when running as an item view app
    monday.listen("context", async (res) => {
      const { boardId, itemId } = res.data;

      try {
        const result = await monday.api(`query {
          items(ids: ${itemId}) {
            name
            column_values {
              id
              text
            }
          }
        }`);

        setItemData(result.data.items[0]);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Monday DocGen App</h1>

      {!itemData ? (
        <p>Loading item data...</p>
      ) : (
        <div>
          <h2>Item: {itemData.name}</h2>
          <ul>
            {itemData.column_values.map((col) => (
              <li key={col.id}>
                <strong>{col.id}:</strong> {col.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  <button
  onClick={async () => {
    const response = await fetch("https://YOUR_REPLIT_BACKEND_URL/generate-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columnValues: itemData.column_values })
    });

    const data = await response.json();
    alert(data.preview); // Eventually replace this with a Google Doc link
  }}
>
  Generate Document
</button>

}

export default App;
