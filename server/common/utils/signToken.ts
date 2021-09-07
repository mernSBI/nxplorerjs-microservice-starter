import jwt from 'jsonwebtoken';
const signToken = (userId: string, secretKey: string, expiresIn: string) => {
  return jwt.sign({ _id: userId }, secretKey, { expiresIn });
};

const decodeToken = (token, key) => {
  const decode = jwt.verify(token, key);
  return decode;
};

export default signToken;
export { decodeToken };
