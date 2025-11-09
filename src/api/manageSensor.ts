// src/api/userService.js
import api from './axios';

// Begin ESP32 Recording
export const beginRecording = async (duration : number, trial_id : number, jump_number: number) => {
  const { data } = await api.post('/sensor/begin', {"duration": duration, "trial_id": trial_id, "jump_number": jump_number});
  return data
};

export const fetchRecords = async () => {
  const { data } = await api.get('/index');
  return data
};

export const getGraphData = async (id: number) => {
  const { data } = await api.get('/data/'+id);
  return data
};

export const pingSensor = async () => {
  const { data } = await api.get('/ping/');
  return data
};

export const createTrial = async (athlete_id : number , bar_weight : number , num_jumps : number) => {
  const { data } = await api.post('/trial/create', {"athlete_id": athlete_id, "bar_weight": bar_weight, "num_jumps": num_jumps});
  return data
};
