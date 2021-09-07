import bcrypt from 'bcrypt';
const hashPassword = (password: string) => {
  try {
    const saltRounds = 10;
    const hashPassword = bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};
export default hashPassword;
