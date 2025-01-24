function loadOptimizeRoute() {
    document.getElementById("content").innerHTML = `
      <div class="container">
        <h1>Optimize Your Route</h1>
        <form onsubmit="handleRouteSubmit(event)">
          <div>
            <label for="origin">Origin</label>
            <input id="origin" type="text" placeholder="Enter origin address">
          </div>
          <div>
            <label for="destination">Destination</label>
            <input id="destination" type="text" placeholder="Enter destination address">
          </div>
          <div>
            <label for="vehicleType">Vehicle Type</label>
            <select id="vehicleType">
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="car">Car</option>
            </select>
          </div>
          <button type="submit">Calculate Optimal Route</button>
        </form>
      </div>
    `;
  }
  
  function handleRouteSubmit(event) {
    event.preventDefault();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const vehicleType = document.getElementById("vehicleType").value;
    console.log("Calculating route:", { origin, destination, vehicleType });
  }
  