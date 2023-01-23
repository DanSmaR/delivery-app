// const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');

const userValidate = async (email, name) => {
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
    
const registerValidate = async ({ name, email, password }) => {
    const userIsValid = await userValidate(name, email);
    if (userIsValid) {
        await User.create({ name, email, password });
        return { status: 201, message: 'Created' };
    }
    return { status: 409, message: 'Conflict'};
};

module.exports = registerValidate;