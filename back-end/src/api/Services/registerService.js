// const { generateToken } = require('../Utils/jwt');
const { User } = require('../../database/models');
const emailValidate = require('../Utils/email.validate');
const passwordValidate = require('../Utils/password.validate');
    
const registerValidate = async ({ name, email, password }) => {
    const resultEmail = emailValidate(email);
    if (resultEmail !== null) {
        return resultEmail;
    }
    const resultPassword = passwordValidate(password);
    if (resultPassword !== null) {
        return resultPassword;
    }
    if (!name || name < 12) {
        const status = 400;
        const message = 'Invalid name';
    
        return { status, message };
    }
    User.create({ name, email, password });
    return { status: 201, message: 'Created' };
};

module.exports = registerValidate;