import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="logo-circle">💊</div>

      <h1>MediClear</h1>

      <p>
        Understand your medicines clearly after hospital discharge. Create a
        simple medicine plan and review helpful questions for your pharmacist or GP.
      </p>

      <div className="card">
        <h2>What MediClear helps with</h2>
        <p>• Add discharge medicines</p>
        <p>• View a daily medicine plan</p>
        <p>• Prepare questions for healthcare professionals</p>
      </div>

      <button onClick={() => navigate("/create-account")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;