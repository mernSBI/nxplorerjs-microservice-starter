interface IAuth {
  registerUser(data, keys): object;
  lohinUser(data): object;
  getAccessToken(data, keys): object;
}

export default IAuth;
