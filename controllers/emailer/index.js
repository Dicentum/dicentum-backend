const sendEmail = require("./sendEmail");
const { welcomeSubject} = require("./texts/subjects");
const { welcomeText } = require("./texts/texts");

module.exports = {
    sendEmail,
    welcomeSubject,
    welcomeText
}