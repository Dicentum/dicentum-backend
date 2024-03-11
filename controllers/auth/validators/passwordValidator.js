// passwordValidator.js
function validatePassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;

    return passwordRegex.test(password);
}

module.exports = validatePassword;

/*
At least 8 characters long
Contains at least one uppercase letter
Contains at least one lowercase letter
Contains at least one digit*/
