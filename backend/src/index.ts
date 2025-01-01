import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("TODO Feature Backend is Running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

