import * as yup from 'yup';

export const AccountSchema = () => {
  return yup.object({
    dob : yup.string(),
    gender : yup.string()
  })
}