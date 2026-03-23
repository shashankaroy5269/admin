"use client";

import { useEffect, useState } from "react";
import {
  getAppointments,
  confirmAppointment,
  cancelAppointment,
} from "../../../Redux/services/appointments";

export default function AppointmentTable() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getAppointments();
    setData(res?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = async (id: string) => {
    await confirmAppointment(id);
    fetchData();
  };

  const handleCancel = async (id: string) => {
    await cancelAppointment(id);
    fetchData();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item._id} className="border-b">
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleConfirm(item._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleCancel(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}