from flask import Blueprint
from models import db, Mood, Run

home_bp = Blueprint("home_bp", __name__)

@home_bp.route("/api/recents", methods=["GET"])
def get_recents():
    latest_run = Run.query.order_by(Run.date.desc()).first()
    latest_mood = Mood.query.order_by(Mood.date.desc()).first()

    run_data = latest_run.to_dict() if latest_run else None
    mood_data = latest_mood.to_dict() if latest_mood else None

    return {
        "latest_run": run_data,
        "latest_mood": mood_data
    }