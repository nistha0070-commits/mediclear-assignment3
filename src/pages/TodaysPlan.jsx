import { useNavigate } from "react-router-dom";

function TodaysPlan() {
  const navigate = useNavigate();
  const savedPlan = JSON.parse(localStorage.getItem("mediclear_plan"));

  return (
    <div>
      <h1>Today’s Plan</h1>

      <p className="small-text">Your saved medicine plan is shown below.</p>

      {!savedPlan ? (
        <div className="card">
          <p>No medicine plan saved yet.</p>
        </div>
      ) : (
        <div className="card">
          <h2>{savedPlan.medicine_name}</h2>
          <p>
            <strong>Patient:</strong> {savedPlan.full_name}
          </p>
          <p>
            <strong>Dosage:</strong> {savedPlan.dosage}
          </p>
          <p>
            <strong>Timing:</strong> {savedPlan.timing}
          </p>
          <p>
            <strong>Notes:</strong> {savedPlan.notes}
          </p>
          <p>
            <strong>Status:</strong> saved
          </p>
        </div>
      )}

      <button onClick={() => navigate("/helpful-questions")}>
        View Helpful Questions
      </button>
    </div>
  );
}

export default TodaysPlan;