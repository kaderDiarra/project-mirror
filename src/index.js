const express = require("express");
const app = express();
const port = 3000;
const register = require("./routes/auth/auth.js");

app.use(express.json());
app.use("/", register);

app.use((req, res, next) => {
    const err = new Error('internal server error');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
	msg: err.message
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
