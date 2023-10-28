export default interface IUser {
  uuid: string;
  name: string;
  email: string;
  profilePictureURL: string | undefined;
  stripeSellerId: string | null;
  authProvider: string;
  verified: boolean;
}
