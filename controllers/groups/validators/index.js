const { checkUserExists } = require('./validators/index');
const { checkParliamentaryGroupExists } = require('./validators/index');

module.exports = {
    checkUserExists,
    checkParliamentaryGroupExists
}