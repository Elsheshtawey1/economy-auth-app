import React, { useState } from "react";
import axios from "axios";
import "../Style/UploadFile.css";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/economy-api/v1/ai/upload-price-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("File uploaded successfully!");
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3 className="upload-title">Upload Price CSV File</h3>
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} className="upload-input" />
        <button type="submit" className="upload-button" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="upload-success">{message}</p>}
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}

export default UploadFile;
