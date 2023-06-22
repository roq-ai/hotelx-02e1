import { ReservationInterface } from 'interfaces/reservation';
import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface RoomInterface {
  id?: string;
  number: number;
  type: string;
  status: string;
  hotel_id?: string;
  created_at?: any;
  updated_at?: any;
  reservation?: ReservationInterface[];
  hotel?: HotelInterface;
  _count?: {
    reservation?: number;
  };
}

export interface RoomGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  status?: string;
  hotel_id?: string;
}
