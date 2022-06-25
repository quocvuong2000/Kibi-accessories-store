import * as yup from 'yup';

export const AddressSchema = ()=> {
  return yup.object({
    address : yup.string().required("Please enter address")
  })
}