const User = require('../../../models/users');

async function createUniqueUsername(name, surname) {
    let username = (name.substring(0, 3) + surname.substring(0, 3)).toLowerCase();
    let existingUser = await User.findOne({ username });
    let counter = 1;

    while (existingUser) {
        username = username + counter.toString();
        existingUser = await User.findOne({ username });
        counter++;
    }

    return username;
}

module.exports = createUniqueUsername;