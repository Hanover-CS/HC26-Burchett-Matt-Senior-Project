from app import app, db, Run
import json
from datetime import datetime

def test_home():
    client = app.test_client()
    res = client.get("/")
    assert res.status_code == 200
    assert res.json["message"] == "Hello from backend!"

# Helper: resets test database for clean runs
def setup_function():
    with app.app_context():
        db.drop_all()
        db.create_all()


# Test GET /api/runs (empty DB)
def test_get_runs_empty():
    client = app.test_client()
    res = client.get("/api/runs")
    assert res.status_code == 200
    assert res.json["runs"] == []


# Test POST /api/runs with valid data
def test_add_run_success():
    client = app.test_client()

    data = {
        "name": "Morning Run",
        "date": "2025-01-15T09:30",
        "distance": 5.0,
        "total_time": "00:45:00"
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 201
    assert res.json["message"] == "Run added successfully"
    assert res.json["run"]["name"] == "Morning Run"
    assert res.json["run"]["distance"] == 5.0
    assert res.json["run"]["total_time"] == "00:45:00"
    assert "pace" in res.json["run"]       # automatic model pace calculation

def test_delete_run_success():
    client = app.test_client()

    # First, add a run to delete
    data = {
        "name": "Run to Delete",
        "date": "2025-01-20T10:00",
        "distance": 6.0,
        "total_time": "00:50:00"
    }

    res_add = client.post("/api/runs", json=data)
    run_id = res_add.json["run"]["id"]

    # Now delete the run
    res_delete = client.delete(f"/api/runs/{run_id}")

    assert res_delete.status_code == 200
    assert res_delete.json["message"] == "Run deleted successfully"

    # Verify deletion
    res_get = client.get("/api/runs")
    assert all(run["id"] != run_id for run in res_get.json["runs"])

# Test POST /api/runs with invalid time format
def test_add_run_invalid_time():
    client = app.test_client()

    data = {
        "name": "Bad Time Run",
        "date": "2025-01-15T09:30",
        "distance": 3.0,
        "total_time": "45 minutes"   # invalid
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 400
    assert res.json["error"] == "Time must be in HH:MM:SS format"


# Test POST /api/runs with invalid datetime format
def test_add_run_invalid_datetime():
    client = app.test_client()

    data = {
        "name": "Bad Date Run",
        "date": "15-01-2025 09:30",  # invalid
        "distance": 4.0,
        "total_time": "00:40:00"
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 400
    assert res.json["error"] == "Invalid datetime format. Use YYYY-MM-DDTHH:MM"


# Test POST /api/runs with missing fields
def test_add_run_missing_fields():
    client = app.test_client()

    data = {
        "name": "Oops",
        # missing date
        # missing total_time
        "distance": 2.5
    }

    res = client.post("/api/runs", json=data)

    # Could raise KeyError or 400 depending on your app
    assert res.status_code in (400, 500)


# Test GET /api/runs after adding a run
def test_get_runs_after_adding():
    client = app.test_client()

    # Add run
    client.post("/api/runs", json={
        "name": "Evening Run",
        "date": "2025-02-01T18:00",
        "distance": 4.0,
        "total_time": "00:32:00"
    })

    # Get runs
    res = client.get("/api/runs")

    assert res.status_code == 200
    assert len(res.json["runs"]) == 1
    assert res.json["runs"][0]["name"] == "Evening Run"

# Additional tests for mood routes can be added similarly

def test_add_mood_success():
    client = app.test_client()

    data = {
        "positivity_level": 8,
        "stress_level": 3,
        "energy_level": 7,
        "calmness_level": 6,
        "motivation_level": 9
    }

    res = client.post("/api/mood", json=data)

    assert res.status_code == 201
    assert res.json["message"] == "Mood added successfully"
    assert res.json["mood"]["positivity_level"] == 8
    assert res.json["mood"]["stress_level"] == 3
    assert res.json["mood"]["energy_level"] == 7
    assert res.json["mood"]["calmness_level"] == 6
    assert res.json["mood"]["motivation_level"] == 9

def test_get_moods_empty():
    client = app.test_client()
    res = client.get("/api/mood")
    assert res.status_code == 200
    assert res.json["moods"] == []

def test_get_moods_after_adding():
    client = app.test_client()

    # Add mood
    client.post("/api/mood", json={
        "positivity_level": 5,
        "stress_level": 4,
        "energy_level": 6,
        "calmness_level": 5,
        "motivation_level": 7
    })

    # Get moods
    res = client.get("/api/mood")

    assert res.status_code == 200
    assert len(res.json["moods"]) == 1
    assert res.json["moods"][0]["positivity_level"] == 5
    assert res.json["moods"][0]["stress_level"] == 4
    assert res.json["moods"][0]["energy_level"] == 6
    assert res.json["moods"][0]["calmness_level"] == 5
    assert res.json["moods"][0]["motivation_level"] == 7

def test_delete_mood_success():
    client = app.test_client()

    # Add mood
    res_add = client.post("/api/mood", json={
        "positivity_level": 7,
        "stress_level": 2,
        "energy_level": 8,
        "calmness_level": 7,
        "motivation_level": 8
    })

    mood_id = res_add.json["mood"]["id"]

    # Delete mood
    res_delete = client.delete(f"/api/mood/{mood_id}")

    assert res_delete.status_code == 200
    assert res_delete.json["message"] == "Mood deleted successfully"

    # Verify deletion
    res_get = client.get("/api/mood")
    assert all(mood["id"] != mood_id for mood in res_get.json["moods"])

def test_delete_mood_not_found():
    client = app.test_client()

    # Attempt to delete non-existent mood
    res_delete = client.delete("/api/mood/9999")  # Assuming 9999 does not exist

    assert res_delete.status_code == 404
    assert res_delete.json["error"] == "Mood not found"

