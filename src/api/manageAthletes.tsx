import api from './axios';

export const getAthletes = async () => {
  const { data } = await api.get('/athlete/all');
  return data
};

export const getAllAthleteTrials = async (name : string) => {
  const { data } = await api.get("/trial/"+name);
  return data
};
