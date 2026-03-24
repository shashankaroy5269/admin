 "use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/store/provider";
import { fetchDoctors, deleteDoctor } from "../../../Redux/slice/doctorSlice";
import { AxiosInstance } from "@/api/axios/axios";
import Swal from "sweetalert2";
import EditModal from "@/app/component/modals/EditModal";
import "./DoctorList.css";

const DoctorList = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [departments, setDepartments] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    fees: "",
    departmentId: "",
    schedule: {
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
  });

  // FETCH DOCTOR
  useEffect(() => {
    dispatch(fetchDoctors({ page, limit: 5, search }));
  }, [page, search]);

  // FETCH DEPARTMENT
  useEffect(() => {
    const getDept = async () => {
      const res = await AxiosInstance.get("/admin/departments/list");
      setDepartments(res.data.data);
    };
    getDept();
  }, []);

  // DELETE
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete Doctor?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteDoctor(id));
      }
    });
  };

  // VIEW
  const handleView = async (id: string) => {
    const res = await AxiosInstance.get(`/admin/doctor/details/${id}`);
    setSelectedDoc(res.data.data);
    setShowView(true);
  };

  // EDIT
  const handleEdit = (doc: any) => {
    setSelectedDoc(doc);

    setForm({
      name: doc.name,
      fees: doc.fees,
      departmentId: doc.departmentId,
      schedule: doc.schedule  {
        startTime: "",
        endTime: "",
        slotDuration: "",
      },
    });

    setShowEdit(true);
  };

  // SAVE
  const handleSave = async () => {
    try {
      await AxiosInstance.post("/admin/doctor/update", {
        id: selectedDoc._id,
        ...form,
      });

      Swal.fire("Updated!", "", "success");

      setShowEdit(false);
      dispatch(fetchDoctors({ page, limit: 5, search }));
    } catch {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="top-bar">
        <h2>👨‍⚕️ Doctor Management</h2>
        <a href="/doctors/create" className="add-btn">
          + Add Doctor
        </a>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search doctor..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Fees</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan={4}>Loading...</td></tr>
          ) : (
            doctors?.map((doc: any) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>₹{doc.fees}</td>
                <td>{doc.department?.name || "N/A"}</td>

                <td>
                  <button
                    className="btn view"
                    onClick={() => handleView(doc._id)}
                  >
                    View
                  </button>

                  <button
                    className="btn edit"
                    onClick={() => handleEdit(doc)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete"
                    onClick={() => handleDelete(doc._id)} >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      {showView && selectedDoc && (
        <div className="overlay" onClick={() => setShowView(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="avatar">
              {selectedDoc.name.charAt(0)}
            </div>

            <h2>{selectedDoc.name}</h2>
            <p>💰 ₹{selectedDoc.fees}</p>
            <p>🏥 {selectedDoc.department?.name || "N/A"}</p>

            <div className="modal-btns">
              <button
                className="edit-btn"
                onClick={() => {
                  setShowView(false);
                  handleEdit(selectedDoc);
                }}
              >
                Edit
              </button>

              <button
                className="close-btn"
                onClick={() => setShowView(false)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      <EditModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        departments={departments}
      />

    </div>
  );
};

export default DoctorList;