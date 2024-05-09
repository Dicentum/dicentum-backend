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

    let randomNum1 = Math.floor(Math.random() * 10);
    let randomNum2 = Math.floor(Math.random() * 10);

    username = username + randomNum1.toString() + randomNum2.toString();

    return username;
}

module.exports = createUniqueUsername;