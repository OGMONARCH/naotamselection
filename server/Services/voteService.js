const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');
const mongoose = require('mongoose');

class VoteService {
    // Submit a vote by incrementing the selected candidate's vote count
    async submitVotes(voterEmail, votes) {
        // Start a session for transactions to ensure data consistency
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Find the voter and check if they've already voted
            const voter = await Voter.findOne({ email: voterEmail });
            if (!voter) {
                throw new Error('Voter not found');
            }

            if (voter.hasVoted) {
                throw new Error('Voter has already voted');
            }

            // Increment the vote count for each selected candidate
            for (const vote of votes) {
                const candidate = await Candidate.findOne({ name: vote.candidateName }).session(session);
                if (!candidate) {
                    throw new Error(`Candidate ${vote.candidateName} not found`);
                }
                candidate.votes += 1;
                await candidate.save({ session });
            }

            // Mark the voter as having voted
            voter.hasVoted = true;
            await voter.save({ session });

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return { success: true, message: 'Votes submitted successfully' };
        } catch (error) {
            // Rollback the transaction in case of error
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    // Calculate total votes for each candidate
    async calculateResults() {
        const results = await Candidate.find({}, 'name position votes').sort({ position: 1, votes: -1 });
        return results;
    }

    // Reset all votes to 0 (for admin use)
    async resetVotes() {
        await Candidate.updateMany({}, { votes: 0 });
        await Voter.updateMany({}, { hasVoted: false });
        return { success: true, message: 'All votes have been reset' };
    }

    // Manipulate the vote count for a candidate (for admin use)
    async manipulateVote(candidateName, newVoteCount) {
        const candidate = await Candidate.findOne({ name: candidateName });
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        candidate.votes = newVoteCount;
        await candidate.save();

        return { success: true, message: `Vote count for ${candidateName} updated to ${newVoteCount}` };
    }
}

module.exports = new VoteService();
