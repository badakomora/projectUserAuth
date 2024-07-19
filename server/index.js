const express = require("express");
const app = express();
const pool = require("./dbConfig")
const bcrypt = require("bcrypt");
const cors = require("cors")
const Port = 4000;
const africastalking = require('africastalking'); // Corrected import

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route to send backend info
app.get("/", cors(), (req, res) => {
  res.send("sending backend info...");
});

// app.use(cors({
//     origin: 'https://project-user-auth-jvf4.vercel.app/'
// }));

app.use(cors({
    origin: 'http://localhost:3000' // Change the port if necessary
}));
const smsClient = africastalking({
    username: "sandbox",
    apiKey: "atsk_45e7c6d22f89931da8399b0d01654f9e6332b92ff5f1a9bc5e76230d2b67a20f40d7a8c3",
});
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





app.post("/forgotpassword", async (req, res) => {
    try {
        const { phone } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (getuser.rows.length > 0) {
            res.status(201).json({ message: 'Password reset attempt successful! An OTP has been sent to', phone });

        const options = {
            to: [phone],
            message: "I'm a lumberjack and its ok, I work all night and sleep all day"
        }
        smsClient.send(options)
        .then( response => {
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        });
        } else {
            res.status(404).json({ message: 'Password reset attempt unsuccessful! This user does not exist!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});