import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeparts } from "../../store/features/hospital/hospitalSlice";
import { RxCross2 } from "react-icons/rx";
import { publicRequest } from "../../requestMethods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createHospital } from "../../store/features/hospital/createHospitalSlice";

const CreateHospital = () => {
  const { departments } = useSelector((store) => store.hospitals);
  const { status, isLoading, isError, error } = useSelector(
    (store) => store.createHospital
  );
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    description: "",
    speciality: "",
    departments: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(inputs);

  useEffect(() => {
    dispatch(getDeparts());
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(createHospital(inputs));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "departments") {
      return setInputs((prev) => ({
        ...prev,
        [name]: [...prev[name], JSON.parse(value)],
      }));
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h2 className="text-3xl font-bold">Create Hospital</h2>

      {/* personal info */}
      <form onSubmit={handleFormSubmit}>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-2 mt-2 ">
            {/* name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                className="my-input peer"
                name="name"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.name}
              />
              <label htmlFor="name" className="my-label">
                Name
              </label>
            </div>
            {/* email */}
            <div className="relative">
              <input
                type="text"
                id="email"
                className="my-input peer"
                name="email"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.email}
              />
              <label htmlFor="email" className="my-label">
                Email
              </label>
            </div>
            {/* telephone */}
            <div className="relative">
              <input
                type="text"
                id="telephone"
                className="my-input peer"
                name="telephone"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.telephone}
              />
              <label htmlFor="telephone" className="my-label">
                Telephone
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 ">
            {/* address */}
            <div className="relative">
              <input
                type="text"
                id="address"
                className="my-input peer"
                name="address"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.address}
              />
              <label htmlFor="address" className="my-label">
                Address
              </label>
            </div>
            {/* speciality */}
            <div className="relative">
              <input
                type="text"
                id="speciality"
                className="my-input peer"
                name="speciality"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.speciality}
              />
              <label htmlFor="speciality" className="my-label">
                Speciality
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-2">
            {/* departments */}
            <div className="flexbox-start gap-2 flex-wrap">
              {inputs.departments?.map((depart) => {
                return (
                  <button className="flexbox-center bg-primary text-white rounded px-1">
                    {depart.name} <RxCross2 />
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <select
                name="departments"
                id="departments"
                className="my-input text-black"
                onChange={(e) => handleOnChange(e)}
                // value={inputs?.departments}
              >
                {departments?.map((depart) => {
                  return (
                    <option key={depart.id} value={JSON.stringify(depart)}>
                      {depart.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-2">
            {/* description */}
            <div className="relative">
              <textarea
                id="description"
                className="my-input peer"
                rows="4"
                name="description"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.description}
              />
              <label htmlFor="description" className="my-label">
                Description
              </label>
            </div>
          </div>

          <button className="form-btn">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateHospital;
