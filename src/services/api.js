export async function getDeparts() {
  try {
    const resp = await axios.get("http://localhost:4000/api/sectors");
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getHospitals() {
  try {
    const resp = await axios.get("http://localhost:4000/api/hospitals");
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
