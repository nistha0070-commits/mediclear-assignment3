import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMedicines() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    medicine_name: "",
    dosage: "",
    timing: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("mediclear_plan", JSON.stringify(formData));
    navigate("/todays-plan");
  };

  return (
    <div>
      <h1>Add Discharge Medicines</h1>

      <p className="small-text">
        Enter your medicine details from your hospital discharge summary.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="full_name"
          placeholder="Enter patient name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Medicine Name</label>
        <input
          name="medicine_name"
          placeholder="Example: Panadol"
          value={formData.medicine_name}
          onChange={handleChange}
          required
        />

        <label>Dosage</label>
        <input
          name="dosage"
          placeholder="Example: 1 tablet"
          value={formData.dosage}
          onChange={handleChange}
          required
        />

        <label>Timing</label>
        <input
          name="timing"
          placeholder="Example: Morning after food"
          value={formData.timing}
          onChange={handleChange}
          required
        />

        <label>Notes</label>
        <textarea
          name="notes"
          placeholder="Any extra instructions"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Save Medicine Plan</button>
      </form>
    </div>
  );
}

export default AddMedicines;
