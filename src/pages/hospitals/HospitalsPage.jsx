import React, { useEffect } from "react";
import { getHospitals } from "../../store/features/hospital/hospitalSlice";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const HospitalsPage = () => {
  const { hospitals } = useSelector((store) => store.hospitals);
  console.log(hospitals);
  const dispatch = useDispatch();

  const columns = [
    {
      name: "Hospital Name",
      selector: (row) => row.name,
    },
    {
      name: "Email Id",
      selector: (row) => row.email,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Telephone",
      selector: (row) => row.telephone,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toDateString(),
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

  useEffect(() => {
    dispatch(getHospitals());
  }, []);
  return (
    <div className="">
      <DataTable columns={columns} data={hospitals} />
    </div>
  );
};

export default HospitalsPage;
