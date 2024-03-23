//emailer/texts/texts.js
const {ORIGIN} = require("../../../utils/config");

const welcomeText = (name, username, id, code) => {
    const emailText = `
    <div style="font-family: system-ui, sans-serif; color: #333;">
        <img src="https://i.imgur.com/NfS0jX3.png" alt="Logo" style="width: 200px;"><br>
        <p>Hello <b>${name}</b>,</p>
        <p>Thank you for registering in Dicentum. Your username is <b>${username}</b>.</p>
        <p>Your single-use code to validate your account is <b>${code}</b></p>
        <br>
        <p>Please click the following link to validate your account:</p>
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" width="200" height="50" bgcolor="#316bfe" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;">
                    <a href="${ORIGIN}/validate/${id}" style="font-size:16px; font-weight: normal; font-family: system-ui; text-decoration: none; line-height:50px; width:100%; display:inline-block; text-align: center">
                    <span style="color: #ffffff;">Validate Account</span>
                    </a>
                </td>
            </tr>
        </table>
        <br>
        <p>Keep this number and the link secret.</p>
        <br>
        <p>Best regards,</p>
        <p>Dicentum Team</p>
    </div>`;
    return emailText;
}

module.exports = { welcomeText };