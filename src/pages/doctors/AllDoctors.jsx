import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../../store/features/doctor/doctorSlice";
import { getDoctorById } from "../../store/features/doctor/getDoctorSlice";
import { openModal } from "../../store/features/modal/modalSlice";
import UpdateDoctorModal from "./modal/UpdateDoctor";

const AllDoctors = () => {
  const [doctorId, setDoctorId] = useState("");
  const { isLoading, doctors, isError, error } = useSelector(
    (store) => store.doctors
  );
  const { doctor } = useSelector((store) => store.doctor);
  const { isModal } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const handleUpdateClick = (id) => {
    dispatch(getDoctorById({ doctorId: id }));
    dispatch(openModal());
    setDoctorId(id);
  };

  const columns = [
    {
      name: "Doctor",
      selector: (row) => row.fullname,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Total Earn",
      selector: (row) => row.total_earning,
    },
    {
      name: "Joined At",
      selector: (row) => new Date(row.created_at).toDateString(),
    },
    {
      name: "Featured",
      selector: (row) => (
        <label class="switch">
          <input
            type="checkbox"
            checked={row.is_featured}
            onChange={(e) => {
              dispatch(
                updateDoctor({
                  doctorId: row.id,
                  data: { is_featured: e.target.checked },
                })
              );
            }}
          />
          <span class="slider"></span>
        </label>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() =>
              dispatch(
                deleteDoctor({
                  doctorId: row.id,
                  data: { is_deleted: true },
                })
              )
            }
          >
            <AiOutlineDelete size={18} className="text-red-500" />
          </button>
          <button onClick={() => handleUpdateClick(row.id)}>
            <FiEdit size={18} className="text-green-500" />
          </button>
          <Link to={`/doctors/${row.id}`}>
            <FiExternalLink size={18} className="text-blue-500" />
          </Link>
        </div>
      ),
    },
  ];

  if (isError) {
    return <p className="text-2xl font-bold">{error}</p>;
  }

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={doctors.filter((doctor) => doctor.is_deleted === false)}
      />
      {isModal && <UpdateDoctorModal doctorId={doctorId} doctor={doctor} />}
    </div>
  );
};

export default AllDoctors;
