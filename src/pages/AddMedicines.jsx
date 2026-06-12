import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mediclear-assignment3-dyj8.vercel.app";

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

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving medicine plan...");

    try {
      const response = await fetch(`${API_URL}/medicine-plans`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error || "Failed to save medicine plan");
}

      setMessage("Medicine plan saved successfully.");

      setTimeout(() => {
        navigate("/todays-plan");
      }, 1000);
    } catch (error) {
  console.error(error);
  setMessage(error.message);
}
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

      {message && <p className="small-text">{message}</p>}
    </div>
  );
}

export default AddMedicines;