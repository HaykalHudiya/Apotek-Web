const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const staff = require('./model/staff');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

const medicineRouter = require("./router/medicineRouter")
const stockRouter = require("./router/stockRouter")
const transactionRouter = require("./router/transactionRouter")
const staffRouter = require("./router/staffRouter")

app.use(bodyParser.json())

// Create a main router
const mainRouter = express.Router();
const db = 'Apotek';

let decryptorJwt
const dataUser = async (req, res, next) => {
    try {
        const user = await staff.findOne({ user: req.body.user, password: req.body.password }).exec();
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        req.user = user;
        decryptorJwt = user.password;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

mainRouter.use((req, res, next) => {
    if (req.path === "/login") {
        next();
    } else {
        var tokenClient = req.headers["authorization"];
        if (!tokenClient) {
            return res.status(401).json({ message: "You don't have access to this site" });
        }

        var tokenSplit = tokenClient.split(" ");
        if (tokenSplit.length > 1) {
            tokenClient = tokenSplit[1];
        }

        jwt.verify(tokenClient, decryptorJwt, (err, dec) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            next();
        });
    }
});

// Use the individual routers within the main router
mainRouter.post("/login", dataUser, (req, res) => {
    const token = jwt.sign({ userId: req.user.id, username: req.user.nama }, decryptorJwt, { expiresIn: '1h' });
    return res.json({ message: "User sudah login", tokenData: token });
});
mainRouter.use("/medicine", medicineRouter);
mainRouter.use("/stock", stockRouter);
mainRouter.use("/transaction", transactionRouter);
mainRouter.use("/staff", staffRouter);
mainRouter.use("/stock", stockRouter);
//detail obat

// Use the main router in the app
app.use("/apt", mainRouter);

mongoose.connect('mongodb://127.0.0.1:27017/' + db)
    .then(() => {
        console.log('Connected to database ' + db)
        app.listen(port, function () {
            console.log("App Is Running on Port " + port);
        })
    }
    );