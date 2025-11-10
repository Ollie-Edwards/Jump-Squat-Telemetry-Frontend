import api from './axios';

export const getAthletes = async () => {
  const { data } = await api.get('/athlete/all');
  return data
};

export const createAthlete = async (name : string) => {
  const { data } = await api.post('/athlete/create', { "name": name });
  return data
};