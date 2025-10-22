import api from './axios';

export const getAthletes = async () => {
  const { data } = await api.get('/athlete/all');
  return data
};