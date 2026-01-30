"""
File: app.py

Description:
Flask backend application for the Running Tracker and Mood Tracker project.
Implements API routes for managing runs and moods while handling database
interactions through SQLAlchemy. Configures CORS for cross-origin requests.

Responsibilities:
- Configure Flask, CORS, and SQLAlchemy.
- Define backend API routes for homepage.
- Initialize the SQLite database and start the server.

Endpoints:
- GET / : Simple status message for backend availability.

Dependencies:
- Flask
- CORS from flask_cors
- db, Run from models.py
- runs_bp from routes/runs_routes.py
- mood_bp from routes/mood_routes.py

Author: Matt Burchett
Last Modified: 12-9-2025
"""

from flask import Flask
from flask_cors import CORS
from models import db, Run
from routes.runs_routes import runs_bp
from routes.mood_routes import mood_bp
from routes.home_routes import home_bp
import os

app = Flask(__name__)
CORS(app)

database_url = os.getenv("DATABASE_URL")

if database_url:
    # SQLAlchemy needs postgres:// replaced with postgresql://
    database_url = database_url.replace("postgres://", "postgresql://")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
else:
    # Local development fallback
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///runs.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(runs_bp)
app.register_blueprint(mood_bp)
app.register_blueprint(home_bp)

with app.app_context():
        db.create_all()

@app.route("/")
def home():
    return {"message": "Hello from backend!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)