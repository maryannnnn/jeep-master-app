import axios from "axios";

export const getYears = async () =>
  await axios.get(`${process.env.REACT_APP_API}/years`);

export const getYear = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/year/${slug}`);

export const removeYear = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/year/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateYear = async (slug, year, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/year/${slug}`, year, {
    headers: {
      authtoken,
    },
  });

export const createYear = async (year, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/year`, year, {
    headers: {
      authtoken,
    },
  });


