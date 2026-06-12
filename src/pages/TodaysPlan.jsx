import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mediclear-assignment3-dyj8.vercel.app";

function TodaysPlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("Loading saved medicine plans...");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${API_URL}/medicine-plans`);

        if (!response.ok) {
          throw new Error("Failed to load medicine plans");
        }

        const data = await response.json();
        setPlans(data);
        setMessage("");
      } catch (error) {
        console.error(error);
        setMessage("Unable to load saved medicine plans.");
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Today’s Plan</h1>

      <p className="small-text">Your saved medicine plan is shown below.</p>

      {message && <p className="small-text">{message}</p>}

      {plans.length === 0 && !message ? (
        <div className="card">
          <p>No medicine plan saved yet.</p>
        </div>
      ) : (
        plans.map((plan) => (
          <div className="card" key={plan.id}>
            <h2>{plan.medicine_name}</h2>
            <p>
              <strong>Patient:</strong> {plan.full_name}
            </p>
            <p>
              <strong>Dosage:</strong> {plan.dosage}
            </p>
            <p>
              <strong>Timing:</strong> {plan.timing}
            </p>
            <p>
              <strong>Notes:</strong> {plan.notes}
            </p>
            <p>
              <strong>Status:</strong> {plan.status}
            </p>
          </div>
        ))
      )}

      <button onClick={() => navigate("/helpful-questions")}>
        View Helpful Questions
      </button>
    </div>
  );
}

export default TodaysPlan;