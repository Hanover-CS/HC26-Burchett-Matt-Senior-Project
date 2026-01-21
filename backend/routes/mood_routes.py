'''
File: mood_routes.py

Description:
Flask backend application for the mood tracking portion of the project.
Implements API routes for retrieving and creating mood entries while managing
database interactions through SQLAlchemy. Ensures returned responses follow a
structured API.

Responsibilities:
- Define backend API routes for GET and POST /api/mood.
- Query the database and return serialized mood data.

Endpoints:
- GET /api/mood : Returns a list of all mood entries.
- POST /api/mood : Adds a new mood entry to the database.

Dependencies:
- Blueprint, request
- db, Mood from models.py

Author: Matt Burchett
Last Modified: 12-9-2025
'''

from flask import Blueprint, request
from models import db, Mood

mood_bp = Blueprint("mood_bp", __name__)

@mood_bp.route("/api/mood", methods=["GET"]) # Needs to eventually be for a specific user
def get_moods():
    moods = Mood.query.all()
    return {"moods": [mood.to_dict() for mood in moods]}

@mood_bp.route("/api/mood", methods=["POST"]) # Needs to eventually be for a specific user
def add_mood():
    data = request.get_json()

    new_mood = Mood(
        positivity_level=data["positivity_level"],
        stress_level=data["stress_level"],
        energy_level=data["energy_level"],
        calmness_level=data["calmness_level"],
        motivation_level=data["motivation_level"],
    )

    db.session.add(new_mood)
    db.session.commit()
    return {"message": "Mood added successfully", "mood": new_mood.to_dict()}, 201

@mood_bp.route("/api/mood/<int:mood_id>", methods=["DELETE"])
def delete_mood(mood_id):
    mood = Mood.query.get(mood_id)
    if not mood:
        return {"error": "Mood not found"}, 404

    db.session.delete(mood)
    db.session.commit()
    return {"message": "Mood deleted successfully"}, 200