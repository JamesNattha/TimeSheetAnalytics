
const nodemailer = require("nodemailer");
require("dotenv").config();
const { hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const { GOOGLE_USER, GOOGLE_PASSWORD } = require('../config')

// Create a Set to store the used activation hashes
const usedActivationHashes = new Set();

const sendInviteEmail = async (req, res) => {
  try {
    function generateVerificationToken() {
      const token = crypto.randomBytes(20).toString('hex');
      return token;
    }

    const verificationToken = generateVerificationToken(); // Generate a unique verification token

    const valuesToCreate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      department: req.body.department,
      username: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      verified: false,
      token: verificationToken
    };

    const createdRecord = await db.tbVertification.create(valuesToCreate);

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GOOGLE_USER,
        pass: GOOGLE_PASSWORD
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Ready to send emails");
      }
    });

    const mailOptions = {
      from: GOOGLE_USER,
      to: req.body.email,
      subject: "Email Verification",
      html: `<p>Please click the following link to verify your email: <a href="${DOMAIN}verify/${verificationToken}">Verify Email</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(createdRecord);
    res.json(defaultValue(true, createdRecord, ""));
  } catch (error) {
    console.error(error);
    res.json(defaultValue(false, null, error.message));
  }
};


const sendConfirmEmail = async (req, res) => {
  try {
    // Get the email address from the request body
    const email = req.body.email;
    const activationHash = await hash(email, 10);

    // Check if the activation hash has been used before
    if (usedActivationHashes.has(activationHash)) {
      return res.status(400).json({ error: "Invalid activation hash." });
    }

    // Add the activation hash to the set of used hashes
    usedActivationHashes.add(activationHash);

    const activationURL = `$timesheetanalytics.undefined.co.th/register?hash=${encodeURIComponent(activationHash)}`;
    const activationURLl = encodeURIComponent(activationURL);
    console.log('activationURL',activationURL)


    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GOOGLE_USER,
        pass: GOOGLE_PASSWORD,
      },
    });

    console.log(GOOGLE_USER);
    console.log(GOOGLE_PASSWORD);

    const mailOptions = {
      from: GOOGLE_USER, // Set the "from" address as the same email address
      to: email, 
      subject: "Verification Email",
      html: `
      <h3> Hello ${email}</h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To Confirm your account, please follow this link:</p>
      <p><a href="${activationURL}">Confirm your Email</a></p>
      <p>YOUR WELCOME</p>
      <p>UNDEFINED CO .LTD</p>
      `, // Customize the email content as needed
    };

    // Send the email
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Invitation email sent successfully." });
  } catch (error) {
    console.error("Error sending invitation email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the invitation email." });
  }
};


const generateToken = (userId, username, role) => {
  const token = jwt.sign(
    {
      userId,
      username,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1440m" }
  );
  return token;
};

const sendResetEmail = async (req, res) => {
  try {
    // Get the email address from the request body
    const email = req.body.email;
    const activationHash = await hash(email, 10);

    // Check if the activation hash has been used before
    if (usedActivationHashes.has(activationHash)) {
      return res.status(400).json({ error: "Invalid activation hash." });
    }
    // const user = await db.tbUser.findOne({
    //   attributes: ["userId", "username"],
    //   where: {
    //     username: email,
    //     isDeleted: false,
    //   },
    // });

    // if (!user) {
    //   return res.json(defaultValue(false, null, "User not found"));
    // }

    // // Generate token
    // const token = generateToken(user.userId, user.username, null);

    // Add the activation hash to the set of used hashes
    usedActivationHashes.add(activationHash);

    const activationURL = `${DOMAIN}reset-password?hash=${encodeURIComponent(activationHash)}`;
    const activationURLl = encodeURIComponent(activationURL);
    console.log('activationURL',activationURL)
    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GOOGLE_USER,
        pass: GOOGLE_PASSWORD,
      },
    });

    console.log(GOOGLE_USER);
    console.log(GOOGLE_PASSWORD);

    // Compose the email message
    const mailOptions = {
      from: GOOGLE_USER, // Set the "from" address as the same email address
      to: email, // Set the recipient email address
      subject: "Forgot your password?",
      html: `
      <h3>Forgot your password? </h3>
      <p>That's okay, it happens! Click on the button below to reset Your password.</p>
      <p><a href="${activationURL}"><button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;">RESET </button></a></p>
      `, // Customize the email content as needed
    };

    // Send the email
    console.log(mailOptions);
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Invitation email sent successfully." });
    } catch (error) {
      console.error("Error sending invitation email:", error);
      res.status(500).json({ error: "An error occurred while sending the invitation email." });
    }
  } catch (error) {
    console.error("Error sending invitation email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the invitation email." });
  }
};

// const sendResetEmail = async (email) => {
//   try {

//     const activationHash = await hash(email, 10);

//     if (usedActivationHashes.has(activationHash)) {
//       return { error: "Invalid activation hash." };
//     }

//     const user = await db.tbUser.findOne({
//       attributes: ["userId", "username"],
//       where: {
//         username: email,
//         isDeleted: false,
//       },
//     });

//     if (!user) {
//       return defaultValue(false, null, "User not found");
//     }

//     const token = generateToken(user.userId, user.username, null);

//     usedActivationHashes.add(activationHash);

//     const activationURL = `${process.env.DOMAIN}?hash=${encodeURIComponent(activationHash)}`;
//     const activationURLl = encodeURIComponent(activationURL);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.GOOGLE_USER,
//         pass: process.env.GOOGLE_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.GOOGLE_USER,
//       to: email,
//       subject: "Forgot your password?",
//       html: `
//       <h3>Forgot your password? </h3>
//       <p>That's okay, it happens! Click on the button below to reset Your password.</p>
//       <p><a href="${activationURL}"><button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;">RESET YOUR PASSWORD</button></a></p>
//       `,
//     };

//     console.log(mailOptions);
//     try {
//       await transporter.sendMail(mailOptions);
//       return { message: "Invitation email sent successfully." };
//     } catch (error) {
//       console.error("Error sending invitation email:", error);
//       return { error: "An error occurred while sending the invitation email." };
//     }
//   } catch (error) {
//     console.error("Error sending invitation email:", error);
//     return { error: "An error occurred while sending the invitation email." };
//   }
// };


module.exports = {
  sendInviteEmail,
  sendConfirmEmail,
  sendResetEmail
};
