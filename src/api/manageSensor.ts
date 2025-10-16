// src/api/userService.js
import api from './axios';

// Begin ESP32 Recording
export const beginRecording = async (duration : number, name : string) => {
  const { data } = await api.post('/sensor/begin', {"duration": duration, "name": name});
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
