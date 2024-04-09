export default interface AuthenticatedUser {
  id: string;
  username: string;
  jti: string;
  iss: string;
}