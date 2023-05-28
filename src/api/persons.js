import axios from 'axios';

const api = 'http://localhost:3000/person'

export const getPerson = async (page) => {
  const data = await axios.get(`${api}?page=${page}&size=${2}`);
  return data;
}

export const addPerson = async (person) => {
  const data = await axios.post(`${api}`, person);
  return data;
}

export const updatePerson = async (person, id) => {
  const data = await axios.patch(`${api}/${id}`, person);
  return data;
}

export const removePerson = async (id) => {
  const data = await axios.delete(`${api}/${id}`);
  return data;
}

// tidak di gunakan, karena data di ambil dari yang sudah ada
// export const getPersonId = async (id) => {
//   const data = await axios.get(`${api}/${id}`)
//   return data;
// }