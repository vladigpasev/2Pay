export default interface IUser {
  uuid: string;
  name: string;
  email: string;
  profilePictureURL: string | undefined;
  authProvider: string;
  verified: boolean;
}

