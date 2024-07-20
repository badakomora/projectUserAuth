const express = require("express");
const app = express();
const pool = require("./dbConfig")
const bcrypt = require("bcrypt");
const cors = require("cors")
const Port = 4000;
const AfricasTalking = require('africastalking')({
    username: "sandbox",
    apiKey: "atsk_45e7c6d22f89931da8399b0d01654f9e6332b92ff5f1a9bc5e76230d2b67a20f40d7a8c3",
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route to send backend info
app.get("/", cors(), (req, res) => {
  res.send("sending backend info...");
});

// Client Route
app.use(cors({
    origin: 'http://localhost:3000' 
}));

//server port listening
app.listen(Port, () => {
    console.log('server listening on port', Port);
});

// Login user
app.post("/signin", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
        if (getuser.rows.length > 0) {
            const salt = getuser.rows[0].password;
            const result = await bcrypt.compare(password, salt);
            if (result) {
                const phone = getuser.rows[0].phone;
                const id = getuser.rows[0].id;
                res.status(201).json({ message: 'Login attempt successful! Redirecting to account..', phone: phone, id: id });
            } else {
                res.status(409).json({ message: 'Invalid password. Please use the correct password to login.' });
            }
        } else {
            res.status(404).json({ message: 'This user does not exist!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Register user
app.post("/signup", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const posteduser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (posteduser.rows.length > 0) {
            res.status(409).json({ message: 'phone already exists' });
        } else {
            const salt = await bcrypt.hash(password, 10);
            await pool.query("INSERT INTO users(phone, password) Values($1, $2)", [phone, salt]);
            res.status(201).json({ message: 'Registration Successful! Redirecting to login...' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



//forgot password
app.post("/forgotpassword", async (req, res) => {
    try {
        const { phone } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (getuser.rows.length > 0) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const salt = await bcrypt.hash(otp.toString(), 10); // Hash the OTP after converting it to a string
            
            const newphone = String(phone);
            await pool.query("UPDATE users SET otp = $1 WHERE phone = $2", [salt, phone]);

            // Send success response
            res.status(201).json({ message: 'Password reset request successful! Use the OTP sent to your number to request a new password.' });

            // Initialize SMS service
            const sms = AfricasTalking.SMS;
            const options = {
                to: [newphone],
                message: `Password reset request was successful. Please use the following OTP to set a new password: ${otp}.`
            };

            // Send message
            sms.send(options)
                .then(response => {
                    console.log('SMS sent successfully:', response);
                })
                .catch(error => {
                    console.error('SMS sending error:', error);
                });

        } else {
            res.status(404).json({ message: 'Password reset attempt unsuccessful! This user does not exist!' });
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



// Register user
app.post("/newpassword", async (req, res) => {
    try {
        const { phone, otp, password } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (getuser.rows.length > 0) {
            const saltOtp = getuser.rows[0].otp;

            // Compare the provided OTP with the stored hashed OTP
            const isOtpValid = await bcrypt.compare(otp, saltOtp);

            if (isOtpValid) {
                // Hash the new password
                const saltPassword = await bcrypt.hash(password, 10);

                // Update the user's password and clear the OTP
                await pool.query("UPDATE users SET password = $1, otp = NULL WHERE phone = $2", [saltPassword, phone]);

                res.status(200).json({ message: 'Password reset successful! You can now sign in with the new password.' });
            } else {
                res.status(409).json({ message: 'Invalid OTP!' });
            }
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
