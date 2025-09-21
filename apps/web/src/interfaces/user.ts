interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt?: string;
  updatedAt?: string;
}
export default IUser;
