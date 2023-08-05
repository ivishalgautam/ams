import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/features/modal/modalSlice";
import {
  getDeparts,
  getHospitals,
} from "../../../store/features/hospital/hospitalSlice";
import {
  clearAllFields,
  setFieldValue,
} from "../../../store/features/inputs/inputSlice";
import { clearDoctor } from "../../../store/features/doctor/getDoctorSlice";
import { updateDoctor } from "../../../store/features/doctor/doctorSlice";

const selectOptions = [
  { value: "sunday", label: "sunday" },
  { value: "monday", label: "monday" },
  { value: "tuesday", label: "tuesday" },
  { value: "wednesday", label: "wednesday" },
  { value: "thursday", label: "thursday" },
  { value: "friday", label: "friday" },
  { value: "saturday", label: "saturday" },
];

export default function UpdateDoctorModal({ doctorId }) {
  const { isLoading, isError, error, doctor } = useSelector(
    (store) => store.doctor
  );
  const inputs = useSelector((store) => store.inputs);
  const { isModal } = useSelector((store) => store.modal);
  const { hospitals, departments } = useSelector((store) => store.hospitals);

  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null);
  const formRef = useRef();

  const [options, setOptions] = useState(selectOptions);
  const [selectedOptions, setSelectedOptions] = useState(doctor?.schedule_days);

  useEffect(() => {
    dispatch(getDeparts());
    dispatch(getHospitals());
  }, []);

  useEffect(() => {
    for (const [field, value] of Object.entries(doctor)) {
      dispatch(setFieldValue({ field, value }));
    }
    return () => {
      dispatch(clearAllFields());
    };
  }, [doctor]);

  function handleModalClose() {
    dispatch(closeModal());
    dispatch(clearAllFields());
    dispatch(clearDoctor());
  }

  function handleUpdate(doctorId) {
    dispatch(updateDoctor({ doctorId: doctorId, data: inputs }));
    dispatch(closeModal());
    dispatch(clearAllFields());
  }

  return isError ? (
    error
  ) : (
    <Transition.Root show={isModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl p-4">
                <h2 className="text-2xl text-gray-800 text-center font-bold mb-8 ">
                  Update Doctor
                </h2>

                <div>
                  {/* personal info */}
                  <form ref={formRef}>
                    <div className="mt-6">
                      <div className="grid grid-cols-3 gap-2 mt-2 ">
                        <div className="relative">
                          <input
                            type="text"
                            id="fullname"
                            className="my-input peer"
                            name="fullname"
                            placeholder=""
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
                            value={inputs?.department_id}
                          >
                            {departments?.map((depart) => {
                              return (
                                <option
                                  selected={
                                    depart.id === inputs?.department_id
                                      ? true
                                      : false
                                  }
                                  key={depart.id}
                                  value={depart.id}
                                >
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
                            value={inputs?.hospital_id}
                          >
                            {hospitals?.map((hospital) => {
                              return (
                                <option
                                  selected={
                                    hospital.id === inputs?.hospital_id
                                      ? true
                                      : false
                                  }
                                  key={hospital.id}
                                  value={hospital.id}
                                >
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
                            value={inputs?.fees}
                          />
                          <label htmlFor="fees" className="my-label">
                            Fees
                          </label>
                        </div>
                        <div className="relative">
                          <div className="flex flex-wrap gap-1">
                            {selectedOptions?.map((day, key) => {
                              return (
                                <span
                                  key={key}
                                  className="px-2 rounded-md bg-primary"
                                >
                                  {day}
                                </span>
                              );
                            })}
                          </div>
                          <select
                            name="schedule_days"
                            id="schedule_days"
                            className="my-input text-black"
                            onChange={(e) => {
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              );
                              setSelectedOptions((prev) => [
                                ...prev,
                                e.target.value,
                              ]);
                            }}
                          >
                            <option aria-readonly disabled>
                              Select days
                            </option>
                            {options
                              ?.filter(
                                (option) =>
                                  !selectedOptions?.includes(option.value)
                              )
                              ?.map((option, key) => {
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
                            onChange={(e) =>
                              dispatch(
                                setFieldValue({
                                  field: e.target.name,
                                  value: e.target.value,
                                })
                              )
                            }
                            value={inputs?.about}
                          />
                          <label htmlFor="about" className="my-label">
                            About
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark sm:ml-3 sm:w-auto"
                    onClick={() => handleUpdate(doctorId)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleModalClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
