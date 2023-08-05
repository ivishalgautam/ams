import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { setFieldValue } from "../../store/features/inputs/inputSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeparts,
  getHospitals,
} from "../../store/features/hospital/hospitalSlice";

const selectOptions = [
  { value: "sunday", label: "sunday" },
  { value: "monday", label: "monday" },
  { value: "tuesday", label: "tuesday" },
  { value: "wednesday", label: "wednesday" },
  { value: "thursday", label: "thursday" },
  { value: "friday", label: "friday" },
  { value: "saturday", label: "saturday" },
];

const CreateDoctor = () => {
  const { departments, hospitals } = useSelector((store) => store.hospitals);
  const inputs = useSelector((store) => store.inputs);

  const [options, setOptions] = useState(selectOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeparts());
    dispatch(getHospitals());
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    if (name === "schedule_days") {
      setSelectedOptions((prev) => [...prev, value]);
      return dispatch(
        setFieldValue({
          field: "schedule_days",
          value: [...selectedOptions, value],
        })
      );
    }
    dispatch(setFieldValue({ field: name, value: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:4000/api/doctors", {
        ...inputs,
      });
      if (resp.status === 200) {
        // alert()
        toast.success(`Dr. ${resp.data.fullname} created.`);
        navigate("/doctors");
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Create Doctor</h2>

      {/* personal info */}
      <form onSubmit={handleFormSubmit}>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-2 mt-2 ">
            <div className="relative">
              <input
                type="text"
                id="fullname"
                className="my-input peer"
                name="fullname"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.fullname}
              />
              <label htmlFor="fullname" className="my-label">
                Fullname
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="phone"
                className="my-input peer"
                placeholder=""
                name="phone"
                onChange={(e) => handleOnChange(e)}
                value={inputs?.phone}
              />
              <label htmlFor="phone" className="my-label">
                Phone
              </label>
            </div>
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
          </div>
        </div>

        {/* credentials */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-2 mt-2 ">
            <div className="relative">
              <input
                type="text"
                id="username"
                className="my-input peer"
                name="username"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.username}
              />
              <label htmlFor="username" className="my-label">
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="my-input peer"
                name="password"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.password}
              />
              <label htmlFor="password" className="my-label">
                Password
              </label>
            </div>
          </div>
        </div>

        {/* qualifications */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-2 mt-2 ">
            <div className="relative">
              <select
                name="department_id"
                id="department_id"
                className="my-input text-black "
                onChange={(e) => handleOnChange(e)}
                value={inputs?.department_id}
              >
                {departments?.map((depart) => {
                  return (
                    <option key={depart.id} value={depart.id}>
                      {depart.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="department_id" className="my-label">
                Department
              </label>
            </div>
            <div className="relative">
              <input
                type="qualification"
                id="qualification"
                className="my-input peer"
                name="qualification"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.qualification}
              />
              <label htmlFor="qualification" className="my-label">
                Qualification
              </label>
            </div>
            <div className="relative">
              <input
                type="institution"
                id="institution"
                className="my-input peer"
                name="institution"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.institution}
              />
              <label htmlFor="institution" className="my-label">
                Institution
              </label>
            </div>
            <div className="relative">
              <select
                name="hospital_id"
                id="hospital_id"
                className="my-input text-black "
                onChange={(e) => handleOnChange(e)}
                value={inputs?.hospital_id}
              >
                {hospitals?.map((hospital) => {
                  return (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="hospital_id" className="my-label">
                Hospital
              </label>
            </div>
          </div>
        </div>

        {/* address */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-2 mt-2 ">
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
            <div className="relative">
              <input
                type="location"
                id="location"
                className="my-input peer"
                name="location"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.location}
              />
              <label htmlFor="location" className="my-label">
                Location
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-2 mt-2 ">
            <div className="relative">
              <input
                type="text"
                id="fees"
                className="my-input peer"
                name="fees"
                placeholder=""
                onChange={(e) => handleOnChange(e)}
                value={inputs?.fees}
              />
              <label htmlFor="fees" className="my-label">
                Fees
              </label>
            </div>
            <div className="relative">
              <div className="flex flex-wrap gap-1 absolute top-1/2 left-4 -translate-y-1/2">
                {inputs?.schedule_days.map((day, key) => {
                  return (
                    <div
                      key={key}
                      className="px-1.5 py-0.5 text-sm rounded-md bg-primary flexbox-center text-white capitalize gap-1"
                    >
                      {day}
                      <button type="button">
                        <RxCross1
                          className="font-extrabold"
                          size={12}
                          onClick={() => {
                            dispatch(
                              setFieldValue({
                                field: "schedule_days",
                                value: inputs?.schedule_days.filter(
                                  (item) => item !== day
                                ),
                              })
                            );
                            setSelectedOptions((prev) =>
                              prev.filter((item) => item !== day)
                            );
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <select
                name="schedule_days"
                id="schedule_days"
                className="my-input"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option aria-readonly disabled selected>
                  Select days
                </option>
                {options
                  .filter((option) => !selectedOptions.includes(option.label))
                  .map((option, key) => {
                    return (
                      <option
                        key={key}
                        value={option.value}
                        className="text-black"
                      >
                        {option.label}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor="schedule_days" className="my-label">
                Schedule days
              </label>
            </div>
            <div className="relative col-span-2">
              <textarea
                id="about"
                className="my-input peer"
                name="about"
                cols="30"
                rows="4"
                onChange={(e) => handleOnChange(e)}
                value={inputs?.about}
              />
              <label htmlFor="about" className="my-label">
                About
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDoctor;
