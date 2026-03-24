"use client";

import { useEffect, useState } from "react";
import styles from "./appointment.module.css";
import { AxiosInstance } from "@/api/axios/axios";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");

  // 🔥 LOAD DATA
  const loadData = async () => {
    try {
      const res = await AxiosInstance.get(
        "/admin/doctor/appointment/list"
      );
      setAppointments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔍 FILTER
  const filtered = appointments
    .filter((a) => a.status === activeTab)
    .filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );

  // ✅ CONFIRM
  const handleConfirm = async (id: string) => {
    await AxiosInstance.put(`/admin/doctor/appointment/${id}, {}`);
    loadData();
  };

  // ❌ CANCEL
  const handleCancel = async (id: string) => {
    await AxiosInstance.put(
      `/admin/doctor/appointment/cancelld/${id}`,
      {}
    );
    loadData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointments</h1>

      {/* 🔍 SEARCH */}
      <input
        className={styles.search}
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔘 TABS */}
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("Pending")}
          className={activeTab === "Pending" ? styles.activeTab : ""}
        >
          Pending (
          {appointments.filter((a) => a.status === "Pending").length}
          )
        </button>

        <button
          onClick={() => setActiveTab("Confirmed")}
          className={activeTab === "Confirmed" ? styles.activeTab : ""}
        >
          Confirmed (
          {
            appointments.filter((a) => a.status === "Confirmed").length
          }
          )
        </button>
      </div>

      {/* 🧩 CARDS */}
      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <p>No appointments ❌</p>
        ) : (
          filtered.map((a) => (
            <div key={a._id} className={styles.card}>
              <h3>{a.name}</h3>

              <p>
                📅 {new Date(a.date).toDateString()}
              </p>

              <p>⏰ {a.time}</p>

              {/* STATUS */}
              <span
                className={
                  a.status === "Confirmed"
                    ? styles.confirmed
                    : styles.pending
                }
              >
                {a.status}
              </span>

              {/* ID */}
              <p className={styles.id}>{a._id}</p>

              {/* ACTIONS */}
              <div className={styles.actions}>
                {a.status === "Pending" && (
                  <button
                    onClick={() => handleConfirm(a._id)}
                    className={styles.confirmBtn}
                  >
                    Confirm
                  </button>
                )}

                <button
                  onClick={() => handleCancel(a._id)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}