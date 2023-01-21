const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');

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
    console.log('chegou no servise');
    if (!email || !password || email.length <= 0 || password.length <= 0) {
        const status = 400;
        const message = 'Invalid fields';

        return { status, message };
    }
    const result = await userValidate(email, password);
    console.log('buscou a info');
    return result;
};

module.exports = loginValidate;