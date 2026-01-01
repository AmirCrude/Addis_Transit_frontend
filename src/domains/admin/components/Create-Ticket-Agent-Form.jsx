import React, { useState } from "react";
import styles from "./Create-Ticket-Agent.module.css";
import { createTicketAgentApi } from "../api/ticketAgents.api.js";

const CreateTicketAgentForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    department: "",
    position_title: "",
    office_region: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic frontend validation
    if (
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.department ||
      !formData.position_title ||
      !formData.office_region
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await createTicketAgentApi(formData);

      if (response.data.status === "success") {
        setSuccess("Ticket agent created successfully");
        setFormData({
          email: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          department: "",
          position_title: "",
          office_region: "",
        });
        
        
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Ticket Agent</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            ["email", "Email"],
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["phone_number", "Phone Number"],
            ["department", "Department"],
            ["position_title", "Position Title"],
            ["office_region", "Office Region"],
          ].map(([name, label]) => (
            <div className={styles.inputGroup} key={name}>
              <label className={styles.label}>{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`${styles.input} ${
                  error ? styles.inputError : ""
                }`}
              />
            </div>
          ))}

          <button className={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Official"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketAgentForm;
