import { useNavigate } from "react-router-dom";

function PlanReady() {
  const navigate = useNavigate();

  return (
    <div className="success-box">
      <div className="success-icon">✓</div>

      <h1>Your Plan is Ready</h1>

      <p>
        Your MediClear medicine plan has been saved successfully. You can review
        it anytime and discuss it with your healthcare professional.
      </p>

      <button onClick={() => navigate("/todays-plan")}>
        View Plan
      </button>

      <button className="secondary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default PlanReady;