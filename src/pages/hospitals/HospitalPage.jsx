import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHospitals } from "../../store/features/hospital/hospitalSlice";

const HospitalPage = () => {
  const { hospitals } = useSelector((dtore) => store.hospitals);
  console.log(hospitals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHospitals());
  }, []);

  return <div></div>;
};

export default HospitalPage;
