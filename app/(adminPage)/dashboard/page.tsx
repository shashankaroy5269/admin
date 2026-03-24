"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { AxiosInstance } from "@/api/axios/axios";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [dept, appoint, doctor] = await Promise.all([
        AxiosInstance.get("/admin/departments/list"),
        AxiosInstance.get("/admin/doctor/appointment/list"),
        AxiosInstance.get("/admin/doctor/list"),
      ]);

      setDepartments(dept?.data?.data || []);
      setAppointments(appoint?.data?.data ||  []);
      setDoctors(doctor?.data?.data || []);
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmed = appointments.filter(
    (a: any) => a.status === "Confirmed"
  );

  if (loading) {
    return <p style={{ color: "white" }}>Loading Dashboard...</p>;
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Dashboard Overview</h1>

      {/* 🔥 STATS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total Doctors</h3>
          <p>{doctors.length}</p>
        </div>

        <div className={styles.card}>
          <h3>Departments</h3>
          <p>{departments.length}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Appointments</h3>
          <p>{appointments.length}</p>
        </div>

        <div className={styles.card}>
          <h3>Confirmed</h3>
          <p>{confirmed.length}</p>
        </div>
      </div>

      {/* 📋 RECENT APPOINTMENTS */}
      <div className={styles.section}>
        <h2>Recent Appointments</h2>

        {appointments.length === 0 ? (
          <p>No Appointments Found</p>
        ) : (
          appointments.slice(0, 5).map((a: any) => (
            <div key={a._id} className={styles.row}>
              <div>
                <h4>{a?.name || "No Name"}</h4>
                <p>{a?.time || "No Time"}</p>
              </div>

              <span
                className={
                  a.status === "Confirmed"
                    ? styles.confirm
                    : styles.pending
                }
              >
                {a.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 👨‍⚕️ DOCTOR LIST */}
      <div className={styles.section}>
        <h2>Doctor List</h2>

        {doctors.length === 0 ? (
          <p>No Doctors Found</p>
        ) : (
          doctors.slice(0, 5).map((d: any) => (
            <div key={d._id} className={styles.row}>
              <div>
                <h4>{d?.name || d?.first_name || "No Name"}</h4>
                <p>{d?.email || "No Email"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}