import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  check_in_date: yup.date().required(),
  check_out_date: yup.date().required(),
  guest_id: yup.string().nullable(),
  room_id: yup.string().nullable(),
});
