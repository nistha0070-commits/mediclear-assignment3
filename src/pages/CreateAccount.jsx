import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Account</h1>

      <p className="small-text">
        This demo collects basic patient information to create a medicine plan.
      </p>

      <label>Full Name</label>
      <input placeholder="Enter your full name" />

      <label>Email</label>
      <input type="email" placeholder="Enter your email" />

      <label>Password</label>
      <input type="password" placeholder="Create a password" />

      <div className="card">
        <p className="small-text">
          By continuing, you agree that MediClear is a support tool and does not
          replace advice from a doctor, GP, or pharmacist.
        </p>
      </div>

      <button onClick={() => navigate("/add-medicines")}>
        Create Account
      </button>
    </div>
  );
}

export default CreateAccount;