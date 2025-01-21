function loadEmissionsDashboard() {
    document.getElementById("content").innerHTML = `
      <div class="container">
        <h1>Emissions Dashboard</h1>
        <div class="responsive-container">
          <canvas id="emissionsChart"></canvas>
        </div>
      </div>
    `;
  
    const ctx = document.getElementById("emissionsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Route A", "Route B", "Route C", "Route D", "Route E", "Route F", "Route G"],
        datasets: [
          {
            label: "Emissions",
            data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            backgroundColor: "rgba(136, 132, 216, 0.6)",
          },
        ],
      },
    });
  }
  