module.exports = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email || !regex.test(email)) {
        const status = 400;
        const message = 'Invalid email';
        return { status, message };
    }
    return null;
};
