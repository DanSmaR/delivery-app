const md5 = require('md5');
const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');

const userValidate = async (name, email) => {
  const userEmail = await User.findOne({
    where: { email },
  });

  if (!userEmail) {
    const userName = await User.findOne({
      where: { name },
    });
    if (!userName) {
      return true;
    }
  }
  return false;
};
    
const registerValidate = async ({ name, email, password, role }) => {
  const userIsValid = await userValidate(name, email);
  if (userIsValid) {
      const created = await User
        .create({ name, email, password: md5(password), role });
      const { id } = created.dataValues;
      const user = {
        id,
        role,
        name,
        email,
      };
      const token = generateToken(user);

    return { status: 201, message: 'Created', user: { ...user, token } };
  }
  return { status: 409, message: 'Conflict' };
};

module.exports = registerValidate;
