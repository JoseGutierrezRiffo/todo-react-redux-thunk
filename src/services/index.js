import axios from "axios";

const urlBase = "https://61be34112a1dd4001708a28a.mockapi.io";

const getData = () =>
  axios
    .get(`${urlBase}/todos`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

const postData = (payload) =>
  axios
    .post(`${urlBase}/todos`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

const editData = (id, payload) =>
  axios
    .put(`${urlBase}/todos/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

const deleteData = (id) =>
  axios
    .delete(`${urlBase}/todos/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

const endpoint = {
  getData,
  postData,
  editData,
  deleteData,
};

export default endpoint;
