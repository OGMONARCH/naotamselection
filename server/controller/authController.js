//Handles authentication (signing in).
const Voter = require('../models/Voter');

exports.signIn = async (req, res) => { //Handles voter sign-in by checking if the voter exists. If not, it creates a new voter entry
    const { email, matricNumber } = req.body;

    let voter = await Voter.findOne({ email, matricNumber });

    if (!voter) {
        voter = new Voter({ email, matricNumber });
        await voter.save();
    }

    res.json({ message: 'Sign in successful', voter });
};
