const {checkDebateExists} = require("../debates/validators/checkDebateExists");
const {checkParliamentExists} = require("../parliament/validators/checkParliamentExists");
const userVotes = require("../../models/userVotes");
const debateResult = require("../../models/debateResult");
const {checkParliamentaryGroupExists} = require("../groups/validators");
const fs = require("fs");
const JSEncrypt = require("node-jsencrypt");

const privateKeyFilePath = 'certificates/private_key.pem';

const createTally = async (req, res) => {
  try {
      const {id} = req.params;
      const debate = await checkDebateExists(id);

      if(!debate) return res.status(404).json({ message: "Debate not found" });

      const privateKey = fs.readFileSync(privateKeyFilePath, 'utf8');

      const resultExists = await debateResult.findOne({debate: debate._id.toString()});
        if(resultExists){
            debate.isClosed = true;
            debate.debateResult = resultExists._id;
            await debate.save();
            return res.status(400).json({ message: "Tally was already done in this debate" });
        }

      const votesIds = await userVotes.find({debate: debate._id.toString()});
      const parliamentId = debate.parliament;
      const parliament = await checkParliamentExists(parliamentId);
      const parliamentGroupsIds = parliament.parliamentaryGroups;
      let parliamentGroups = [];
      let usersRegistered = 0;

      for (let i = 0; i < parliamentGroupsIds.length; i++) {
            const group = await checkParliamentaryGroupExists(parliamentGroupsIds[i]);
            usersRegistered += group.users.length;
            parliamentGroups.push(group);
      }

      let votes = [];
      let tally = {yes: 0, no: 0, abstention: 0, notPresent: 0};

      let crypt = new JSEncrypt();
      crypt.setPrivateKey(privateKey);

      for (let i = 0; i < votesIds.length; i++) {
          const vote = await userVotes.findById(votesIds[i]);
          let enc = crypt.decrypt(vote.vote);
          vote.vote = enc;
          votes.push(vote);
      }

      if(votes.length === 0) return res.status(404).json({ message: "Votes not found" });
      if(votes.length > parliament.totalSeats) return res.status(400).json({ message: "Votes are greater than total seats" });
      if(votes.length > usersRegistered) return res.status(400).json({ message: "Votes are greater than registered users" });
      if(votes.length < usersRegistered) {
            const notPresent = usersRegistered - votes.length;
            tally.notPresent = notPresent;
      };

      for (let i = 0; i < votes.length; i++) {
          if(votes[i].vote === "yes") tally.yes++;
          if(votes[i].vote === "no") tally.no++;
          if(votes[i].vote === "abstain") tally.abstention++;
      }

      const result = new debateResult({
                affirmativeVotes: tally.yes,
                negativeVotes: tally.no,
                abstentionVotes: tally.abstention,
                notPresent: tally.notPresent,
                debate: debate._id
        });

      debate.isClosed = true;
      debate.debateResult = result._id;
      await debate.save();

      await result.save();
      return res.status(200).json(tally);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: " + error });
  }
}

module.exports = { createTally };