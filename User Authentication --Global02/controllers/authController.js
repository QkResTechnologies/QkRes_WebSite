const crypto = require("crypto");

const User = require("./../app/models/user");
const sendEmail = require("./../config/mailer");

exports.forgotPassword = async(req, res, next) => {
    //Get user based on posted email
    const user = await User.findOne({ "local.email": req.body.email });
    if (!user) {
        req.flash("forgotMessage", "This Email ID is not linked to any account");
        console.log(req.flash);
        return res.redirect("/forgotPassword");
    }
    //Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //send it back as an email
    const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

    const message = `Forgot Your Password? Submit a Patch request with your new Password and PasswordConfirm to ${resetURL}.\n
    If you did not initiate this rquest, please ignore this email`;

    try {
        await sendEmail({
            email: user.local.email,
            subject: "Your Password Reset Request - Valid for only 10 minutes",
            message,
        });
        req.flash(
            "forgotMessage",
            "A Reset Link has been sent to this Email. Check your Inbox!"
        );
        console.log(req.flash);
        return res.redirect("/forgotPassword");
    } catch (err) {
        console.log(err);
        user.local.passwordResetToken = undefined;
        user.local.passwordExpiresAt = undefined;
        await user.save({ validateBeforeSave: false });
        return next();
    }
};

exports.resetPassword = async(req, res, next) => {
    // get user based on token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    console.log(req.params);
    const user = await User.findOne({
        "local.passwordResetToken": hashedToken,
        "local.passwordResetExpires": { $gt: Date.now() },
    });
    //set password iff token has not expired and there is a user
    if (!user) {
        req.flash("AuthMessage", "Invalid or Expired Token! Login or Register");
        return res.status(400).redirect("/authenticate");
    }
    if (req.password !== req.passwordConfirm) {
        console.log("Redirecting");
        req.flash("ResetMessage", "Passwords Don't Match");
        return res.status(400).redirect(`/resetPassword/${req.params.token}`);
    } else {
        user.local.password = req.body.password;
        user.local.passwordConfirm = req.body.passwordConfirm;
        user.local.passwordResetToken = undefined;
        user.local.passwordResetExpires = undefined;
        //update changedAt property for the user.
        try {
            await user.save();
            console.log("Saved Successfully");
            req.flash(
                "AuthMessage",
                "Password Reset Successfully! Please Login Again"
            );
            res.status(200).redirect("/authenticate");
        } catch (err) {
            console.log(err);
            req.flash(
                "ResetMessage",
                "Invalid Password. Password must be atleast 8 characters long"
            );
            return res.status(400).redirect(`/resetPassword/${req.params.token}`);
        }
    }
    console.log("HI");
    next();
};

exports.deleteAccount = async(req, res, next) => {
    let user = await User.findOne({
        "local.email": req.body.email,
        "local.active": true,
    });
    if (!user || !user.validPassword(req.body.password)) user = undefined;
    if (req.user) user = req.user;
    if (!user) {
        req.flash("delMessage", "This Email Does not Exist!!");
        return res.status(400).redirect("/deactivate");
    } else {
        try {
            user.local.active = false;
            await user.save({ validateBeforeSave: false });
            req.body.script = "Account Deleted";
            return res.send(
                '<script>alert("Account Deleted");location.href = "/"</script>'
            );
        } catch (err) {
            console.log(err);
        }
    }
    next();
};