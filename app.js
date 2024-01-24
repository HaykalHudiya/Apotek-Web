const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

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

// Use the individual routers within the main router
mainRouter.use("/medicine", medicineRouter);
mainRouter.use("/stock", stockRouter);
mainRouter.use("/transaction", transactionRouter);
mainRouter.use("/staff", staffRouter);
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