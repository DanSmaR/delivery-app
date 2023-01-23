const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');
const emailValidate = require('../Utils/email.validate');
const passwordValidate = require('../Utils/password.validate');

const userValidate = async (email, password) => {
    const user = await User.findOne({
        attributes: ['id', 'email', 'name', 'role'],
        where: { email, password },
    });

    if (!user) {
        const status = 404;
        const message = 'Not found';

        return { status, message };
    }

    const token = generateToken(user.dataValues);
    
    return { token };
};
    
const loginValidate = async ({ email, password }) => {
    const resultEmail = emailValidate(email);
    if (resultEmail !== null) {
        return resultEmail;
    }
    const resultPassword = passwordValidate(password);
    if (resultPassword !== null) {
        return resultPassword;
    }
    const result = await userValidate(email, password);
    return result;
};

module.exports = loginValidate;