export interface UserI {
  _id?: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  street: string;
  house: string;
  flat: string;
}

export interface UserRegisterI {
  role: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  street: string;
  house: string;
  flat: string;
  password: string
}
