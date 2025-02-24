const { scrypt, randomBytes, timingSafeEqual } = require("crypto");
const { promisify } = require("util");

// scrypt is callback based, so with promisify we can await it

const scryptAsync = promisify(scrypt);

//Hashing process has two methods. First method, you hash the password,
//second method, you need to compare the new sign-in password with the stored password.

export const hashedPassword = async function (password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
};

async function comparePassword(storedPassword, suppliedPassword) {
  // split() returns array

  const [hashedPassword, salt] = storedPassword.split(".");
  // we need to pass buffer values to timingSafeEqual
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  // we hash the new sign-in password
  const suppliedPasswordBuf = await scryptAsync(suppliedPassword, salt, 64);
  // compare the new supplied password with the stored hashed password
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

export async function comparingPwd(storedPwd, providedPwd) {
  const comparePwd = await comparePassword(storedPwd, providedPwd);
  return comparePwd;
}

// module.exports = { comparingPwd, hashedPassword };
