const express = require('express');
const {getDebates, getDebate, postDebate, editDebate, deleteDebate} = require("../controllers/debates");
const {validId} = require("../middlewares/utils");
const {authenticate} = require("../middlewares/auth");
const {getVotesOfDebate, createVote, getTally, createTally, createSecureVote} = require("../controllers/votes");
const {checkUserRole} = require("../middlewares/user/checkUserRole");
const {validateVote} = require("../middlewares/debate/validateVote");
const {validateOnlyOneVote} = require("../middlewares/debate/validateOnlyOneVote");
const {validateVotingTime} = require("../middlewares/debate/validateVotingTime");
const {decryptVote} = require("../middlewares/debate/decryptVote");
const {getMessagesOfDebate, postMessage} = require("../controllers/messages");
const router = express.Router();


router.get('/',
    authenticate,
    getDebates
);

router.get('/:id',
    validId,
    authenticate,
    getDebate
);

router.get('/:id/votes',
    validId,
    authenticate,
    checkUserRole("admin"),
    getVotesOfDebate
);

router.post('/',
    authenticate,
    checkUserRole("admin"),
    validateVotingTime,
    postDebate
);

router.post('/:id/vote/secure',
    validId,
    authenticate,
    decryptVote,
    validateVote,
    validateOnlyOneVote,
    createSecureVote
);

router.get('/:id/result',
    validId,
    authenticate,
    getTally
);

router.get('/:id/tally',
    validId,
    authenticate,
    checkUserRole("admin"),
    createTally
);

router.put('/:id',
    validId,
    authenticate,
    checkUserRole("admin"),
    editDebate
);

router.delete('/:id',
    validId,
    authenticate,
    checkUserRole("admin"),
    deleteDebate
);

router.get('/:id/messages',
    validId,
    authenticate,
    getMessagesOfDebate
);

router.post('/:id/message',
    validId,
    authenticate,
    postMessage
);

module.exports = router;