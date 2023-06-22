import { UserInterface } from 'interfaces/user';
import { RoomInterface } from 'interfaces/room';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  check_in_date: any;
  check_out_date: any;
  guest_id?: string;
  room_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  room?: RoomInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_id?: string;
  room_id?: string;
}
