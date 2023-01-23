module.exports = function emailValidate(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (regex.test(email)) {
    return true;
  }
};
