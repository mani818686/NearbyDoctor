const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const item = require("../lib/itemlib");
const shortid = require("shortid");
const sgMail = require("@sendgrid/mail");
const Doctor = require("./models/Doctor");
const emailTemplates = require("../email");

// requiring API Key to Send Emails
sgMail.setApiKey(process.env.SendgridAPIKey);

const router = express.Router();
router.post("/signup", async(req, res, next) => {
    //console.log(req.body.email);
    item.getItemByQuery({ email: req.body.email}, Doctor, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            username: req.body.username,
                            specialist:req.body.specialist,
                            location:req.body.location,
                            hname:req.body.hname,
                            hadrs:req.body.hadrs,
                            time:req.body.time,
                            cfee:req.body.cfee,
                            isEmailVerified : false
                        };
                        item.createitem(user, Doctor, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {   
                                result.verificationKey = shortid.generate();
                                result.verificationKeyExpires =
                                    new Date().getTime() + 20 * 60 * 1000;
                                await result
                                    .save()
                                    .then((result1) => {
                                        console.log(result1)
                                        const msg = {
                                            to: result.email,
                                            from: process.env.sendgridEmail,
                                            subject: "NEAR_BY_Doctor: Email Verification",
                                            text: " ",
                                            html: emailTemplates.VERIFY_EMAIL(result1),
                                        };

                                        sgMail
                                        .send(msg)
                                        .then((result) => {
                                            console.log("Email sent");
                                        })
                                        .catch((err) => {
                                            console.log(err.toString());
                                            res.status(500).json({
                                                // message: "something went wrong1",
                                                error: err,
                                            });
                                        });
                                        res.status(201).json({
                                            message: "user created",
                                            userDetails: {
                                                userId: result._id,
                                                email: result.email,
                                                name: result.name,
                                                mobileNumber: result.mobileNumber,
                                            },
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: "Error",
                                            error: err.toString(),
                                        });
                                    });
                            }//end of else
                        })
                    }

                })
            }
        }
    })

});

router.patch("/verifyEmail",async(req, res, next) => {
    //console.log(req.body)
    const { verificationKey } = req.body;
    await Doctor.findOne({ verificationKey })
        .then(async(user) => {
            if (Date.now() > user.verificationKeyExpires) {
                res.status(401).json({
                    message: "Pass key expired",
                });
            }
            user.verificationKeyExpires = null;
            user.verificationKey = null;
            user.isEmailVerified = true;
            await user
                .save()
                .then((result1) => {
                    res.status(200).json({
                        message: "User verified",
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Some error",
                        error: err.toString(),
                    });
                });
        })
        .catch((err) => {
            res.status(409).json({
                message: "Invalid verification key",
                error: err.toString(),
            });
        });
});

router.post("/login", async(req, res, next) => {
    
    item.getItemByQuery({ email: req.body.email }, Doctor, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            if (user[0].isEmailVerified === false) {
                 return res.status(409).json({
                     message: "Please verify your email",
                 });
             }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            userType: user[0].userType,
                            userId: user[0]._id,
                            email: user[0].email,
                            username: user[0].username,
                            gender: user[0].gender,
                        },
                        'process.env.jwtSecret', {
                            expiresIn: "1d",
                        }
                    );
                    // req.header['auth-token'] = token;
                    return res.status(200).json({
                        message: "Auth successful",
                        userDetails: {
                            userType: user[0].userType,
                            userId: user[0]._id,
                            email: user[0].email,
                            username: user[0].username,
                            gender: user[0].gender,
                        },
                        token: token,
                    });
                }
                res.status(401).json({
                    message: "Auth failed1",
                });
            });
        }
    });
});

module.exports = router;
