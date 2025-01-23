from flask import Flask, render_template, request, jsonify
import requests
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from dotenv import load_dotenv
import os
import threading
import time
import logging

# Load environment variables
load_dotenv()

# API Keys
AQICN_API_KEY = os.getenv('AQICN_API_KEY', 'd4f26403a3da5dab3a04d309df4612da5dfdfcfd')
TOM_TOM_API_KEY = os.getenv('TOM_TOM_API_KEY', 'FURUmeXJFsVAxfbjrBrCRBXrEsBFbRlx')
GRAPHHOPPER_API_KEY = os.getenv('GRAPHHOPPER_API_KEY', 'f6964e83-0132-4769-8a10-92a724ca4651')

# Flask app initialization
app = Flask(__name__)
geolocator = Nominatim(user_agent="route_optimizer")

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Global variables
current_location = None
stop_tracking = False
latest_updates = {}

# Helper: Get coordinates from an address
def get_coordinates(address):
    try:
        location = geolocator.geocode(address, timeout=10)
        if location:
            return location.latitude, location.longitude
    except GeocoderTimedOut:
        logging.error(f"Geocoder timed out for address: {address}")
    return None

# Helper: Fetch route data
def fetch_route_data(start_coords, end_coords, vehicle_type):
    url = (
        f"https://graphhopper.com/api/1/route?point={start_coords[0]},{start_coords[1]}"
        f"&point={end_coords[0]},{end_coords[1]}&vehicle={vehicle_type}&locale=en"
        f"&key={GRAPHHOPPER_API_KEY}&points_encoded=false"
    )
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
    except requests.RequestException as e:
        logging.error(f"Error fetching route data: {e}")
    return None

# Real-time data simulation (replace with real APIs as needed)
def fetch_real_time_data(lat, lon):
    # Simulating weather, air quality, and traffic data
    weather_data = {"main": {"temp": 25}, "weather": [{"description": "clear sky"}]}
    aqi_data = {"data": {"aqi": 50}}
    traffic_data = {"flowSegmentData": {"currentSpeed": 60}}
    return weather_data, aqi_data, traffic_data

# Background thread for real-time tracking
def track_route(start_coords, end_coords, vehicle_type):
    global current_location, stop_tracking, latest_updates
    current_location = start_coords
    while not stop_tracking:
        lat_diff = (end_coords[0] - current_location[0]) / 10
        lon_diff = (end_coords[1] - current_location[1]) / 10
        current_location = (current_location[0] + lat_diff, current_location[1] + lon_diff)

        weather_data, aqi_data, traffic_data = fetch_real_time_data(*current_location)

        latest_updates = {
            "location": current_location,
            "weather": weather_data,
            "aqi": aqi_data,
            "traffic": traffic_data,
            "emissions": 10  # Example emissions data
        }
        time.sleep(2)

# Flask Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/startTracking', methods=['POST'])
def start_tracking():
    global stop_tracking
    data = request.json
    start_address = data.get('start_address')
    end_address = data.get('end_address')
    vehicle_type = data.get('vehicle_type')

    start_coords = get_coordinates(start_address)
    end_coords = get_coordinates(end_address)

    if start_coords and end_coords:
        stop_tracking = False
        threading.Thread(target=track_route, args=(start_coords, end_coords, vehicle_type), daemon=True).start()
        return jsonify({"start_coords": start_coords, "end_coords": end_coords})
    return jsonify({"error": "Invalid coordinates."}), 400

@app.route('/live-updates', methods=['GET'])
def live_updates():
    global latest_updates
    return jsonify(latest_updates if latest_updates else {"error": "No updates available."})

@app.route('/stop', methods=['POST'])
def stop():
    global stop_tracking
    stop_tracking = True
    return jsonify({"message": "Tracking stopped."})

if __name__ == '__main__':
    app.run(debug=True)
