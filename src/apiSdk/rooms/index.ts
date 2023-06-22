import axios from 'axios';
import queryString from 'query-string';
import { RoomInterface, RoomGetQueryInterface } from 'interfaces/room';
import { GetQueryInterface } from '../../interfaces';

export const getRooms = async (query?: RoomGetQueryInterface) => {
  const response = await axios.get(`/api/rooms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRoom = async (room: RoomInterface) => {
  const response = await axios.post('/api/rooms', room);
  return response.data;
};

export const updateRoomById = async (id: string, room: RoomInterface) => {
  const response = await axios.put(`/api/rooms/${id}`, room);
  return response.data;
};

export const getRoomById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rooms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRoomById = async (id: string) => {
  const response = await axios.delete(`/api/rooms/${id}`);
  return response.data;
};
