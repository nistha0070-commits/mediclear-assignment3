import { useNavigate } from "react-router-dom";

function HelpfulQuestions() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Helpful Questions</h1>

      <p className="small-text">
        These questions can help you speak with your pharmacist, GP, or nurse.
      </p>

      <div className="card">
        <p>What is this medicine used for?</p>
      </div>

      <div className="card">
        <p>When should I take this medicine?</p>
      </div>

      <div className="card">
        <p>Are there any side effects I should watch for?</p>
      </div>

      <div className="card">
        <p>Can I take this medicine with my other medicines?</p>
      </div>

      <button onClick={() => navigate("/plan-ready")}>
        Finish Plan
      </button>
    </div>
  );
}

export default HelpfulQuestions;