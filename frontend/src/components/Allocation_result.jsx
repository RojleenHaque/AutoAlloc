import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const AllocationResult = () => {
  const { studentId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllocationResult = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/allocation/allocation-result/${studentId}`
      );
      const data = await response.json();

      if (!response.ok) {
        setResult({ error: data.message });
        setLoading(false);
        return;
      }

      setResult(data);
      setLoading(false);
    } catch (error) {
      setResult({ error: "Failed to fetch allocation result" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocationResult();
    const interval = setInterval(fetchAllocationResult, 5000);
    return () => clearInterval(interval);
  }, [studentId]);

  const getImageFormat = (url) => {
    if (!url) return "PNG";
    if (url.startsWith("data:image/png")) return "PNG";
    if (url.startsWith("data:image/jpeg")) return "JPEG";
    return "PNG";
  };

  const downloadForm = () => {
    const doc = new jsPDF();

    doc.text(`Student ID: ${result.studentId || ""}`, 10, 10);
    doc.text(`Name: ${result.name || ""}`, 10, 20);
    doc.text(`Email: ${result.email || ""}`, 10, 30);
    doc.text(`Department: ${result.department || ""}`, 10, 40);
    doc.text(`Hall Choice: ${result.hallChoice || ""}`, 10, 50);
    doc.text(`Allocated Room: ${result.allocatedRoom || ""}`, 10, 60);
    doc.text(`Father's Name: ${result.fatherName || ""}`, 10, 70);
    doc.text(`Mother's Name: ${result.motherName || ""}`, 10, 80);
    doc.text(`Native Address: ${result.nativeAddress || ""}`, 10, 90);
    doc.text(`Section: ${result.section || ""}`, 10, 100);
    doc.text(
      `Has Relative in Rajshahi: ${result.hasRelative ? "Yes" : "No"}`,
      10,
      110
    );
    doc.text(`Status: ${result.status || ""}`, 10, 120);

    if (result.profilePhoto) {
      doc.addImage(
        result.profilePhoto,
        getImageFormat(result.profilePhoto),
        10,
        130,
        50,
        50
      );
    }

    if (result.signature) {
      doc.addImage(
        result.signature,
        getImageFormat(result.signature),
        60,
        130,
        50,
        50
      );
    }

    doc.save(`allocation-form-${result.studentId}.pdf`);
  };

  if (loading) return <p>Loading...</p>;
  if (result?.error) return <p style={{ color: "red" }}>{result.error}</p>;

  return (
<div className="allocation-container">
  <h2>Allocation Result</h2>

  <div className="allocation-content">
    {/* LEFT - INFO */}
    <div className="allocation-info">
      <p className="allocation-field">
        <strong>Student ID:</strong> {result.studentId}
      </p>
      <p className="allocation-field">
        <strong>Name:</strong> {result.name}
      </p>
      <p className="allocation-field">
        <strong>Email:</strong> {result.email}
      </p>
      <p className="allocation-field">
        <strong>Department:</strong> {result.department}
      </p>
      <p className="allocation-field">
        <strong>Hall Choice:</strong> {result.hallChoice}
      </p>
      <p className="allocation-field">
        <strong>Allocated Room:</strong> {result.allocatedRoom}
      </p>
      <p className="allocation-field">
        <strong>Father's Name:</strong> {result.fatherName}
      </p>
      <p className="allocation-field">
        <strong>Mother's Name:</strong> {result.motherName}
      </p>
      <p className="allocation-field">
        <strong>Native Address:</strong> {result.nativeAddress}
      </p>
      <p className="allocation-field">
        <strong>Section:</strong> {result.section}
      </p>
      <p className="allocation-field">
        <strong>Has Relative:</strong> {result.hasRelative ? "Yes" : "No"}
      </p>
      <p className="allocation-field">
        <strong>Status:</strong>{" "}
        <span
          className={`allocation-status ${
            result.status === "pending"
              ? "pending"
              : result.status === "approved"
              ? "approved"
              : result.status === "rejected"
              ? "rejected"
              : ""
          }`}
        >
          {result.status}
        </span>
      </p>

      {/* Signature below text */}
      {result.signature && (
        <div className="allocation-signature">
          <div className="photo-label">Signature</div>
          <img
            src={result.signature}
            alt="Signature"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
    </div>

    {/* RIGHT - PROFILE PHOTO */}
    {result.profilePhoto && (
      <div className="allocation-profile-photo">
        <img
          src={result.profilePhoto}
          alt="Profile"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="photo-label">Profile Photo</div>
      </div>
    )}
  </div>

  <div className="allocation-buttons">
    <button onClick={downloadForm}>Download Form as PDF</button>
  </div>
</div>

  );
 };

export default AllocationResult;

