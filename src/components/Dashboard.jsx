import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../Style/Dashboard.css";
import UploadFile from "./UploadFile";

const COLORS = [
  "#1d4ed8", // accent-color
  "#f59e0b", // chart-orange
  "#8b5cf6", // chart-purple
  "#ec4899", // chart-pink
  "#9ca3af", // secondary-color
];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/economy-api/v1/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data.newAdminStatistics);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!stats) return <div className="dashboard-error">No data available.</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Total Users</h4>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="dashboard-card">
          <h4>Total Income</h4>
          <p>{stats.totalIncome}</p>
        </div>
        <div className="dashboard-card">
          <h4>Total Expenses</h4>
          <p>{stats.totalExpenses}</p>
        </div>
        <div className="dashboard-card">
          <h4>Balance</h4>
          <p>{stats.balance}</p>
        </div>
      </div>

      <h3 className="dashboard-subtitle">Top Categories</h3>
      <ul className="dashboard-list">
        {stats.topCategories.map((cat) => (
          <li key={cat._id}>
            {cat.category}: {cat.total}
          </li>
        ))}
      </ul>

      <h3 className="dashboard-subtitle">Top Categories Chart</h3>
      <div className="dashboard-chart">
        <PieChart width={400} height={300}>
          <Pie data={stats.topCategories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
            {stats.topCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <h3 className="dashboard-subtitle">User Classes</h3>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Class A</h4>
          <p>{stats.classAUsers}</p>
        </div>
        <div className="dashboard-card">
          <h4>Class B</h4>
          <p>{stats.classBUsers}</p>
        </div>
        <div className="dashboard-card">
          <h4>Class C</h4>
          <p>{stats.classCUsers}</p>
        </div>
      </div>

      <h3 className="dashboard-subtitle">Upload Price CSV File</h3>
      <UploadFile />
    </div>
  );
}

export default Dashboard;
