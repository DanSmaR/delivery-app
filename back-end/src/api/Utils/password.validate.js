module.exports = (password) => {
    if (!password || password.length <= 0) {
        const status = 400;
        const message = 'Invalid password';
    
        return { status, message };
    }
    return null;
};