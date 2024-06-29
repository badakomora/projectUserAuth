const express = require("express");
const app = express();
const pool = require("./dbConfig")
const bcrypt = require("bcrypt");
const cors = require("cors")
const Port = 4000;


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

app.listen(Port, () => {
  console.log('server listening on port', Port);
});


// Login user
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const getuser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (getuser.rows.length > 0) {
            const salt = getuser.rows[0].password;
            const result = await bcrypt.compare(password, salt);
            if (result) {
                const email = getuser.rows[0].email;
                const id = getuser.rows[0].id;
                res.status(201).json({ message: 'Login attempt successful! Redirecting to account..', email: email, id: id });
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
        const { email, password } = req.body;
        const posteduser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (posteduser.rows.length > 0) {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            const salt = await bcrypt.hash(password, 10);
            await pool.query("INSERT INTO users(email, password) Values($1, $2)", [email, salt]);
            res.status(201).json({ message: 'Registration Successful! Redirecting to login...' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
