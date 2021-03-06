// load the things we need
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        name: {
            type: String,
        },
        email: {
            type: String,
            validate: [validator.isEmail, "Invalid Email"],
            required: true,
            unique: true,
        },
        phone: String,
        password: {
            type: String,
            minlength: [8, "Password Must be atleast 8 Characters Long"],
        },
        passwordConfirm: {
            type: String,
            required: true,
        },
        passwordChangedAt: {
            type: Date,
            select: false,
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    // Hash the passwordwith a cost of 12 and delete the passwordConfirm field
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
// };

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);