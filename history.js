function loadHistory() {
  chrome.storage.local.get({ unsafeHistory: [] }, (result) => {
    const table = document.getElementById("historyTable");
    table.innerHTML = "";

    if (result.unsafeHistory.length === 0) {
      table.innerHTML = "<tr><td colspan='2'>✅ No unsafe sites detected yet.</td></tr>";
      return;
    }

    result.unsafeHistory.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${entry.url}</td><td>${entry.date}</td>`;
      table.appendChild(row);
    });
  });
}

document.getElementById("clearHistory").addEventListener("click", () => {
  chrome.storage.local.set({ unsafeHistory: [] }, loadHistory);
});

loadHistory();
