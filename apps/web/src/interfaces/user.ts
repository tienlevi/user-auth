interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  verify: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export default IUser;
