const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');

const userValidate = async ({email, password}) => {
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

module.exports = userValidate;