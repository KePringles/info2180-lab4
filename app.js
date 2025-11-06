document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("search-btn");
    if (!btn) return;
  
    btn.addEventListener("click", async () => {
      try {
        // Path is relative to index.html — both sit in the same folder as superheroes.php
        const resp = await fetch("superheroes.php", {
          headers: { "X-Requested-With": "XMLHttpRequest" } // optional
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = await resp.text();         // IMPORTANT: use .text(), not .json()
        alert(text);                            // Exercise 2 requires an alert with the list
      } catch (err) {
        console.error(err);
        alert("Could not fetch the superheroes list.");
      }
    });
  });
  