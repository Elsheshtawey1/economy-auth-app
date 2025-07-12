import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UploadFile from "./UploadFile";
import "../Style/Dashboard.css";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { useDashboardStats } from "../hooks/useDashboardStats";


const COLORS = ["#1d4ed8", "#f59e0b", "#8b5cf6", "#ec4899", "#9ca3af"];

// to extract the role from the JWT token stored in localStorage
function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (e) {
    return null;
  }
}

function Dashboard() {
  const role = getRoleFromToken();
  const [blocked, setBlocked] = useState(role !== "admin");

  const { data: stats, isLoading, isError } = useDashboardStats();


  useEffect(() => {
    if (blocked) {
      Swal.fire({
        title: "⚠️ Access Denied",
        text: "Admins only. You are not authorized to view this page.",
        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didClose: () => {
          window.location.href = "/";
        },
      });
    }
  }, [blocked]);

  // Show error alert if there's an error and the user is not blocked
  useEffect(() => {
    if (!blocked && isError) {
      Swal.fire({
        title: "⚠️ Access Denied",
        text: "You do not have permission to access this data.",
        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didClose: () => {
          window.location.href = "/";
        },
      });
    }
  }, [isError, blocked]);


  if (blocked || isLoading) {
    return (
      <div className="dashboard-loading">
        <Loader />
      </div>
    );
  }

  if (!stats) return <div className="dashboard-error">No data available.</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome, Admin</h2>
        <p className="dashboard-sub">Here's an overview of your platform activity</p>
      </header>

      <section className="dashboard-kpis">
        {[
          { label: "Users", value: stats.totalUsers },
          { label: "Income", value: stats.totalIncome },
          { label: "Expenses", value: stats.totalExpenses },
          { label: "Balance", value: stats.balance },
        ].map((item, i) => (
          <div className="kpi-card" key={i}>
            <h4>{item.label}</h4>
            <p>{item.value ?? "N/A"}</p>
          </div>
        ))}
      </section>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <section className="dashboard-box">
            <h3>Top Categories</h3>
            <ul className="category-list">
              {Array.isArray(stats.topCategories) && stats.topCategories.length > 0 ? (
                stats.topCategories.map((cat) => (
                  <li key={cat._id}>
                    {cat.category}: {cat.total}
                  </li>
                ))
              ) : (
                <li>No categories found.</li>
              )}
            </ul>
          </section>

          <section className="dashboard-box">
            <h3>User Classes</h3>
            <div className="user-classes">
              {[
                { label: "Class A", value: stats.classAUsers },
                { label: "Class B", value: stats.classBUsers },
                { label: "Class C", value: stats.classCUsers },
              ].map((cls, idx) => (
                <div className="class-card" key={idx}>
                  <h4>{cls.label}</h4>
                  <p>{cls.value ?? "N/A"}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-box" id="upload-file">
            <h3>Upload Price CSV</h3>
            <UploadFile />
          </section>
        </div>

        <div className="dashboard-right">
          <section className="dashboard-box">
            <h3>Top Categories Chart</h3>
            <div className="chart-wrapper">
              {Array.isArray(stats.topCategories) && stats.topCategories.length > 0 ? (
                <PieChart width={360} height={300}>
                  <Pie data={stats.topCategories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                    {stats.topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <p>No chart data available.</p>
              )}
            </div>
          </section>

          <section className="dashboard-box">
            <h3>Raw API Details</h3>
            <div className="raw-details">
              <p>
                <strong>_id:</strong> {stats._id ?? "N/A"}
              </p>
              <p>
                <strong>Created:</strong> {stats.createdAt ? new Date(stats.createdAt).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>Updated:</strong> {stats.updatedAt ? new Date(stats.updatedAt).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>__v:</strong> {stats.__v ?? "N/A"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
