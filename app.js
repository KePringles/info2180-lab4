document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const btn = document.getElementById("search-btn");
  const resultDiv = document.getElementById("result");
  const input = document.getElementById("search-field");

  // Simple client-side sanitizer to strip angle brackets
  const sanitizeClient = (str) => str.replace(/[<>]/g, "");

  async function runSearch(e) {
    if (e) e.preventDefault();

    const q = sanitizeClient((input.value || "").trim());
    // IMPORTANT: when empty, call superheroes.php with NO ?query=
    const url = q === "" ? "superheroes.php" : `superheroes.php?query=${encodeURIComponent(q)}`;

    // Optional: show a tiny loading hint
    resultDiv.innerHTML = "<em>Loading…</em>";

    try {
      const resp = await fetch(url, { cache: "no-store" }); // avoid cached blank responses
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const html = await resp.text();
      resultDiv.innerHTML = html;
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "Error fetching data.";
    }
  }

  form.addEventListener("submit", runSearch);
  btn.addEventListener("click", runSearch);

  // Load full list on first paint to match the sample
  runSearch();
});
