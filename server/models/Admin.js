const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
});

// Pre-save hook to hash the password before saving the admin
AdminSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare entered password with hashed password in the database
AdminSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create and export the Admin model
module.exports = mongoose.model('Admin', AdminSchema);
