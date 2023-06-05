import crypto from "crypto";
class HashHelper {
  hashPassword(input) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(input, salt, 1000, 64, "sha512")
      .toString("hex");
    return {
      salt,
      hashedPassword,
    };
  }
  comparePassword({ hashPassword, salt, rawPassword }) {
    const hashedRawPassword = crypto
      .pbkdf2Sync(rawPassword, salt, 1000, 64, "sha512")
      .toString("hex");
    return hashedRawPassword === hashPassword;
  }
  genrateRandomToken() {
    return crypto.randomBytes(16).toString("hex");s
  }
}
const hashPassword = (input) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(input, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hashedPassword,
  };
};
const comparePassword = ({ hashPassword, salt, rawPassword }) => {};
const genrateRandomToken = () => {}
export default new HashHelper();
