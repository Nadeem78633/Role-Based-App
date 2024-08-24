import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/dashboard/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.message);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{data}</p>
    </div>
  );
};

export default AdminDashboard;
