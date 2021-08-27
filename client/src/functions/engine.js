import axios from "axios";

export const getEngines = async () =>
  await axios.get(`${process.env.REACT_APP_API}/engines`);

export const getEngine = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/engine/${slug}`);

export const removeEngine = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/engine/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateEngine = async (slug, engine, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/engine/${slug}`, engine, {
    headers: {
      authtoken,
    },
  });

export const createEngine = async (engine, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/engine`, engine, {
    headers: {
      authtoken,
    },
  });


