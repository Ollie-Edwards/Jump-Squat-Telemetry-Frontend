import api from './axios';

export const getAthletes = async () => {
  const { data } = await api.get('/athlete/all');
  return data
};

export const getAllAthleteTrials = async (name : string) => {
  const { data } = await api.get("/trial/all/"+name);
  return data
};

export const getSingleTrial = async (trialId : number) => {
  const { data } = await api.get("/trial/"+trialId);
  return data
};
