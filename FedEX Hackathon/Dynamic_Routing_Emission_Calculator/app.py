from flask import Flask, render_template, request, redirect, session, jsonify
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash
from geopy.geocoders import Nominatim
import threading
import time
import os

# Flask app initialization
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'b\xf3\x11\xcf|\xf8\xb0\x01\xdb\xe6\xcdr.\x8cL\x0c\x9c\x9a)U\x08\xc6g\x1d\x1a')  # Load secret key from environment variable or hardcode for testing

# Database connection (change these credentials to match your MySQL setup)
db = pymysql.connect(host='localhost', user='root', password='root', database='route_optimizer')

# Geolocation Service
geolocator = Nominatim(user_agent="route_optimizer")

# Global variables for tracking
current_location = None
stop_tracking = False
latest_updates = {}

### --- USER AUTHENTICATION ROUTES --- ###

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cursor = db.cursor()
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        if user and check_password_hash(user[3], password):
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            return redirect('/')
        else:
            return render_template('login.html', error='Invalid email or password')
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])

        cursor = db.cursor()
        try:
            cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
            db.commit()
            return redirect('/login')
        except:
            return render_template('signup.html', error='Email already exists')
    return render_template('signup.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')


### --- ROUTE OPTIMIZER LOGIC --- ###

@app.route('/')
def home():
    if 'user_id' not in session:
        return redirect('/login')
    return render_template('index.html', user_name=session['user_name'])


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


### --- HELPER FUNCTIONS --- ###

# Get coordinates of an address
def get_coordinates(address):
    try:
        location = geolocator.geocode(address, timeout=10)
        if location:
            return location.latitude, location.longitude
    except Exception as e:
        print(f"Error fetching coordinates for {address}: {e}")
    return None


# Track the route and update location
def track_route(start_coords, end_coords, vehicle_type):
    global current_location, stop_tracking, latest_updates
    current_location = start_coords
    while not stop_tracking:
        lat_diff = (end_coords[0] - current_location[0]) / 10
        lon_diff = (end_coords[1] - current_location[1]) / 10
        current_location = (current_location[0] + lat_diff, current_location[1] + lon_diff)

        # Simulated real-time updates (weather, traffic, etc.)
        latest_updates = {
            "location": current_location,
            "weather": {"main": {"temp": 25}, "weather": [{"description": "clear sky"}]},
            "aqi": {"data": {"aqi": 50}},
            "traffic": {"flowSegmentData": {"currentSpeed": 60}},
            "emissions": 10  # Example data
        }
        time.sleep(2)


### --- DATABASE CONNECTION --- ###

# Connect to MySQL database to fetch or store user data
def get_db_connection():
    return pymysql.connect(host='localhost', user='root', password='your_password', database='route_optimizer')

if __name__ == '__main__':
    app.run(debug=True)
