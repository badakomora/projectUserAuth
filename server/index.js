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


const otpStore = new Map()
//forgot password
app.post("/forgotpassword", async (req, res) => {
    try {
        const { phone } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
        console.log(phone);

        if (getuser.rows.length > 0) {
            res.status(201).json({ message: 'Password reset request successful! Use the OTP sent to your number to request a new password.' }); 
            const sms = AfricasTalking.SMS;
            const newphone = String(phone)
            // Generate and store OTP
            const userOTP = Math.floor(100000 + Math.random() * 900000);
            otpStore.set(phone, { otp: userOTP, expires: Date.now() + 15 * 60 * 1000 }); // Expires in 15 minutes
            const options = {
                to: [newphone],
                message: `Password reset request was successful. Please use the following OTP to set a new password: ${userOTP}.`
            };
            
            // Send message
            sms.send(options)
            .then(response => {
                console.log(response);
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


// newpassword
app.post("/newpassword", async (req, res) => {
    try {
        const { phone, otp, password } = req.body;
        const storedData = otpStore.get(phone); // Retrieve the OTP for the specific phone number

        if (storedData && storedData.otp === otp && Date.now() < storedData.expires) {
            const salt = await bcrypt.hash(password, 10);
            await pool.query("UPDATE users SET password = $1 WHERE phone = $2", [salt, phone]);

            // Invalidate the OTP
            otpStore.delete(phone);

            res.status(200).json({ message: 'Password reset request successful! You can now sign in with the new password.' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP! Please provide the correct OTP sent to your phone.' });
        }
    } catch (err) {
        console.error('Server error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});
