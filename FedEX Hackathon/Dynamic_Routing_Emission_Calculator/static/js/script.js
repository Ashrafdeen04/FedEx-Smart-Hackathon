const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const routeControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true
}).addTo(map);

const loadingBar = document.getElementById('loading-bar');

// Show loading progress bar
function showLoadingBar() {
    loadingBar.style.display = 'block';
}

// Hide loading progress bar
function hideLoadingBar() {
    loadingBar.style.display = 'none';
}

// Handle form submission
document.getElementById('route-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const startAddress = document.getElementById('start-address').value.trim();
    const endAddress = document.getElementById('end-address').value.trim();
    const vehicleType = document.getElementById('vehicle-type').value;

    if (!startAddress || !endAddress) {
        alert('Please provide valid start and end addresses.');
        return;
    }

    showLoadingBar();

    fetch('/startTracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            start_address: startAddress,
            end_address: endAddress,
            vehicle_type: vehicleType
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.start_coords && data.end_coords) {
                routeControl.setWaypoints([
                    L.latLng(data.start_coords[0], data.start_coords[1]),
                    L.latLng(data.end_coords[0], data.end_coords[1])
                ]);
                updateLiveData();
            } else {
                alert('Error fetching route.');
            }
        })
        .catch(() => alert('Error starting tracking.'))
        .finally(() => hideLoadingBar());
});

// Fetch live updates every 5 seconds
function updateLiveData() {
    setInterval(() => {
        fetch('/live-updates')
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    document.getElementById('current-location').innerText = `Location: (${data.location[0].toFixed(4)}, ${data.location[1].toFixed(4)})`;
                    document.getElementById('current-weather').innerText = `Weather: ${data.weather.main.temp}°C, ${data.weather.weather[0].description}`;
                    document.getElementById('current-aqi').innerText = `AQI: ${data.aqi.data.aqi}`;
                    document.getElementById('current-traffic').innerText = `Traffic Speed: ${data.traffic.flowSegmentData.currentSpeed} km/h`;
                    document.getElementById('current-co2').innerText = `Emissions: ${data.emissions} kg`;
                }
            })
            .catch(() => {
                document.getElementById('live-data').innerHTML = '<p class="error-message">Error fetching live updates.</p>';
            });
    }, 5000);
}
