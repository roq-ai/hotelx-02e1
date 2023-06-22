import * as yup from 'yup';

export const roomValidationSchema = yup.object().shape({
  number: yup.number().integer().required(),
  type: yup.string().required(),
  status: yup.string().required(),
  hotel_id: yup.string().nullable(),
});
