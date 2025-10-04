let stockData = [];

// Load stock data from JSON
fetch("stocks.json")
  .then(response => response.json())
  .then(data => {
    stockData = data.stocks;
    populateDropdown(stockData);
    displayStocks(stockData);
  })
  .catch(error => console.error("Error loading JSON:", error));

// Populate dropdown with unique sectors
function populateDropdown(stocks) {
  const sectorFilter = document.getElementById("sectorFilter");
  const sectors = ["All", ...new Set(stocks.map(stock => stock.sector))];

  sectors.forEach(sector => {
    const option = document.createElement("option");
    option.value = sector;
    option.textContent = sector;
    sectorFilter.appendChild(option);
  });

  sectorFilter.addEventListener("change", () => {
    const selected = sectorFilter.value;
    if (selected === "All") {
      displayStocks(stockData);
    } else {
      const filtered = stockData.filter(stock => stock.sector === selected);
      displayStocks(filtered);
    }
  });
}

// Display stock data in the table
function displayStocks(stocks) {
  const tableBody = document.querySelector("#stocksTable tbody");
  tableBody.innerHTML = "";

  stocks.forEach(stock => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.company}</td>
      <td>${stock.ticker}</td>
      <td>${stock.sector}</td>
      <td>$${stock.price.toFixed(2)}</td>
      <td class="${stock.change >= 0 ? 'positive' : 'negative'}">
        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
      </td>
    `;
    tableBody.appendChild(row);
  });
}