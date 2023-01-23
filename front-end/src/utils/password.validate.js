module.exports = function passwordValidate(password) {
  const minPassLength = 6;
  if (password.length >= minPassLength) {
    return true;
  }
};
