function loadHome() {
    document.getElementById("content").innerHTML = `
      <div class="container">
        <h1>Welcome to FedEx Dynamic Routing System</h1>
        <div class="grid">
          <div class="card">
            <h2>Optimize Routes</h2>
            <p>Calculate the most efficient routes using real-time traffic and weather data.</p>
          </div>
          <div class="card">
            <h2>Emissions Dashboard</h2>
            <p>Monitor and analyze vehicle emissions to reduce environmental impact.</p>
          </div>
          <div class="card">
            <h2>Real-time Tracking</h2>
            <p>Track vehicles and deliveries in real-time for improved customer satisfaction.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  loadHome(); // Load home content by default
  